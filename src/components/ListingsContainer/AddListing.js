import { useState } from "react";

import Tag from "../MiniComponents/Tag";
import { createListing } from "../../utils/requests";

import RepShare from "../RepShare.json";
import { Notify } from "notiflix";

import "../styles/Main.css";

export default function AddListing({ id, addToListings, updateListing }) {
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
        if (!itemLink) {
            Notify.failure("You have to enter a link");
            return;
        }
        if (!id) {
            Notify.failure("You have to select a haul first");

            return;
        }
        const listing = {
            link: itemLink,
            itemName: name,
            rating: parseInt(rating),
            imageURL: itemImage,
            tag: selectedTag,
        };
        const temporaryListingID = Math.random() * 100000 + "TEMPID";
        addToListings({
            link: itemLink,
            itemName: name || "",
            rating,
            imageURL: itemImage || "",
            price: "",
            tag: selectedTag,
            _id: temporaryListingID,
        });
        setItemLink("");
        setName("");
        setRating("");
        setItemImage("");
        const newListing = await createListing(id, listing);

        updateListing(id, temporaryListingID, newListing);
    }
    console.log(id);
    return (
        <div className="add_listing_container">
            <div className="row">
                <input
                    value={itemLink}
                    type="text"
                    className="url_input"
                    placeholder="Taobao/Weidian Link"
                    onChange={(e) => setItemLink(e.target.value)}
                />
                <button
                    onClick={addListing}
                    type="submit"
                    className="theme_button add_button"
                >
                    Add Item
                </button>
            </div>

            <div className="row">
                <input
                    value={name}
                    type="text"
                    className="item_name_input"
                    placeholder="Item Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    value={rating}
                    type="number"
                    className="rating_input"
                    placeholder="% Rating"
                    onChange={(e) => setRating(e.target.value)}
                />
            </div>
            <div className="row">
                <input
                    value={itemImage}
                    className="image_input"
                    placeholder="Imgur link / image URL"
                    onChange={(e) => setItemImage(e.target.value)}
                />
            </div>
            <div className="row tag_container">
                <span
                    className="faded50 mr_40"
                    onClick={() => setSelectedTag("")}
                >
                    Clear
                </span>
                {renderTags()}
            </div>
        </div>
    );
}
