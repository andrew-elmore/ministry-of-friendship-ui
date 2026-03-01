import React from 'react';
import { useTheme , Typography as JoyTypography } from '@mui/joy';
import PropTypes from 'prop-types';

const Typography = ({ children, ...props }) => {
    const theme = useTheme();
    const variant = props.variant || 'body1';
    const styles = theme.typography[variant];
    
    return (
        <JoyTypography {...props} sx={styles}>
            {children}
        </JoyTypography>
    )
};

Typography.propTypes = {
    children: PropTypes.node,
};

export default Typography;
