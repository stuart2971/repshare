import { useAuth0 } from "@auth0/auth0-react";

export default function CredentialButton() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    async function handleCredentials() {
        if (isAuthenticated) logout();
        else {
            loginWithRedirect();
        }
    }
    return (
        <div className="credential_container" onClick={handleCredentials}>
            {isAuthenticated ? "Logout" : "Login"}
        </div>
    );
}
