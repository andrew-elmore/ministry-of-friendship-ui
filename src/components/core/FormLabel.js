import React from 'react';
import JoyFormLabel from '@mui/joy/FormLabel';
import PropTypes from "prop-types";

const FormLabel = ({ children, ...props }) => (
    <JoyFormLabel {...props}>
        {children}
    </JoyFormLabel>
);

FormLabel.propTypes = {
    children: PropTypes.node,
};

export default FormLabel;
