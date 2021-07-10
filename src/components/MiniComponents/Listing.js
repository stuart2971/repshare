import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import { useState } from "react";
import { convertCurrency } from "../../utils/currency";
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
}) {
    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    const MAX_LENGTH = 25;
    function shortenItemName(itemName) {
        if (itemName.length > MAX_LENGTH) {
            return itemName.substring(0, MAX_LENGTH - 3) + "...";
        } else {
            return itemName;
        }
    }
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
    ) : listing.price === undefined ? (
        ""
    ) : (
        convertCurrency(currency, listing.price)
    );
    let itemName = isFetching
        ? "Fetching data..."
        : shortenItemName(listing.itemName);

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
                <MenuItem onClick={() => console.log(listing)}>
                    Quick View
                </MenuItem>
                <MenuItem onClick={() => window.open(listing.link, "_blank")}>
                    See Page
                </MenuItem>
                <MenuItem>Edit</MenuItem>
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
                    <div className="tag rating">
                        <p className="tag_text">{listing.rating}%</p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
