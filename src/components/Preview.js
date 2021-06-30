import Tag from "./MiniComponents/Tag";

import seePageIcon from "../icons/see_page.png";

export default function Preview({ selectedListing }) {
    console.log(selectedListing);
    return (
        <div className="preview">
            <img
                src={selectedListing.imageURL}
                alt="preview"
                className="preview_image"
            />
            <div className="preview_data">
                <div className="preview_header">
                    <span className="preview_title">
                        {selectedListing.itemName}
                    </span>
                    <div className="tag rating inline_block">
                        <p className="tag_text">{selectedListing.rating}%</p>
                    </div>
                    <div className="inline_block">
                        <Tag name={selectedListing.tag} />
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
