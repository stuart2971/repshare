import { useState } from "react";

import Tab from "./MiniComponents/Tab";
import Listing from "./Listing";
import Preview from "./Preview";
import AddListing from "./AddListing";

import "./styles/Main.css";

import linkIcon from "../icons/link.png";
import linkIcon_copied from "../icons/link_copied.png";

export default function Main() {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState("");
    return (
        <section className="main_section">
            <div className="container">
                <div className="tabs_container">
                    <h1 className="logo">RepShare</h1>
                    <div className="tabs">
                        <Tab name="+ Create Listing" setCopied={setCopied} />
                        <Tab
                            name="Summer 2021"
                            activeTab={activeTab}
                            setCopied={setCopied}
                            setActiveTab={setActiveTab}
                        />
                        <Tab
                            name="Winter 2020"
                            activeTab={activeTab}
                            setCopied={setCopied}
                            setActiveTab={setActiveTab}
                        />
                        <Tab
                            name="Summer 2019"
                            activeTab={activeTab}
                            setCopied={setCopied}
                            setActiveTab={setActiveTab}
                        />
                    </div>
                    <button className="theme_button credentials_button">
                        Log out
                    </button>
                </div>
                <div className="items_container">
                    <h3 className="tab_selected inline_block">Summer 2021</h3>
                    <div class="inline_block">
                        <img
                            onClick={() => setCopied(true)}
                            class="link_icon"
                            src={copied ? linkIcon_copied : linkIcon}
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
