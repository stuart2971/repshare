export function convertCurrency(currency, price) {
    if (currency === "CNY") return "¥" + price;
    const p = parseFloat(price);
    switch (currency) {
        case "CAD":
            return "$" + (p * 0.1909531).toFixed(2);
        case "USD":
            return "$" + (p * 0.15470775).toFixed(2);
        case "EUR":
            return "€" + (p * 0.1303817).toFixed(2);
        case "GBP":
            return "£" + (p * 0.111637886).toFixed(2);
        case "SEK":
            return (p * 1.3225455).toFixed(2) + "kr";
    }
}
export function copyToClipboard(txt) {
    let temp = document.createElement("textarea");
    temp.value = txt;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
}

export function getHaulIDFromURL(history) {
    let path = history.location.pathname;
    if (path !== "/") {
        console.log(path.substring(1, path.length));
        return path.substring(1, path.length);
    }
    return null;
}
export function shortenItemName(itemName, length) {
    if (itemName.length > length) {
        return itemName.substring(0, length - 3) + "...";
    } else {
        return itemName;
    }
}
export function getRatingColor(rating) {
    const color1 = [26, 183, 2];
    const color2 = [238, 42, 2];
    var w1 = rating;
    var w2 = 1 - w1;
    var rgb = [
        Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2),
    ];
    return rgb;
}
export function calculatePriceFromListings(listings, currency) {
    let total = 0;
    for (let i = 0; i < listings.length; i++) {
        if (!listings[i].price) continue;
        total += parseFloat(listings[i].price);
    }
    return convertCurrency(currency, total);
}
