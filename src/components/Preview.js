import Tag from "./MiniComponents/Tag";

import "./styles/Preview.css";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import {
    convertCurrency,
    getRatingColor,
    shortenItemName,
} from "../utils/currency";

export default function Preview({ selectedListing, currency }) {
    const price = convertCurrency(currency, selectedListing.price);
    const ratingColor = getRatingColor(selectedListing.rating / 100);

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
                            ? shortenItemName(selectedListing.itemName, 200)
                            : "No name"}
                    </span>
                </div>

                {selectedListing.comment ? (
                    <p className="faded50 preview_comment">
                        Comment: {selectedListing.comment}
                    </p>
                ) : (
                    <></>
                )}

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
