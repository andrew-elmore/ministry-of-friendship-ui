import React from 'react';
import JoyTabList from '@mui/joy/TabList';
import PropTypes from "prop-types";

const TabList = ({ children, ...props }) => (
    <JoyTabList {...props}>
        {children}
    </JoyTabList>
);

TabList.propTypes = {
    children: PropTypes.node,
};

export default TabList;
