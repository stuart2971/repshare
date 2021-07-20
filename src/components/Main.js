import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import ListingsContainer from "./ListingsContainer/ListingsContainer";
import Preview from "./Preview";
import Navbar from "./Navbar";

import "./styles/Main.css";
import "./styles/Listings.css";

import { getUser } from "../utils/requests";
import { useHistory } from "react-router-dom";

// https://dev.to/andyrewlee/cheat-sheet-for-updating-objects-and-arrays-in-react-state-48np
export default function Main() {
    const { isAuthenticated, user } = useAuth0();

    const [selectedHaul, setSelectedHaul] = useState({});
    const [selectedListing, setSelectedListing] = useState({});
    const [currency, setCurrency] = useState("");

    useEffect(async () => {
        //Makes sure there is an account in mongo, if not it makes one.
        if (isAuthenticated) {
            let data = await getUser(user.sub);
            setCurrency(data.currency);
        } else return;
    }, [isAuthenticated]);

    function changeSelectedListing(l) {
        if (JSON.stringify(l) === JSON.stringify(selectedListing)) {
            setSelectedListing({});
        } else {
            setSelectedListing(l);
        }
    }
    return (
        <>
            <Navbar currency={currency} setCurrency={setCurrency} />
            <section className="main_section">
                <div className="container">
                    <div className="flex_item items_container">
                        <ListingsContainer
                            isAuthenticate={isAuthenticated}
                            selectedHaul={selectedHaul}
                            setSelectedHaul={setSelectedHaul}
                            changeSelectedListing={changeSelectedListing}
                            currency={currency}
                        />
                    </div>
                    <div className="flex_item preview_container">
                        {Object.keys(selectedListing || {}).length !== 0 ? (
                            <Preview selectedListing={selectedListing} />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
