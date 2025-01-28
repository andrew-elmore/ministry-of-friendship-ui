import React from 'react';
import PropTypes from 'prop-types';
import { Link as JoyLink } from '@mui/joy';

const Link = ({ children, ...props }) => (
    <JoyLink {...props}>
        {children}
    </JoyLink>
);

Link.propTypes = {
    children: PropTypes.node,
};

export default Link;
