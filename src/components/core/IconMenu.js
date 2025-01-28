import React from 'react';
import PropTypes from "prop-types";
import { Menu, MenuButton, Dropdown } from '@mui/joy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const IconMenu = ({ children, color, variant, dense, disabled, icon, ...props }) => {
    return (
        <Dropdown>
            {icon === 'horiz' ? (
                <MenuButton
                    color={color}
                    variant={variant}
                    disabled={disabled}
                    sx={dense ? {minHeight: 24, height: 24, borderRadius: 12, px: 1.5} : {}}
                >
                    <MoreHorizIcon/>
                </MenuButton>
            ) : (
                <MenuButton
                    color={color}
                    variant={variant}
                    disabled={disabled}
                    sx={dense ? {minWidth: 24, width: 24, borderRadius: 12, px: 1.5} : {}}
                >
                    <MoreVertIcon/>
                </MenuButton>
            )}
            <Menu
                {...props}
                color={color}
                variant={variant}
            >
                {children}
            </Menu>
        </Dropdown>
    )
};

IconMenu.propTypes = {
    children: PropTypes.node,
    icon: PropTypes.oneOf(['vert', 'horiz']),
    color: PropTypes.string,
    variant: PropTypes.string,
    dense: PropTypes.bool,
    disabled: PropTypes.bool,
};

IconMenu.defaultProps = {
    icon: 'vert',
    color: '',
    variant: '',
    dense: false,
    disabled: false,
}

export default IconMenu;
