import React from 'react';
import PropTypes from 'prop-types';
import { Container as JoyContainer } from '@mui/joy';

const Container = ({ children, ...props }) => (
    <JoyContainer {...props}>
        {children}
    </JoyContainer>
);

Container.propTypes = {
    children: PropTypes.node,
};

export default Container;
