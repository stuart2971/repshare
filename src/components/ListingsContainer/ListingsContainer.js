import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import AddListing from "./AddListing";
import Listings from "./Listings";
import HaulDropdown from "./HaulDropdown";
import { getHaulIDFromURL } from "../../utils/currency";
import { getListings } from "../../utils/requests";

import "../styles/Tabs.css";

export default function ListingsContainer({
    selectedHaul,
    changeSelectedListing,
    currency,
    setSelectedHaul,
}) {
    const history = useHistory();
    let urlID = getHaulIDFromURL(history);

    const [savedListings, setSavedListings] = useState({});
    const [editMode, setEditMode] = useState({});

    let listings = savedListings[selectedHaul._id] || savedListings[urlID];

    useEffect(async () => {
        let data;
        if (urlID && !savedListings[urlID]) {
            data = await getListings(urlID);
        } else {
            if (!listings) {
                data = await getListings(selectedHaul._id);
            }
        }
        if (data)
            setSavedListings({
                ...savedListings,
                [selectedHaul._id]: data.listings,
            });
    }, [selectedHaul, urlID]);

    function addToListings(l) {
        let oldSavedListings = listings || [];
        oldSavedListings.push(l);
        setSavedListings({
            ...savedListings,
            [selectedHaul._id]: oldSavedListings,
        });
    }
    function updateListing(haulID, listingID, newListing) {
        let updatedListings = savedListings[haulID];

        for (let i = updatedListings.length - 1; i > 0; i--) {
            if (updatedListings[i]._id === listingID) {
                updatedListings[i] = newListing;
                break;
            }
        }
        setSavedListings({
            ...savedListings,
            [haulID]: updatedListings,
        });
    }

    return (
        <div>
            <HaulDropdown
                setSelectedHaul={setSelectedHaul}
                selectedHaul={selectedHaul}
            />

            {!urlID ? (
                <AddListing
                    addToListings={addToListings}
                    id={selectedHaul._id}
                    updateListing={updateListing}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            ) : (
                <></>
            )}

            <Listings
                selectedHaulID={selectedHaul._id}
                currency={currency}
                changeSelectedListing={changeSelectedListing}
                setSavedListings={setSavedListings}
                savedListings={savedListings}
                urlID={urlID}
                setEditMode={setEditMode}
            />
        </div>
    );
}
