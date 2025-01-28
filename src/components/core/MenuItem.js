import React from 'react';
import JoyMenuItem from '@mui/joy/MenuItem';
import PropTypes from "prop-types";

const MenuItem = ({ children, ...props }) => (
    <JoyMenuItem {...props}>
        {children}
    </JoyMenuItem>
);

MenuItem.propTypes = {
    children: PropTypes.node,
};

export default MenuItem;
