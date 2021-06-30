import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import Preview from "./Preview";
import AddListing from "./AddListing";
import CredentialButton from "./MiniComponents/CredentialButton";
import Tabs from "./Tabs";
import Listing from "./MiniComponents/Listing";

import "./styles/Main.css";
import linkIcon from "../icons/link.png";
// import linkIcon_copied from "../icons/link_copied.png";

import { getUser, getListings } from "../utils/requests";

// https://dev.to/andyrewlee/cheat-sheet-for-updating-objects-and-arrays-in-react-state-48np
export default function Main() {
    const { isAuthenticated, user } = useAuth0();
    const [savedListings, setSavedListings] = useState({});
    const [selectedHaul, setSelectedHaul] = useState({});
    const [selectedListing, setSelectedListing] = useState({});

    useEffect(async () => {
        //Makes sure there is an account in mongo, if not it makes one.
        if (isAuthenticated) getUser(user.sub);
        else return;
    }, [isAuthenticated]);

    useEffect(async () => {
        if (!isAuthenticated) return;
        // If listings has not been fetched before, fetches it and saves it to savedListings
        if (!savedListings[selectedHaul._id]) {
            const data = await getListings(selectedHaul._id);
            setSavedListings({
                ...savedListings,
                [selectedHaul._id]: data.listings,
            });
        }
    }, [selectedHaul]);

    function addToListings(l) {
        let oldSavedListings = savedListings[selectedHaul._id];
        oldSavedListings.push(l);
        setSavedListings({
            ...savedListings,
            [selectedHaul._id]: oldSavedListings,
        });
    }
    console.log("rendered");
    let listings = savedListings[selectedHaul._id];
    return (
        <section className="main_section">
            <div className="container">
                <div className="tabs_container">
                    <h1 className="logo">RepShare</h1>
                    <Tabs setSelectedHaul={setSelectedHaul} />
                    <CredentialButton />
                </div>
                <div className="items_container">
                    <h3 className="tab_selected inline_block">
                        {selectedHaul.name}
                    </h3>
                    <div className="inline_block">
                        <img
                            className="link_icon"
                            src={linkIcon}
                            alt="preview listing"
                        />
                    </div>
                    <AddListing
                        addToListings={addToListings}
                        id={selectedHaul._id}
                    />
                    <div className="filter_container space_between">
                        <p className="filter_text">Filter</p>
                        <div>
                            <select
                                name="tags"
                                id
                                className="filter_dropdown faded50"
                            >
                                <option value="shorts">Shorts</option>
                            </select>
                            <select
                                name="prices"
                                id
                                className="filter_dropdown faded50"
                            >
                                <option value="$0-5">$0-5</option>
                            </select>
                            <select
                                name="ratings"
                                id
                                className="filter_dropdown faded50"
                            >
                                <option value="%60-70">%60-70</option>
                            </select>
                        </div>
                    </div>
                    <div className="listings_container">
                        {listings ? (
                            listings
                                .slice(0)
                                .reverse()
                                .map((listing, i) => {
                                    return (
                                        <Listing
                                            listing={listing}
                                            tag={listing.tag}
                                            price={listing.price}
                                            rating={listing.rating}
                                            setSelectedListing={
                                                setSelectedListing
                                            }
                                            key={i}
                                        />
                                    );
                                })
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="preview_container">
                    <div className="logout_container" />
                    <Preview selectedListing={selectedListing} />
                </div>
            </div>
        </section>
    );
}
