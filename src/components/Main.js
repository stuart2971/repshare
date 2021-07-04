import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import Preview from "./Preview";
import AddListing from "./AddListing";
import CredentialButton from "./MiniComponents/CredentialButton";
import Tabs from "./Tabs";
import Listing from "./MiniComponents/Listing";

import "./styles/Main.css";
import "./styles/Listings.css";
import { XIcon } from "@heroicons/react/outline";
import { LinkIcon } from "@heroicons/react/outline";

import { getUser, getListings, deleteListing } from "../utils/requests";

// https://dev.to/andyrewlee/cheat-sheet-for-updating-objects-and-arrays-in-react-state-48np
export default function Main() {
    const { isAuthenticated, user } = useAuth0();
    const [savedListings, setSavedListings] = useState({});
    const [selectedHaul, setSelectedHaul] = useState({});
    const [selectedListing, setSelectedListing] = useState({});
    let listings = savedListings[selectedHaul._id];

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
            if (data)
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
    function updateListing(haulID, temporaryListingID, newListing) {
        let updatedListings = savedListings[haulID];

        for (let i = updatedListings.length - 1; i > 0; i--) {
            if (updatedListings[i]._id === temporaryListingID) {
                updatedListings[i] = newListing;
            }
        }
        setSavedListings({
            ...savedListings,
            [haulID]: updatedListings,
        });
    }
    async function removeListing() {
        let listingID = selectedListing._id;
        console.log(listingID);
        if (!listingID.includes("TEMPID")) {
            const data = await deleteListing(selectedHaul._id, listingID);
        }

        let newListings = listings.filter(
            (listing) => listing._id !== listingID
        );
        setSavedListings({
            ...savedListings,
            [selectedHaul._id]: newListings,
        });
    }
    console.log(savedListings);
    return (
        <section className="main_section">
            <div className="container">
                <div className="flex_item tabs_container">
                    <h1 className="logo inline_block">RepShare</h1>
                    <div className="tooltip ml_40">
                        <span className="tooltiptext">
                            {isAuthenticated ? "Log out" : "Log in"}
                        </span>
                        <CredentialButton />
                    </div>

                    <Tabs setSelectedHaul={setSelectedHaul} />
                </div>
                <div className="flex_item items_container">
                    <h3 className="tab_selected inline_block">
                        {selectedHaul.name}
                    </h3>
                    <div className="tooltip">
                        <span className="tooltiptext">Copy</span>
                        <LinkIcon className="link_icon" />
                    </div>
                    <AddListing
                        addToListings={addToListings}
                        id={selectedHaul._id}
                        updateListing={updateListing}
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
                                        <div className="relative" key={i}>
                                            {JSON.stringify(selectedListing) ===
                                            JSON.stringify(listing) ? (
                                                <XIcon
                                                    onClick={removeListing}
                                                    className="tab_delete_icon"
                                                />
                                            ) : (
                                                <></>
                                            )}

                                            <Listing
                                                listing={listing}
                                                tag={listing.tag}
                                                price={listing.price}
                                                rating={listing.rating}
                                                setSelectedListing={
                                                    setSelectedListing
                                                }
                                            />
                                        </div>
                                    );
                                })
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="flex_item preview_container">
                    {Object.keys(selectedListing).length !== 0 ? (
                        <Preview selectedListing={selectedListing} />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </section>
    );
}
