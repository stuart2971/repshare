import Tag from "./Tag";

export default function Listing({ listing, setSelectedListing }) {
    return (
        <div onClick={() => setSelectedListing(listing)} className="listing">
            <div className="space_between">
                <p className="listing_text">
                    {listing.itemName || "No item name found"}
                </p>

                <p className="listing_text">
                    {listing.price || "No price found"}
                </p>
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
