import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const buttonStyles = { border: 0, borderRadius: 10, cursor: 'pointer' };

const HTMLCollapse = ({ children, allowExpand = true, maxHeight = 100 }) => {
    const [expanded, setExpanded] = useState(false);

    const [childrenBounds, setChildrenBounds] = useState({ width: 0, height: 0 });

    const expandable = allowExpand && childrenBounds.height > maxHeight;

    const callbackRef = useCallback(
        (node) => {
            setChildrenBounds(node?.getBoundingClientRect());
        },
        [children]
    );

    return (
        <div>
            <div
                style={{
                    overflow: 'hidden',
                    maxHeight: expanded ? 'initial' : maxHeight,
                    maskImage:
            !expanded && childrenBounds.height > maxHeight
                ? 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) calc(100% - 50px), rgba(0, 0, 0, 0) 100%)'
                : undefined,
                }}
            >
                <div ref={callbackRef} style={{ overflow: 'auto' }}>
                    {children}
                </div>
            </div>
            {!expanded && expandable && (
                <button onClick={() => setExpanded(true)} style={buttonStyles}>
          ...
                </button>
            )}
        </div>
    );
};

HTMLCollapse.propTypes = {
    allowExpand: PropTypes.bool,
    maxHeight: PropTypes.number,
    children: PropTypes.node,
};

export default HTMLCollapse;
