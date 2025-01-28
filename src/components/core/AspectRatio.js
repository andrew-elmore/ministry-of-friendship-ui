import React from 'react';
import JoyAspectRatio from '@mui/joy/AspectRatio';
import PropTypes from "prop-types";

const AspectRatio = ({ children, ...props }) => (
    <JoyAspectRatio {...props}>
        {children}
    </JoyAspectRatio>
);

AspectRatio.propTypes = {
    children: PropTypes.node,
};

export default AspectRatio;
