import React from 'react';
import JoyCheckbox from '@mui/joy/Checkbox'
import PropTypes from "prop-types";

const Checkbox = ({ onChange, checked, ...props }) => (
    <JoyCheckbox
        {...props}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
    />
);

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
};

Checkbox.defaultProps = {
    onChange: () => {},
};

export default Checkbox;
