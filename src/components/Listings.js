import { useState } from "react";

import AddListing from "./AddListing";
import Listing from "./MiniComponents/Listing";
import Filters from "./MiniComponents/Filters";
import { getListings, deleteListing } from "../utils/requests";

import { XIcon } from "@heroicons/react/outline";
import { LinkIcon } from "@heroicons/react/outline";

export default function Listings({
    selectedHaul,
    selectedListing,
    setSelectedListing,
    currency,
}) {
    const [savedListings, setSavedListings] = useState({});
    let listings = savedListings[selectedHaul._id];

    if (!savedListings[selectedHaul._id]) {
        getListings(selectedHaul._id)
            .then((data) => {
                if (data)
                    setSavedListings({
                        ...savedListings,
                        [selectedHaul._id]: data.listings,
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

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

    return (
        <div>
            <h3 className="tab_selected inline_block">{selectedHaul.name}</h3>
            <div className="tooltip">
                <span className="tooltiptext">Copy</span>
                <LinkIcon className="link_icon" />
            </div>
            <AddListing
                addToListings={addToListings}
                id={selectedHaul._id}
                updateListing={updateListing}
            />
            <Filters />
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
                                        setSelectedListing={setSelectedListing}
                                        currency={currency}
                                    />
                                </div>
                            );
                        })
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
