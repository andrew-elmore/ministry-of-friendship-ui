import React from 'react';
import JoyIconButton from '@mui/joy/IconButton';
import PropTypes from "prop-types";

const IconButton = ({ children, ...props }) => (
    <JoyIconButton {...props}>
        {children}
    </JoyIconButton>
);

IconButton.propTypes = {
    children: PropTypes.node,
};

export default IconButton;
