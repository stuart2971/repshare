import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

import Tag from "./MiniComponents/Tag";
import { createListing } from "../utils/requests";

import RepShare from "./RepShare.json";

export default function AddListing({ haulID }) {
    const { user } = useAuth0();

    const [itemLink, setItemLink] = useState("");
    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [itemImage, setItemImage] = useState("");
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
    async function addListing() {
        if (!itemLink) return;
        const listing = {
            link: itemLink,
            itemName: name,
            rating,
            imageURL: itemImage,
            tag: selectedTag,
        };

        const listings = await createListing(user.sub, haulID, listing);
    }
    return (
        <div className="add_listing_container">
            <div className="row">
                <input
                    type="text"
                    className="url_input"
                    placeholder="Taobao Link"
                    htmlFor="url"
                    onChange={(e) => setItemLink(e.target.value)}
                />
                <button
                    onClick={addListing}
                    type="submit"
                    className="theme_button"
                >
                    Add Item
                </button>
            </div>

            <div className="row">
                <input
                    type="text"
                    className="item_name_input"
                    placeholder="Item Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    className="rating_input"
                    placeholder="% Rating"
                    onChange={(e) => setRating(e.target.value)}
                />
            </div>
            <div className="row">
                <input
                    className="image_input"
                    placeholder="Image URL"
                    onChange={(e) => setItemImage(e.target.value)}
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
