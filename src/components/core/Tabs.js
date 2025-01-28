import React from 'react';
import JoyTabs from '@mui/joy/Tabs';
import PropTypes from "prop-types";

const Tabs = ({ children, ...props }) => (
    <JoyTabs {...props}>
        {children}
    </JoyTabs>
);

Tabs.propTypes = {
    children: PropTypes.node,
};

export default Tabs;
