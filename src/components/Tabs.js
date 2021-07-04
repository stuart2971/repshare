import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import { getHaulNames, addHaul } from "../utils/requests";
import Tab from "./MiniComponents/Tab";

import "./styles/Tabs.css";

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
        if (data.hauls.length > 0) changeTab(recentHaul);
        // useEffect only renders on mount and NOT when component rerenders.  (Only watches isAuthenticated for changes)
    }, [isAuthenticated]);

    async function createHaul(haulName) {
        setInputVisible(false);
        if (!haulName || !isAuthenticated) return;
        const data = await addHaul(user.sub, haulName);
        setHauls([...hauls, data]);
        changeTab(data);
    }
    function changeTab(haul) {
        setActiveTab(haul._id);
        setSelectedHaul(haul);
    }
    function removeHaulFromArray(id) {
        setHauls(hauls.filter((haul) => haul._id !== id));
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
                                haul={haul}
                                auth0ID={user.sub}
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
