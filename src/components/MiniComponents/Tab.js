export default function Tab({ name, setCopied, activeTab, setActiveTab }) {
    return (
        <p
            onClick={() => setCopied(false)}
            className="tab"
            style={activeTab == name ? { textDecoration: "underline" } : {}}
            onClick={() => setActiveTab(name)}
        >
            {name}
        </p>
    );
}
