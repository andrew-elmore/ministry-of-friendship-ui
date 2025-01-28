import React from 'react';
import PropTypes from 'prop-types';
import { Sheet as JoySheet } from '@mui/joy';

const capRadius = 128;
const capGutter = (capRadius/3*2)

export const colorsOptions = ['primary', 'secondary', 'danger', 'info', 'success', 'warning', 'neutral'];
export const variantOptions = ['solid', 'outlined', 'soft', 'plain'];
export const capOptions = ['none', 'top', 'bottom', 'all'];
export const gradientOptions = ['none', 'top', 'bottom'];

const Sheet = ({ cap, gradient, variant, color, ...props }) => {
    const borderRadius = (() => {
        switch (cap) {
            case 'top':
                return `${capRadius}px ${capRadius}px 0 0`;
            case 'bottom':
                return `0 0 ${capRadius}px ${capRadius}px`;
            case 'all':
                return capRadius;
            default:
                return '';
        }
    })();

    const gradientBackground = (() => {
        if (gradient !== 'none') {
            const colorVar = `--joy-palette-${color}-${variant === 'solid' || variant === 'soft' ? `${variant}Bg` : '50'}`;
            const startColor = `var(${colorVar})`;
            const endColor = (variant === 'solid' || variant === 'soft') ? `var(--joy-palette-${color}-50)` : 'white';

            if (gradient === 'top') {
                return `linear-gradient(to top, ${startColor}, ${endColor})`;
            } else if (gradient === 'bottom') {
                return `linear-gradient(to bottom, ${startColor}, ${endColor})`;
            }
        }
        return '';
    })();

    const customStyles = {
        borderRadius,
        background: gradientBackground,
        paddingRight: 4,
        paddingLeft: 4,
        paddingTop: (cap === 'top' || cap === 'all') ? `${capGutter}px` : '',
        paddingBottom: (cap === 'bottom' || cap === 'all') ? `${capGutter}px` : '',
    };

    return <JoySheet {...props} color={color} variant={variant} sx={{...customStyles, ...(props.sx ?? {})}} />;
};

Sheet.propTypes = {
    cap: PropTypes.oneOf(capOptions),
    gradient: PropTypes.oneOf(gradientOptions),
    color: PropTypes.oneOf(colorsOptions),
    variant: PropTypes.oneOf(variantOptions),
    sx: PropTypes.object,
};

Sheet.defaultProps = {
    cap: "none",
    gradient: "none",
    sx: {},
};

export default Sheet;
