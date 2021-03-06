import {
    Menu,
    MenuButton,
    MenuHeader,
    MenuItem,
    SubMenu,
    MenuRadioGroup,
} from "@szhsin/react-menu";
import { useAuth0 } from "@auth0/auth0-react";

import "./styles/Navbar.css";
import "@szhsin/react-menu/dist/index.css";
import { changeCurrency } from "../utils/requests";
import { useHistory } from "react-router-dom";

export default function Navbar({ currency, setCurrency }) {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const history = useHistory();
    const menuButton = (
        <MenuButton className="profile_dropdown">
            {isAuthenticated ? (
                <img src={user.picture} />
            ) : (
                <button className="theme_button">Log in</button>
            )}
        </MenuButton>
    );

    async function handleCredentials() {
        if (isAuthenticated) logout();
        else {
            loginWithRedirect();
        }
    }
    async function changeCurrencyTo(curr) {
        if (isAuthenticated) await changeCurrency(user.sub, curr);
        setCurrency(curr);
    }
    return (
        <div className="navbar space_between">
            <div className="logo_container">
                <h1 className="logo" onClick={() => history.replace("/")}>
                    RepShare
                </h1>
            </div>
            <div>
                <Menu menuButton={menuButton}>
                    {isAuthenticated ? (
                        <MenuHeader>{user.name}</MenuHeader>
                    ) : (
                        ""
                    )}
                    <SubMenu label="Currency">
                        <MenuRadioGroup
                            value={currency}
                            onChange={(e) => changeCurrencyTo(e.value)}
                        >
                            <MenuItem value="CNY">Yuan</MenuItem>
                            <MenuItem value="CAD">Canadian Dollar</MenuItem>
                            <MenuItem value="USD">American Dollar</MenuItem>
                            <MenuItem value="EUR">Euro</MenuItem>
                            <MenuItem value="GBP">Pound</MenuItem>
                            <MenuItem value="SEK">Krona</MenuItem>
                        </MenuRadioGroup>
                    </SubMenu>
                    <MenuItem onClick={handleCredentials}>
                        {isAuthenticated ? "Log out" : "Log in"}
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}
