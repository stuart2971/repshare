const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

export async function getUser(auth0ID) {
    let response = await fetch(`${serverDomain}/user/getUser/${auth0ID}`);
    return response.json();
}

export async function getHaulNames(auth0ID) {
    let response = await fetch(`${serverDomain}/haul/getHaulNames/${auth0ID}`);
    return response.json();
}

export async function addHaul(auth0ID, haulName) {
    let response = await fetch(
        `${serverDomain}/haul/createHaul/${auth0ID}/${haulName}`
    );
    return response.json();
}
export async function deleteHaul(auth0ID, haulID) {
    let response = await fetch(
        `${serverDomain}/haul/deleteHaul/${auth0ID}/${haulID}`
    );
    return response.json();
}
export async function createListing(haulID, data) {
    let response = await fetch(`${serverDomain}/haul/createListing/${haulID}`, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    });

    return response.json();
}

export async function getListings(haulID) {
    let response = await fetch(`${serverDomain}/haul/getListings/${haulID}`);
    return response.json();
}

export async function deleteListing(haulID, listingID) {
    let response = await fetch(
        `${serverDomain}/haul/deleteListing/${haulID}/${listingID}`
    );
    return response.json();
}
export async function changeCurrency(auth0ID, currency) {
    let response = await fetch(
        `${serverDomain}/user/changeCurrency/${auth0ID}/${currency}`
    );
    return response.json();
}
