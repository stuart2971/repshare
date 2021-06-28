import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import Listing from "./Listing";
import Preview from "./Preview";
import AddListing from "./AddListing";
import CredentialButton from "./MiniComponents/CredentialButton";
import Tabs from "./Tabs";

import "./styles/Main.css";
import linkIcon from "../icons/link.png";
// import linkIcon_copied from "../icons/link_copied.png";

import { getUser, getListings } from "../utils/requests";

export default function Main() {
    const { isAuthenticated, user } = useAuth0();
    const [selectedHaul, setSelectedHaul] = useState({});

    const [listings, setListings] = useState([]);

    useEffect(async () => {
        //Makes sure there is an account in mongo, if not it makes one.
        if (isAuthenticated) getUser(user.sub);
        else return;
    }, [isAuthenticated]);

    useEffect(async () => {
        if (!isAuthenticated) return;
        const data = await getListings(user.sub, selectedHaul.haulID);
        setListings(data.hauls[0].listings);
    }, [selectedHaul]);

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
                        {selectedHaul.haulName}
                    </h3>
                    <div className="inline_block">
                        <img
                            className="link_icon"
                            src={linkIcon}
                            alt="preview listing"
                        />
                    </div>
                    <AddListing haulID={selectedHaul.haulID} />
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
                        {listings.map((listing) => {
                            return (
                                <Listing
                                    itemName={listing.itemName}
                                    tag={listing.tag}
                                    price={listing.price}
                                    rating={listing.rating}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="preview_container">
                    <div className="logout_container" />
                    <Preview />
                </div>
            </div>
        </section>
    );
}
