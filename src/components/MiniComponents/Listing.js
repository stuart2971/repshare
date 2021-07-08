import { convertCurrency } from "../../utils/currency";
import Tag from "./Tag";

export default function Listing({ listing, setSelectedListing, currency }) {
    const MAX_LENGTH = 25;
    function shortenItemName(itemName) {
        if (itemName.length > MAX_LENGTH) {
            return itemName.substring(0, MAX_LENGTH - 3) + "...";
        } else {
            return itemName;
        }
    }
    let price = convertCurrency(currency, listing.price);
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
