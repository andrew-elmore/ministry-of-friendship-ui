import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DOMPurify from 'dompurify';

const SanitizeHTML = ({ content }) => {
    const [sanitizedContent, setSanitizedContent] = useState('');

    useEffect(() => {
        setSanitizedContent(DOMPurify.sanitize(content));
    }, [content]);

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: sanitizedContent,
            }}
        />
    );
};

SanitizeHTML.propTypes = {
    content: PropTypes.string,
};

export default SanitizeHTML;
