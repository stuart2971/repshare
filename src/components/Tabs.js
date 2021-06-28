import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import { getHaulNames, addHaul } from "../utils/requests";

import Tab from "./MiniComponents/Tab";

export default function Tabs({ setSelectedHaul }) {
    const { isAuthenticated, user } = useAuth0();

    const [activeTab, setActiveTab] = useState("");
    const [hauls, setHauls] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);

    useEffect(async () => {
        if (!isAuthenticated) return;
        const data = await getHaulNames(user.sub);
        if (!data) return;
        const recentHaul = data.hauls[data.hauls.length - 1];
        setHauls(data.hauls);
        if (data.hauls.length > 0)
            changeTab(recentHaul._id, recentHaul.haulName);
        // useEffect only renders on mount and NOT when component rerenders.  (Only watches isAuthenticated for changes)
    }, [isAuthenticated]);

    async function createHaul(haulName) {
        setInputVisible(false);
        if (!haulName) return;
        if (!isAuthenticated) return;
        const data = await addHaul(user.sub, haulName);
        const recentHaul = data.hauls[data.hauls.length - 1];
        setHauls(data.hauls);
        changeTab(recentHaul._id);
    }
    function changeTab(tabID, haulName = "") {
        setActiveTab(tabID);
        setSelectedHaul({ haulID: tabID, haulName });
    }
    function removeHaulFromArray(haulID) {
        setHauls(hauls.filter((haul) => haul._id !== haulID));
    }
    return (
        <div className="tabs">
            {inputVisible ? (
                <input
                    autoFocus
                    className="tab_input"
                    placeholder="Haul/Store Name"
                    onBlur={(e) => createHaul(e.target.value)}
                />
            ) : (
                <div className="tab">
                    <p
                        onClick={() => setInputVisible(true)}
                        className="tab_text"
                    >
                        + Create list
                    </p>
                </div>
            )}

            {hauls.length > 0 ? (
                hauls
                    .slice(0)
                    .reverse()
                    .map((haul, i) => {
                        return (
                            <Tab
                                name={haul.haulName}
                                auth0ID={user.sub}
                                id={haul._id}
                                activeTab={activeTab}
                                changeTab={changeTab}
                                removeHaulFromArray={removeHaulFromArray}
                                key={i}
                            />
                        );
                    })
            ) : (
                <></>
            )}
        </div>
    );
}
