import { useAuth0 } from "@auth0/auth0-react";

import Listing from "./Listing";
import Preview from "./Preview";
import AddListing from "./AddListing";
import CredentialButton from "./MiniComponents/CredentialButton";
import Tabs from "./Tabs";

import "./styles/Main.css";
import linkIcon from "../icons/link.png";
// import linkIcon_copied from "../icons/link_copied.png";

import { getUser } from "../utils/requests";

export default function Main() {
    const { isAuthenticated, user } = useAuth0();

    //Makes sure there is an account in mongo, if not it makes one.
    if (isAuthenticated) getUser(user.sub);

    return (
        <section className="main_section">
            <div className="container">
                <div className="tabs_container">
                    <h1 className="logo">RepShare</h1>
                    <Tabs />
                    <CredentialButton />
                </div>
                <div className="items_container">
                    <h3 className="tab_selected inline_block">Summer 2021</h3>
                    <div className="inline_block">
                        <img
                            className="link_icon"
                            src={linkIcon}
                            alt="preview listing"
                        />
                    </div>
                    <AddListing />
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
                        <Listing
                            itemName="Vlone Shorts"
                            tag="Shorts"
                            price="14.95"
                            rating="46"
                        />
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
