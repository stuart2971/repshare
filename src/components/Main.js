import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import Listings from "./Listings";
import Preview from "./Preview";
import CredentialButton from "./MiniComponents/CredentialButton";
import Tabs from "./Tabs";
import CurrencyDropdown from "./MiniComponents/CurrencyDropdown";

import "./styles/Main.css";
import "./styles/Listings.css";

import { getUser } from "../utils/requests";

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

    return (
        <section className="main_section">
            <div className="container">
                <div className="flex_item tabs_container">
                    <h1 className="logo inline_block">RepShare</h1>
                    <div className="tooltip ml_40">
                        <span className="tooltiptext">
                            {isAuthenticated ? "Log out" : "Log in"}
                        </span>
                    </div>

                    <Tabs setSelectedHaul={setSelectedHaul} />

                    {isAuthenticated ? (
                        <div>
                            <p>{user.name}</p>
                            <CurrencyDropdown
                                auth0ID={user.sub}
                                setCurrency={setCurrency}
                                currency={currency}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                    <CredentialButton />
                </div>
                <div className="flex_item items_container">
                    <Listings
                        isAuthenticate={isAuthenticated}
                        selectedHaul={selectedHaul}
                        selectedListing={selectedListing}
                        setSelectedListing={setSelectedListing}
                        currency={currency}
                    />
                </div>
                <div className="flex_item preview_container">
                    {Object.keys(selectedListing).length !== 0 ? (
                        <Preview selectedListing={selectedListing} />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </section>
    );
}
