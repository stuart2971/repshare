export default function Tab({ name, activeTab, setActiveTab, id }) {
    return (
        <p
            className="tab"
            style={activeTab === id ? { textDecoration: "underline" } : {}}
            onClick={() => {
                if (setActiveTab) setActiveTab(id);
            }}
        >
            {name}
        </p>
    );
}
