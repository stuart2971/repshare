import Listing from "../MiniComponents/Listing";
import Filters from "./Filters";

import { useEffect, useState } from "react";

export default function Listings({
    selectedHaulID,
    currency,
    changeSelectedListing,
    setSavedListings,
    savedListings,
    urlID,
    setEditMode,
}) {
    const ALL_LISTINGS = savedListings[selectedHaulID] || savedListings[urlID];
    const [listings, setListings] = useState();
    useEffect(() => {
        setListings(savedListings[selectedHaulID] || savedListings[urlID]);
    }, [savedListings, selectedHaulID]);

    return (
        <>
            <Filters
                setListings={setListings}
                ALL_LISTINGS={ALL_LISTINGS}
                currency={currency}
                savedListings={savedListings}
            />
            <div
                className="listings_container"
                unselectable="on"
                onselectstart="return false;"
                onmousedown="return false;"
            >
                {listings && listings.length > 0 ? (
                    listings
                        .slice(0)
                        .reverse()
                        .map((listing, i) => {
                            return (
                                <div className="relative" key={i}>
                                    <Listing
                                        listing={listing}
                                        changeSelectedListing={
                                            changeSelectedListing
                                        }
                                        setSavedListings={setSavedListings}
                                        currency={currency}
                                        selectedHaulID={selectedHaulID}
                                        savedListings={savedListings}
                                        urlID={urlID}
                                        setEditMode={setEditMode}
                                    />
                                </div>
                            );
                        })
                ) : (
                    <h3 style={{ textAlign: "center" }}>
                        No items yet. Paste a link above to get started.
                    </h3>
                )}
            </div>
        </>
    );
}
