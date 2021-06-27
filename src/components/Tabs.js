import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getHaulNames, addHaul } from "../utils/requests";

import Tab from "./MiniComponents/Tab";

export default function Tabs() {
    const { isAuthenticated, user } = useAuth0();

    const [activeTab, setActiveTab] = useState("");
    const [hauls, setHauls] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);

    useEffect(async () => {
        if (!isAuthenticated) return;
        const data = await getHaulNames(user.sub);
        setHauls(data.hauls);
        if (data.hauls.length > 0)
            setActiveTab(data.hauls[data.hauls.length - 1]._id);
        // useEffect only renders on mount and NOT when component rerenders.  (Only watches isAuthenticated for changes)
    }, [isAuthenticated]);

    async function createHaul(haulName) {
        if (!isAuthenticated) return;
        setInputVisible(false);
        const data = await addHaul(user.sub, haulName);
        setHauls(data.hauls);
        setActiveTab(data.hauls[data.hauls.length - 1]._id);
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
                <p onClick={() => setInputVisible(true)} className="tab">
                    + Create list
                </p>
            )}

            {hauls.length > 0 ? (
                hauls
                    .slice(0)
                    .reverse()
                    .map((haul, i) => {
                        return (
                            <Tab
                                name={haul.haulName}
                                id={haul._id}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
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
