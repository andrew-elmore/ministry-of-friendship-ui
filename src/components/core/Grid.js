import React from 'react';
import PropTypes from 'prop-types';
import { Grid as JoyGrid } from '@mui/joy';

const Grid = ({ children, ...props }) => (
    <JoyGrid {...props}>
        {children}
    </JoyGrid>
);

Grid.propTypes = {
    children: PropTypes.node,
};

export default Grid;
