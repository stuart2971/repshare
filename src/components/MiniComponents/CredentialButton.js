import { useAuth0 } from "@auth0/auth0-react";

export default function CredentialButton() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    async function handleCredebtials() {
        if (isAuthenticated) logout();
        else {
            loginWithRedirect();
        }
    }
    return (
        <button
            onClick={handleCredebtials}
            className="theme_button credentials_button"
        >
            {isAuthenticated ? "Log out" : "Log in"}
        </button>
    );
}
