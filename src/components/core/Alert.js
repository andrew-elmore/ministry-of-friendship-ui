import React from 'react';
import JoyAlert from '@mui/joy/Alert';
import PropTypes from "prop-types";

const Alert = ({ children, ...props }) => (
    <JoyAlert {...props}>
        {children}
    </JoyAlert>
);

Alert.propTypes = {
    children: PropTypes.node,
};

export default Alert;
