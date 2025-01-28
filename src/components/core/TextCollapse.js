import React, { useState } from "react";
import PropTypes from "prop-types";

const styles = { border: 0, borderRadius: 10, cursor: "pointer" };

const collapseText = (content, maxLength = 100) => {
    if (content.length < maxLength) {
        return content;
    }

    return content.substring(0, content.indexOf(" ", maxLength));
};

const TextCollapse = ({ content, maxLength = 100 }) => {
    const [expanded, setExpanded] = useState(false);

    const collapsedText = collapseText(content, maxLength);

    if (collapsedText === content || expanded) {
        return <span>{content}</span>;
    }

    return (
        <span>
            {collapsedText}{" "}
            <button onClick={() => setExpanded(true)} style={styles}>
        ...
            </button>
        </span>
    );
};

TextCollapse.propTypes = {
    content: PropTypes.string,
    maxLength: PropTypes.number,
};

export default TextCollapse;
