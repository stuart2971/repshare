import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import AddListing from "./AddListing";
import Listings from "./Listings";

import CopyLinkIcon from "../MiniComponents/CopyLinkIcon";

import { getListings } from "../../utils/requests";

export default function ListingsContainer({
    selectedHaul,
    selectedListing,
    setSelectedListing,
    currency,
}) {
    const history = useHistory();
    let urlID = getHaulIDFromURL();

    const [savedListings, setSavedListings] = useState({});
    let listings = savedListings[selectedHaul._id] || savedListings[urlID];

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
        let oldSavedListings = listings || [];
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

    return (
        <div>
            <h3 className="tab_selected inline_block">{selectedHaul.name}</h3>

            {!urlID ? (
                <CopyLinkIcon selectedHaulID={selectedHaul._id} />
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

            <Listings
                selectedListingID={selectedListing._id}
                selectedHaulID={selectedHaul._id}
                currency={currency}
                setSelectedListing={setSelectedListing}
                setSavedListings={setSavedListings}
                savedListings={savedListings}
                urlID={urlID}
            />
        </div>
    );
}