export default function Tag({ name, selectedTag, setSelectedTag }) {
    return (
        <div
            onClick={() => {
                if (setSelectedTag) setSelectedTag(name);
            }}
            className={`tag faded50 ${
                selectedTag === name ? "tag_selected" : ""
            }`}
        >
            <p className="tag_text">{name}</p>
        </div>
    );
}
