import React from 'react';
import JoySwitch from '@mui/joy/Switch';
import PropTypes from "prop-types";
import Typography from "./Typography";

const Switch = ({ label, ...props }) => (
    <Typography component="label" startDecorator={<JoySwitch {...props} />}>
        {label}
    </Typography>



);

Switch.propTypes = {
    label: PropTypes.string.isRequired
};

export default Switch;
