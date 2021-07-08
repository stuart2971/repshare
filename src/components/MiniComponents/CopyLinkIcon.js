import CopyToClipboard from "react-copy-to-clipboard";

import { DuplicateIcon as Outline } from "@heroicons/react/outline";
import { DuplicateIcon as Solid } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

export default function CopyLinkIcon({ selectedHaulID }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setCopied(false);
    }, [selectedHaulID]);

    return (
        <div className="tooltip">
            <span className="tooltiptext">{copied ? "Copied" : "Copy"}</span>
            <CopyToClipboard
                text={"http://localhost:3000/" + selectedHaulID}
                onCopy={() => setCopied(true)}
            >
                {copied ? (
                    <Solid className="link_icon" />
                ) : (
                    <Outline className="link_icon" />
                )}
            </CopyToClipboard>
        </div>
    );
}
