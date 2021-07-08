import Listing from "../MiniComponents/Listing";
import Filters from "./Filters";

import { XIcon } from "@heroicons/react/outline";
import { deleteListing } from "../../utils/requests";
import { useEffect, useState } from "react";

export default function Listings({
    selectedListingID,
    selectedHaulID,
    currency,
    setSelectedListing,
    setSavedListings,
    savedListings,
    urlID,
}) {
    const ALL_LISTINGS = savedListings[selectedHaulID] || savedListings[urlID];
    const [listings, setListings] = useState();
    useEffect(() => {
        setListings(savedListings[selectedHaulID] || savedListings[urlID]);
    }, [savedListings, selectedHaulID]);

    async function removeListing() {
        if (!selectedListingID.includes("TEMPID")) {
            const data = await deleteListing(selectedHaulID, selectedListingID);
        }

        let newListings = listings.filter(
            (listing) => listing._id !== selectedListingID
        );
        setSavedListings({
            ...savedListings,
            [selectedHaulID]: newListings,
        });
    }
    console.log("Listings rendered");
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
                                    {selectedListingID === listing._id &&
                                    !urlID ? (
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
        </>
    );
}
