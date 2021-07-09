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

export default function HaulDropdown({ selectedHaul, setSelectedHaul }) {
    const { isAuthenticated, user } = useAuth0();
    const history = useHistory();

    const [hauls, setHauls] = useState([]);
    const [newHaulName, setNewHaulName] = useState("");

    useEffect(async () => {
        if (!isAuthenticated) return;
        const data = await getHaulNames(user.sub);

        if (!data) return;
        const recentHaul = data.hauls[data.hauls.length - 1];
        setHauls(data.hauls);
        if (data.hauls.length > 0) {
            if (history.location.pathname === "/") {
                changeTab(recentHaul);
            }
        }
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
            const data = await addHaul(user.sub, haulName);
            setHauls([...hauls, data]);
            changeTab(data);
            Notify.success("Haul Created");
            setNewHaulName("");
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
                setSelectedHaul(hauls[hauls.length - 2]);
            },
            () => {}
        );
    }
    const menuButton = (
        <MenuButton className="menuButton tab_selected ">
            {selectedHaul.name}
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
            <MenuHeader>Your Hauls</MenuHeader>
            {hauls
                .slice(0)
                .reverse()
                .map((haul) => {
                    return (
                        <MenuItem
                            value={haul._id}
                            onClick={(e) => changeTab(haul)}
                        >
                            {haul.name}
                        </MenuItem>
                    );
                })}

            <MenuDivider />
            <MenuHeader>Haul Settings</MenuHeader>
            <MenuItem>Copy Link</MenuItem>
            <MenuItem styles={{ color: "red" }} onClick={removeHaulFromArray}>
                Delete Haul
            </MenuItem>
        </Menu>
    );
}
