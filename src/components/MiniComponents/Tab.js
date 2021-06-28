import { deleteHaul } from "../../utils/requests";

import deleteIcon from "../../icons/delete.png";

export default function Tab({
    name,
    activeTab,
    changeTab,
    id,
    auth0ID,
    removeHaulFromArray,
}) {
    const isActive = activeTab === id;

    async function removeHaul() {
        const deleteStatus = await deleteHaul(auth0ID, id);
        removeHaulFromArray(id);
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
                    if (changeTab) changeTab(id, name);
                }}
            >
                {name}
            </p>
        </div>
    );
}
