import React from 'react';
import JoyTabPanel from '@mui/joy/TabPanel';
import PropTypes from "prop-types";

const TabPanel = ({ children, ...props }) => (
    <JoyTabPanel {...props}>
        {children}
    </JoyTabPanel>
);

TabPanel.propTypes = {
    children: PropTypes.node,
};

export default TabPanel;
