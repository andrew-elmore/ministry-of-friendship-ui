import React from 'react';
import JoyAvatar from '@mui/joy/Avatar';
import PropTypes from "prop-types";

const Avatar = ({ children, ...props }) => (
    <JoyAvatar {...props}>
        {children}
    </JoyAvatar>
);

Avatar.propTypes = {
    children: PropTypes.node,
};

export default Avatar;
