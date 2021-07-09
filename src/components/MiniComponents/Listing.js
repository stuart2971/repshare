import { convertCurrency } from "../../utils/currency";
import Spinner from "./Loader";
import Tag from "./Tag";

export default function Listing({ listing, changeSelectedListing, currency }) {
    const MAX_LENGTH = 25;
    function shortenItemName(itemName) {
        if (itemName.length > MAX_LENGTH) {
            return itemName.substring(0, MAX_LENGTH - 3) + "...";
        } else {
            return itemName;
        }
    }
    const isFetching = listing._id.includes("TEMPID");
    let price = isFetching ? (
        <Spinner />
    ) : listing.price === undefined ? (
        ""
    ) : (
        convertCurrency(currency, listing.price)
    );
    let itemName = isFetching
        ? "Fetching data..."
        : shortenItemName(listing.itemName);
    return (
        <div onClick={() => changeSelectedListing(listing)} className="listing">
            <div className="space_between">
                <p className="listing_text">
                    {itemName === "" ? "Cannot find item" : itemName}
                </p>

                <p className="listing_text">{price}</p>
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
