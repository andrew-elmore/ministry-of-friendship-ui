import React from 'react';
import JoyCard from '@mui/joy/Card';
import PropTypes from "prop-types";

const Card = ({ children, ...props }) => (
    <JoyCard {...props}>
        {children}
    </JoyCard>
);

Card.propTypes = {
    children: PropTypes.node,
};

export default Card;
