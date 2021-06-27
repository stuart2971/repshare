// export async function postRequest(path, data) {
//     let response = await fetch("http://localhost:3001" + path, {
//         method: "POST",
//         mode: "cors",
//         credentials: "same-origin",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-type": "application/json",
//         },
//     });

//     return response.json();
// }

export async function getUser(auth0ID) {
    let response = await fetch(`http://localhost:3001/user/getUser/${auth0ID}`);
    return response.json();
}

export async function getHaulNames(auth0ID) {
    let response = await fetch(
        `http://localhost:3001/haul/getHaulNames/${auth0ID}`
    );
    return response.json();
}

export async function addHaul(auth0ID, haulName) {
    let response = await fetch(
        `http://localhost:3001/haul/createHaul/${auth0ID}/${haulName}`
    );
    return response.json();
}
