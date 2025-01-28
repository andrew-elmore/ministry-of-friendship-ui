import React from 'react';
import PropTypes from "prop-types";
import JoyMenu from '@mui/joy/Menu';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

const Menu = ({ children, onClose, ...props }) => (
    <ClickAwayListener onClickAway={onClose}>
        <JoyMenu onClose={onClose} {...props}>
            {children}
        </JoyMenu>
    </ClickAwayListener>
);

Menu.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
};

Menu.defaultProps = {
    onClose: () => {},
}

export default Menu;
