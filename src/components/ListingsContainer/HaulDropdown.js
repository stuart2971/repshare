import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Confirm, Notify } from "notiflix";

import { addHaul, deleteHaul, getHaulNames } from "../../utils/requests";
import {
    Menu,
    MenuItem,
    MenuButton,
    FocusableItem,
    MenuDivider,
    MenuHeader,
} from "@szhsin/react-menu";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { copyToClipboard } from "../../utils/currency";

export default function HaulDropdown({ selectedHaul, setSelectedHaul }) {
    const { isAuthenticated, user, loginWithRedirect } = useAuth0();
    const history = useHistory();

    const [hauls, setHauls] = useState([]);
    const [newHaulName, setNewHaulName] = useState("");
    const [fetching, setFetching] = useState(false);

    useEffect(async () => {
        if (!isAuthenticated) return;
        setFetching(true);
        const data = await getHaulNames(user.sub);

        if (!data) return;
        const recentHaul = data.hauls[data.hauls.length - 1];
        setHauls(data.hauls);
        if (data.hauls.length > 0) {
            if (history.location.pathname === "/") {
                changeTab(recentHaul);
            }
        }
        setFetching(false);
        // useEffect only renders on mount and NOT when component rerenders.  (Only watches isAuthenticated for changes)
    }, [isAuthenticated]);
    function changeTab(haul) {
        setSelectedHaul(haul);
        history.replace("/");
    }
    async function listenForEnterKey(e) {
        let haulName = e.target.value;
        if (e.keyCode === 13 && haulName) {
            if (!haulName || !isAuthenticated) return;
            try {
                const data = await addHaul(user.sub, haulName);
                setHauls([...hauls, data]);
                changeTab(data);
                Notify.success("Haul Created");
                setNewHaulName("");
            } catch (err) {
                if (err)
                    Notify.failure(
                        "Cannot create haul at this time.  Try again later"
                    );
            }
        }
    }
    function removeHaulFromArray() {
        Confirm.show(
            "Delete Haul?",
            "Deleting a haul is irreversible. It cannot be restored again.",
            "Delete",
            "Cancel",
            async () => {
                setHauls(hauls.filter((haul) => haul._id !== selectedHaul._id));
                const deleteStatus = await deleteHaul(
                    user.sub,
                    selectedHaul._id
                );
                Notify.success("Haul Deleted");
                if (hauls.length === 1) setSelectedHaul({});
                else setSelectedHaul(hauls[hauls.length - 2]);
            },
            () => {}
        );
    }
    function checkIfAuthenticated() {
        if (!isAuthenticated) {
            loginWithRedirect();
        }
    }

    const menuButton = (
        <MenuButton
            className="profile_dropdown tab_selected "
            onClick={checkIfAuthenticated}
        >
            {selectedHaul.name === undefined
                ? "Create Haul"
                : selectedHaul.name}
            <ChevronDownIcon className="dropdown_icon" />
        </MenuButton>
    );
    return (
        <Menu menuButton={menuButton}>
            <FocusableItem>
                {({ ref }) => (
                    <input
                        ref={ref}
                        type="text"
                        placeholder="+ Create a haul"
                        onKeyUp={(e) => listenForEnterKey(e)}
                        value={newHaulName}
                        onChange={(e) => setNewHaulName(e.target.value)}
                    />
                )}
            </FocusableItem>
            <MenuHeader>Your Hauls ({hauls.length})</MenuHeader>
            {fetching ? (
                <MenuItem>Fetching Hauls...</MenuItem>
            ) : (
                hauls
                    .slice(0)
                    .reverse()
                    .map((haul, i) => {
                        return (
                            <MenuItem
                                value={haul._id}
                                onClick={(e) => changeTab(haul)}
                                key={i}
                            >
                                {haul.name}
                            </MenuItem>
                        );
                    })
            )}

            <MenuDivider />
            <MenuHeader>Haul Settings</MenuHeader>
            <MenuItem
                onClick={() =>
                    copyToClipboard(window.location.href + selectedHaul._id)
                }
            >
                Copy Link
            </MenuItem>
            <MenuItem styles={{ color: "red" }} onClick={removeHaulFromArray}>
                Delete Haul
            </MenuItem>
        </Menu>
    );
}
