const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

export async function getUser(auth0ID) {
    try {
        let response = await fetch(`${serverDomain}/user/getUser/${auth0ID}`);
        return response.json();
    } catch (err) {
        console.log(err);
    }
}
try {
} catch (err) {
    console.log(err);
}
export async function getHaulNames(auth0ID) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/getHaulNames/${auth0ID}`
        );
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

export async function addHaul(auth0ID, haulName) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/createHaul/${auth0ID}/${haulName}`
        );
        return response.json();
    } catch (err) {
        console.log(err);
    }
}
export async function deleteHaul(auth0ID, haulID) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/deleteHaul/${auth0ID}/${haulID}`
        );
        return response.json();
    } catch (err) {
        console.log(err);
    }
}
export async function createListing(haulID, data) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/createListing/${haulID}`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json",
                },
            }
        );

        return response.json();
    } catch (err) {
        console.log(err);
    }
}

export async function getListings(haulID) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/getListings/${haulID}`
        );
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

export async function deleteListing(haulID, listingID) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/deleteListing/${haulID}/${listingID}`
        );
        return response.json();
    } catch (err) {
        console.log(err);
    }
}
export async function changeCurrency(auth0ID, currency) {
    try {
        let response = await fetch(
            `${serverDomain}/user/changeCurrency/${auth0ID}/${currency}`
        );
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

export async function updateListing(listingID, data) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/updateListing/${listingID}`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json",
                },
            }
        );

        return response.json();
    } catch (err) {
        console.log(err);
    }
}
