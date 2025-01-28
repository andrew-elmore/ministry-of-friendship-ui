import React from 'react';
import JoyTable from '@mui/joy/Table';
import PropTypes from "prop-types";

const Table = ({ children, ...props }) => (
    <JoyTable {...props}>
        {children}
    </JoyTable>
);

Table.propTypes = {
    children: PropTypes.node,
};

export default Table;
