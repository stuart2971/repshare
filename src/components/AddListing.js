import { useState } from "react";

import Tag from "./MiniComponents/Tag";

import RepShare from "./RepShare.json";

export default function AddListing() {
    const [selectedTag, setSelectedTag] = useState("");
    function renderTags() {
        return RepShare.tags.map((tag, i) => {
            return (
                <Tag
                    name={tag}
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                    key={i}
                />
            );
        });
    }
    return (
        <div className="add_listing_container">
            <div className="row">
                <input
                    type="text"
                    className="url_input"
                    placeholder="Paste URL *"
                />
                <button className="theme_button">Add Item</button>
            </div>
            <div className="row">
                <input
                    type="text"
                    className="item_name_input"
                    placeholder="Item Name"
                />
                <input
                    type="number"
                    className="rating_input"
                    placeholder="% Rating"
                />
            </div>
            <div className="row">
                {renderTags()}
                <span className="faded50" onClick={() => setSelectedTag("")}>
                    Clear
                </span>
            </div>
        </div>
    );
}
