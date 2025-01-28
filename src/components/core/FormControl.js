import React from 'react';
import JoyFormControl from '@mui/joy/FormControl';
import PropTypes from "prop-types";

const FormControl = ({ children, ...props }) => (
    <JoyFormControl {...props}>
        {children}
    </JoyFormControl>
);

FormControl.propTypes = {
    children: PropTypes.node,
};

export default FormControl;
