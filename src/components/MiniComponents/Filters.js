export default function Filters() {
    return (
        <div className="filter_container space_between">
            <p className="filter_text">Filter</p>
            <div>
                <select
                    name="tags"
                    id
                    className="filter_dropdown faded50 ml_40"
                >
                    <option value="shorts">Shorts</option>
                </select>
                <select
                    name="prices"
                    id
                    className="filter_dropdown faded50 ml_40"
                >
                    <option value="$0-5">$0-5</option>
                </select>
                <select
                    name="ratings"
                    id
                    className="filter_dropdown faded50 ml_40"
                >
                    <option value="%60-70">%60-70</option>
                </select>
            </div>
        </div>
    );
}
