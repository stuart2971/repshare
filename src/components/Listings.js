import { useHistory } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { useEffect, useState } from "react";

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
    const history = useHistory();
    let urlID = getHaulIDFromURL();

    const [savedListings, setSavedListings] = useState({});
    let listings = savedListings[selectedHaul._id] || savedListings[urlID];

    console.log("rednderd");
    useEffect(async () => {
        if (urlID && !savedListings[urlID]) {
            const data = await getListings(urlID);
            if (data) {
                setSavedListings({
                    ...savedListings,
                    [urlID]: data.listings,
                });
            }
        } else {
            if (!listings) {
                const data = await getListings(selectedHaul._id);
                if (data)
                    setSavedListings({
                        ...savedListings,
                        [selectedHaul._id]: data.listings,
                    });
            }
        }
    });

    function getHaulIDFromURL() {
        let path = history.location.pathname;
        if (path !== "/") {
            return path.substring(1, path.length);
        }
        return null;
    }

    function addToListings(l) {
        let oldSavedListings = listings;
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
            {!urlID ? (
                <div className="tooltip">
                    <span className="tooltiptext">Copy</span>
                    <CopyToClipboard
                        text={"http://localhost:3000/" + selectedHaul._id}
                    >
                        <LinkIcon className="link_icon" />
                    </CopyToClipboard>
                </div>
            ) : (
                <></>
            )}

            {!urlID ? (
                <AddListing
                    addToListings={addToListings}
                    id={selectedHaul._id}
                    updateListing={updateListing}
                />
            ) : (
                <></>
            )}

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
                                        JSON.stringify(listing) && !urlID ? (
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
