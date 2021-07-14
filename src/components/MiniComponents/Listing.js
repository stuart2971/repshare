import { ControlledMenu, MenuItem, SubMenu } from "@szhsin/react-menu";
import { useState } from "react";
import {
    convertCurrency,
    shortenItemName,
    getRatingColor,
} from "../../utils/currency";
import Spinner from "./Loader";
import Tag from "./Tag";

import { deleteListing } from "../../utils/requests";
import { Notify } from "notiflix";

export default function Listing({
    listing,
    changeSelectedListing,
    currency,
    setSavedListings,
    selectedHaulID,
    savedListings,
    setEditMode,
}) {
    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const ratingColor = getRatingColor(listing.rating / 100);

    async function removeListing() {
        if (!listing._id.includes("TEMPID")) {
            const data = await deleteListing(selectedHaulID, listing._id);
        }
        let newListings = savedListings[selectedHaulID];
        for (let i = 0; i < newListings.length; i++) {
            if (JSON.stringify(newListings[i]) === JSON.stringify(listing)) {
                newListings.splice(i, 1);
                break;
            }
        }

        setSavedListings({
            ...savedListings,
            [selectedHaulID]: newListings,
        });
        Notify.success("Listing Deleted");
    }
    const isFetching = listing._id.includes("TEMPID");
    let price = isFetching ? (
        <Spinner />
    ) : listing.price ? (
        convertCurrency(currency, listing.price)
    ) : (
        "Cannot find price"
    );

    let itemName = isFetching
        ? "Fetching data..."
        : shortenItemName(listing.itemName, 25);
    return (
        <div
            onClick={() => changeSelectedListing(listing)}
            className="listing"
            onContextMenu={(e) => {
                e.preventDefault();
                setAnchorPoint({ x: e.clientX, y: e.clientY });
                setOpen(true);
            }}
        >
            <ControlledMenu
                anchorPoint={anchorPoint}
                isOpen={isOpen}
                onClose={() => setOpen(false)}
            >
                <SubMenu
                    label="Quick View"
                    onClick={() => console.log(listing)}
                >
                    <MenuItem>
                        <div className="mini_preview">
                            <img
                                src={
                                    listing.imageURL ? listing.imageURL[0] : ""
                                }
                                alt=""
                                role="presentation"
                                className="mini_preview_image"
                            />
                            <h1>{shortenItemName(listing.itemName, 50)}</h1>
                        </div>
                    </MenuItem>
                </SubMenu>
                <MenuItem onClick={() => window.open(listing.link, "_blank")}>
                    See Page
                </MenuItem>
                <MenuItem onClick={() => setEditMode(listing)}>Edit</MenuItem>
                <MenuItem styles={{ color: "red" }} onClick={removeListing}>
                    Delete
                </MenuItem>
            </ControlledMenu>
            <div className="space_between">
                <p className="listing_text">
                    {itemName === "" ? "Cannot find item" : itemName}
                </p>

                <p className="listing_text">{price}</p>
            </div>
            <div className="space_between">
                {listing.tag ? <Tag name={listing.tag} /> : <div></div>}

                {listing.rating ? (
                    <div
                        className="tag rating"
                        style={{
                            background: `rgb(${ratingColor[0]},${ratingColor[1]},${ratingColor[2]})`,
                        }}
                    >
                        <p className="tag_text">{listing.rating}%</p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
