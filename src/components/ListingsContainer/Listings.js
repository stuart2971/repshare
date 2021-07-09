import Listing from "../MiniComponents/Listing";
import Filters from "./Filters";

import { useEffect, useState } from "react";

export default function Listings({
    selectedListingID,
    selectedHaulID,
    currency,
    changeSelectedListing,
    setSavedListings,
    savedListings,
    urlID,
}) {
    const ALL_LISTINGS = savedListings[selectedHaulID] || savedListings[urlID];
    const [listings, setListings] = useState();
    useEffect(() => {
        setListings(savedListings[selectedHaulID] || savedListings[urlID]);
    }, [savedListings, selectedHaulID]);

    console.log("Listing renderd");
    return (
        <>
            <Filters
                setListings={setListings}
                ALL_LISTINGS={ALL_LISTINGS}
                selectedHaulID={selectedHaulID}
            />
            <div className="listings_container">
                {listings ? (
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
                                        listings={listings}
                                    />
                                </div>
                            );
                        })
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
