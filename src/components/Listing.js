import Tag from "./MiniComponents/Tag";

export default function Listing({ itemName, tag, price, rating }) {
    return (
        <div className="listing">
            <div className="space_between">
                <p className="listing_text">{itemName}</p>
                <p className="listing_text">{price}</p>
            </div>
            <div className="space_between">
                {tag ? <Tag name={tag} /> : <div></div>}

                <div className="tag rating">
                    <p className="tag_text">%{rating}</p>
                </div>
            </div>
        </div>
    );
}
