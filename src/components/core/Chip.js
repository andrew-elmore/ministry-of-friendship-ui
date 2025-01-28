import React from 'react';
import JoyChip from '@mui/joy/Chip';
import PropTypes from "prop-types";

const Chip = ({ children, ...props }) => (
    <JoyChip {...props}>
        {children}
    </JoyChip>
);

Chip.propTypes = {
    children: PropTypes.node,
};

export default Chip;
