import { useEffect, useState } from "react";

import Tag from "../MiniComponents/Tag";
import {
    createListing,
    updateListing as editListing,
} from "../../utils/requests";

import RepShare from "../RepShare.json";
import { Notify } from "notiflix";

import "../styles/Main.css";
import { ExclamationIcon } from "@heroicons/react/outline";

export default function AddListing({
    id,
    addToListings,
    updateListing,
    editMode,
    setEditMode,
}) {
    const [itemLink, setItemLink] = useState("");
    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [itemImage, setItemImage] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [price, setPrice] = useState("");

    const isEditMode = Object.keys(editMode).length === 0 ? false : true;

    async function addListing() {
        if (isEditMode) {
            const newListing = {
                link: itemLink,
                itemName: name,
                rating: parseInt(rating),
                imageURL: [itemImage],
                tag: selectedTag,
                price,
                _id: editMode._id,
            };
            const data = await editListing(editMode._id, newListing);
            if (data.updated.n === 1 && data.updated.ok === 1) {
                leaveEditMode();
                Notify.success("Changed listing successfully");
                updateListing(id, editMode._id, newListing);
            }
            console.log(data);
        } else {
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
    }

    useEffect(() => {
        if (isEditMode) {
            setName(editMode.itemName);
            setItemLink(editMode.link);
            setRating(editMode.rating || "");
            setItemImage(editMode.imageURL[0]);
            setSelectedTag(editMode.tag);
            setPrice(editMode.price);
        }
    }, [editMode]);
    function leaveEditMode() {
        setName("");
        setItemLink("");
        setRating("");
        setItemImage("");
        setSelectedTag("");
        setEditMode({});
    }
    return (
        <div className="add_listing_container">
            {isEditMode ? (
                <div className="warning_message" onClick={leaveEditMode}>
                    <ExclamationIcon style={{ width: "1.5em" }} />
                    <p>
                        <b>You are now in editing mode. </b>
                        <br />
                        Save the item or click here to get out of editing mode.
                    </p>
                </div>
            ) : (
                <></>
            )}

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
                    {isEditMode ? "Save Item" : "Add Item"}
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
                {isEditMode ? (
                    <input
                        value={price}
                        type="number"
                        className="rating_input"
                        placeholder="Price in Yuan"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                ) : (
                    <></>
                )}
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
                {RepShare.tags.map((tag, i) => {
                    return (
                        <Tag
                            name={tag}
                            selectedTag={selectedTag}
                            setSelectedTag={setSelectedTag}
                            key={i}
                        />
                    );
                })}
            </div>
        </div>
    );
}
