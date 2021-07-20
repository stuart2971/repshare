import "./styles/Preview.css";
import {
    convertCurrency,
    getRatingColor,
    shortenItemName,
} from "../utils/currency";

export default function Preview({ selectedListing }) {
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
                    <a
                        target="_blank"
                        style={{ color: "black" }}
                        href={selectedListing.link}
                    >
                        <span className="preview_title">
                            {selectedListing.itemName
                                ? shortenItemName(selectedListing.itemName, 200)
                                : "No name"}
                        </span>
                    </a>
                </div>

                {selectedListing.comment ? (
                    <p className="faded50 preview_comment">
                        Comment: {selectedListing.comment}
                    </p>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
