import { deleteHaul } from "../../utils/requests";

import deleteIcon from "../../icons/delete.png";

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
                <img
                    onClick={removeHaul}
                    className="tab_delete_icon"
                    src={deleteIcon}
                />
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
