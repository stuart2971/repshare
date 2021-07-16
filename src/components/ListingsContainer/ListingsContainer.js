import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import AddListing from "./AddListing";
import Listings from "./Listings";
import HaulDropdown from "./HaulDropdown";
import { getHaulIDFromURL } from "../../utils/currency";
import { getListings } from "../../utils/requests";

import "../styles/Navbar.css";
import Spinner from "../MiniComponents/Loader";

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
    const [haulName, setHaulName] = useState("");
    const [fetchingListings, setFetchingListings] = useState(false);

    let listings = savedListings[selectedHaul._id] || savedListings[urlID];

    useEffect(() => {
        if (listings) changeSelectedListing(listings[listings.length - 1]);
    }, [listings]);
    useEffect(async () => {
        let data;
        setFetchingListings(true);
        if (urlID && !savedListings[urlID]) {
            data = await getListings(urlID);

            setHaulName(data.name);
        } else {
            if (!listings) {
                data = await getListings(selectedHaul._id);
            }
        }

        if (data)
            setSavedListings({
                ...savedListings,
                [selectedHaul._id || urlID]: data.listings,
            });
        setFetchingListings(false);
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
        for (let i = updatedListings.length - 1; i >= 0; i--) {
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
    console.log(fetchingListings);
    return (
        <div>
            {!urlID ? (
                <HaulDropdown
                    setSelectedHaul={setSelectedHaul}
                    selectedHaul={selectedHaul}
                />
            ) : (
                <h1>{haulName}</h1>
            )}

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
            {fetchingListings ? (
                <div>
                    Fetching Listings
                    <Spinner />
                </div>
            ) : (
                <Listings
                    selectedHaulID={selectedHaul._id}
                    currency={currency}
                    changeSelectedListing={changeSelectedListing}
                    setSavedListings={setSavedListings}
                    savedListings={savedListings}
                    urlID={urlID}
                    setEditMode={setEditMode}
                />
            )}
        </div>
    );
}
