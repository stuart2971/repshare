import {
    Menu,
    MenuButton,
    SubMenu,
    MenuItem,
    MenuRadioGroup,
    MenuDivider,
} from "@szhsin/react-menu";
import { useEffect, useState } from "react";
import RepShare from "../RepShare.json";

import { AdjustmentsIcon } from "@heroicons/react/outline";
import { calculatePriceFromListings } from "../../utils/currency";

const RATING_FILTER_OPTIONS = [
    {
        name: "50%+",
        value: 50,
    },
    {
        name: "60%+",
        value: 60,
    },
    {
        name: "70%+",
        value: 70,
    },
    {
        name: "80%+",
        value: 80,
    },
    {
        name: "90%+",
        value: 90,
    },
    {
        name: "100%",
        value: 100,
    },
];

export default function Filters({ setListings, ALL_LISTINGS, currency }) {
    const [tag, setTag] = useState("");
    const [rating, setRating] = useState("");
    const [totalPrice, setTotalPrice] = useState();
    useEffect(() => {
        setTotalPrice(
            ALL_LISTINGS
                ? calculatePriceFromListings(ALL_LISTINGS, currency || "CNY")
                : 0
        );
    }, [ALL_LISTINGS, currency]);

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
        setTotalPrice(
            calculatePriceFromListings(newListings, currency || "CNY")
        );
        setListings(newListings);
    }, [tag, rating]);

    function clearFilters() {
        setListings(ALL_LISTINGS);
        setTag("");
        setRating("");
    }
    return (
        <div className="filter_container space_between">
            <div>
                <Menu
                    menuButton={
                        <MenuButton className="filter_dropdown">
                            Filter
                            <AdjustmentsIcon style={{ width: "25px" }} />
                        </MenuButton>
                    }
                    arrow="arrow"
                >
                    <SubMenu label="Tag">
                        <MenuRadioGroup value={tag}>
                            {RepShare.tags.map((tag, i) => {
                                return (
                                    <MenuItem
                                        onClick={(e) => setTag(e.value)}
                                        value={tag}
                                    >
                                        {tag}
                                    </MenuItem>
                                );
                            })}
                        </MenuRadioGroup>
                    </SubMenu>
                    <SubMenu label="Rating">
                        <MenuRadioGroup value={rating}>
                            {RATING_FILTER_OPTIONS.map((option, i) => {
                                return (
                                    <MenuItem
                                        onClick={(e) => setRating(e.value)}
                                        value={option.value}
                                    >
                                        {option.name}
                                    </MenuItem>
                                );
                            })}
                        </MenuRadioGroup>
                    </SubMenu>
                    <MenuDivider />
                    <MenuItem onClick={clearFilters}>Clear Filters</MenuItem>
                </Menu>
                <div
                    className="faded50 current_filters"
                    style={{ display: "flex" }}
                >
                    {tag || rating ? <p>Current Filters: </p> : <></>}
                    {tag ? <p>{tag}</p> : <></>}
                    {rating ? <p>{rating}%+</p> : <></>}
                </div>
            </div>
            <div className="faded50">Total {totalPrice}</div>
        </div>
    );
}
