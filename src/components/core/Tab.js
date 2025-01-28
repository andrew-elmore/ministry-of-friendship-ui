import React from 'react';
import JoyTab from '@mui/joy/Tab';
import PropTypes from "prop-types";

const Tab = ({ children, ...props }) => (
    <JoyTab {...props}>
        {children}
    </JoyTab>
);

Tab.propTypes = {
    children: PropTypes.node,
};

export default Tab;
