import Tag from "./MiniComponents/Tag";

import seePageIcon from "../icons/see_page.png";
import "./styles/Preview.css";

export default function Preview({ selectedListing }) {
    return (
        <div className="preview">
            <div className="preview_image_container">
                <img
                    src={
                        selectedListing.imageURL
                            ? selectedListing.imageURL[0]
                            : ""
                    }
                    alt="preview"
                    className="preview_image"
                    autoPlay
                    muted
                />
            </div>

            <div className="preview_data">
                <div className="preview_header">
                    <span className="preview_title">
                        {selectedListing.itemName}
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
                <p className="preview_price">{selectedListing.price}</p>
                <a className="see_item" href={selectedListing.link}>
                    <img
                        style={{ width: "25px" }}
                        src={seePageIcon}
                        alt="Go to link"
                    />
                </a>
            </div>
        </div>
    );
}
