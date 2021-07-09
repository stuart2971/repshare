import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import AddListing from "./AddListing";
import Listings from "./Listings";

import { getListings } from "../../utils/requests";
import "../styles/Tabs.css";
import HaulDropdown from "./HaulDropdown";
import { useAuth0 } from "@auth0/auth0-react";

export default function ListingsContainer({
    selectedHaul,
    changeSelectedListing,
    currency,
    setSelectedHaul,
}) {
    const { isAuthenticated } = useAuth0();
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

            {!urlID || !isAuthenticated ? (
                <AddListing
                    addToListings={addToListings}
                    id={selectedHaul._id}
                    updateListing={updateListing}
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
            />
        </div>
    );
}
