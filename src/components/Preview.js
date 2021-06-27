import Tag from "./MiniComponents/Tag";

import seePageIcon from "../icons/see_page.png";

export default function Preview({ imageSrc, title, rating, price, link, tag }) {
    return (
        <div className="preview">
            <img
                src="https://img.alicdn.com/imgextra/i4/759172603/O1CN019osg3E1V6DYiTXOVh_!!759172603.jpg_1200x1200q75.jpg_.webp"
                alt="preview"
                className="preview_image"
            />
            <div className="preview_data">
                <div className="preview_header">
                    <span className="preview_title">Ralph Lauren Hats</span>
                    <div className="tag rating inline_block">
                        <p className="tag_text">%48</p>
                    </div>
                    <div className="inline_block">
                        <Tag name="Shorts" />
                    </div>
                </div>
                <p className="preview_price">$4.25</p>
                <a
                    className="see_item"
                    href="https://img.alicdn.com/imgextra/i4/759172603/O1CN019osg3E1V6DYiTXOVh_!!759172603.jpg_1200x1200q75.jpg_.webp"
                >
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
