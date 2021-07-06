import Tag from "./Tag";

export default function Listing({ listing, setSelectedListing, currency }) {
    const MAX_LENGTH = 25;

    // Might want to use an api or something instead
    function convertToCurrency(p) {
        let price = parseFloat(p);
        if (currency === "CNY") return "¥" + price;

        switch (currency) {
            case "CAD":
                return "$" + (price * 0.1909531).toFixed(2);
            case "USD":
                return "$" + (price * 0.15470775).toFixed(2);
            case "EUR":
                return "€" + (price *= 0.1303817).toFixed(2);
            case "GBP":
                return "£" + (price *= 0.111637886).toFixed(2);
            case "SEK":
                return (price *= 1.3225455).toFixed(2) + "kr";
        }
    }
    function shortenItemName(itemName) {
        if (itemName.length > MAX_LENGTH) {
            return itemName.substring(0, MAX_LENGTH - 3) + "...";
        } else {
            return itemName;
        }
    }
    let price = convertToCurrency(listing.price);
    let itemName = shortenItemName(listing.itemName);
    return (
        <div onClick={() => setSelectedListing(listing)} className="listing">
            <div className="space_between">
                <p className="listing_text">
                    {itemName || "No item name found"}
                </p>

                <p className="listing_text">{price || "No price found"}</p>
            </div>
            <div className="space_between">
                {listing.tag ? <Tag name={listing.tag} /> : <div></div>}

                {listing.rating ? (
                    <div className="tag rating">
                        <p className="tag_text">{listing.rating}%</p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
