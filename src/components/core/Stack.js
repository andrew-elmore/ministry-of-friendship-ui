import React from 'react';
import PropTypes from 'prop-types';
import { Stack as JoyStack } from '@mui/joy';

const Stack = ({ children, ...props }) => (
    <JoyStack {...props}>
        {children}
    </JoyStack>
);

Stack.propTypes = {
    children: PropTypes.node,
};

export default Stack;
