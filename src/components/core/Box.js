import React from 'react';
import PropTypes from 'prop-types';
import { Box as JoyBox } from '@mui/joy';

const Box = ({ children, ...props }) => (
    <JoyBox {...props}>
        {children}
    </JoyBox>
);

Box.propTypes = {
    children: PropTypes.node,
};

export default Box;
