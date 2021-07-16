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

var percentColors = [
    { pct: 0.0, color: { r: 0xe9, g: 0x30, b: 0x3e } },
    { pct: 0.5, color: { r: 0xfd, g: 0xc2, b: 0xe } },
    { pct: 1.0, color: { r: 0x19, g: 0xb5, b: 0x1 } },
];
export function getRatingColor(pct) {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    return [
        Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
    ];
}
export function calculatePriceFromListings(listings, currency) {
    let total = 0;
    for (let i = 0; i < listings.length; i++) {
        if (!listings[i].price) continue;
        total += parseFloat(listings[i].price);
    }
    return convertCurrency(currency, total);
}
