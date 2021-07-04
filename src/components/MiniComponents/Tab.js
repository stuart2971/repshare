import { deleteHaul } from "../../utils/requests";

import { XIcon } from "@heroicons/react/outline";

export default function Tab({
    haul,
    activeTab,
    changeTab,
    auth0ID,
    removeHaulFromArray,
}) {
    const isActive = activeTab === haul._id;

    async function removeHaul() {
        const deleteStatus = deleteHaul(auth0ID, haul._id);
        removeHaulFromArray(haul._id);
    }

    return (
        <div className={`relative tab ${isActive ? "tab_active" : ""}`}>
            {isActive ? (
                <XIcon onClick={removeHaul} className="tab_delete_icon" />
            ) : (
                <></>
            )}
            <p
                className="tab_text"
                onClick={() => {
                    if (changeTab) changeTab(haul);
                }}
            >
                {haul.name}
            </p>
        </div>
    );
}
