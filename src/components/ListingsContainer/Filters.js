import { useEffect, useState } from "react";
import RepShare from "../RepShare.json";

export default function Filters({ setListings, ALL_LISTINGS, selectedHaulID }) {
    const [tag, setTag] = useState("");
    const [rating, setRating] = useState("");

    useEffect(() => {
        if (!ALL_LISTINGS) return;
        let newListings = [];
        for (let i = 0; i < ALL_LISTINGS.length; i++) {
            let tagFilter = tag === "" ? true : ALL_LISTINGS[i].tag === tag;

            let ratingFilter = ALL_LISTINGS[i].rating >= rating;
            if (tagFilter && ratingFilter) {
                newListings.push(ALL_LISTINGS[i]);
                continue;
            }
        }

        setListings(newListings);
    }, [tag, rating]);

    return (
        <div className="filter_container space_between">
            <p className="filter_text">Filter</p>
            <div>
                <span
                    onClick={() => setListings(ALL_LISTINGS)}
                    className="faded50"
                >
                    Clear
                </span>
                <select
                    name="tags"
                    onChange={(e) => setTag(e.target.value)}
                    className="filter_dropdown faded50 ml_40"
                >
                    <option value={""}>Tag</option>
                    {RepShare.tags.map((tag, i) => {
                        return (
                            <option key={i} value={tag}>
                                {tag}
                            </option>
                        );
                    })}
                </select>
                <select
                    name="ratings"
                    className="filter_dropdown faded50 ml_40"
                    onChange={(e) => setRating(e.target.value)}
                >
                    <option value={0}>Rating</option>
                    <option value={50}>50%+</option>
                    <option value={60}>60%+</option>
                    <option value={70}>70%+</option>
                    <option value={80}>80%+</option>
                    <option value={90}>90%+</option>
                    <option value={100}>100%</option>
                </select>
            </div>
        </div>
    );
}
