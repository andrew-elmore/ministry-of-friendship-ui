import React from 'react';
import PropTypes from 'prop-types';
import { Button as JoyButton } from '@mui/joy';
import { useDispatch } from 'react-redux';
import appActions from 'actions/appActions';

const Button = ({ children, onClick, eventCategory = 'Button', eventAction = 'Click', eventLabel, ...props }) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {

        if (onClick) {
            onClick(e);
        }
    };

    return (
        <JoyButton {...props} onClick={handleClick}>
            {children}
        </JoyButton>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    eventCategory: PropTypes.string,
    eventAction: PropTypes.string,
    eventLabel: PropTypes.string,
};

export default Button;
