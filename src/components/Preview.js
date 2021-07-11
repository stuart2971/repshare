import Tag from "./MiniComponents/Tag";

import "./styles/Preview.css";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import { convertCurrency } from "../utils/currency";

export default function Preview({ selectedListing, currency }) {
    const price = convertCurrency(currency, selectedListing.price);
    const imageURL = selectedListing.imageURL
        ? selectedListing.imageURL[0]
        : "";

    return (
        <div className="preview">
            <div className="preview_image_container">
                {imageURL ? (
                    <img
                        src={imageURL}
                        alt="preview"
                        className="preview_image"
                        autoPlay
                        muted
                    />
                ) : (
                    <></>
                )}
            </div>

            <div className="preview_data">
                <div className="preview_header">
                    <span className="preview_title">
                        {selectedListing.itemName
                            ? selectedListing.itemName
                            : "No name"}
                    </span>

                    {selectedListing.rating ? (
                        <div className="tag rating inline_block">
                            <p className="tag_text">
                                {selectedListing.rating}%
                            </p>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className="inline_block">
                        {selectedListing.tag ? (
                            <Tag name={selectedListing.tag} />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <p className="preview_price">
                    {price.includes("NaN") ? "" : price}
                </p>
                <a
                    className="see_item"
                    onClick={() => window.open(selectedListing.link)}
                >
                    <ExternalLinkIcon style={{ width: "30px" }} />
                </a>
            </div>
        </div>
    );
}
