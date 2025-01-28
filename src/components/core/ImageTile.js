import React from 'react';
import PropTypes from "prop-types";
import ImageIcon from "@mui/icons-material/Image";

import AspectRatio from "./AspectRatio";

const ImageTile = ({ src, alt, color, variant, disabled, width }) => (
    <AspectRatio
        ratio="16/9"
        objectFit="cover"
        sx={{
            width: '100%',
            maxWidth: width,
            borderRadius: '24px',
            overflow: 'hidden',
            "> div": {
                backgroundClip: 'content-box',
            }
        }}
    >
        {src ? (
            <img
                src={src}
                alt={alt}
                style={{
                    borderRadius: '24px',
                    borderColor: `var(--joy-palette-${color}-${variant}Bg)`,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    filter: disabled ? 'grayscale(100%)': 'none',
                    opacity: disabled ? 0.45 : 1,
                }}
            />
        ) : (
            <ImageIcon
                sx={{
                    borderRadius: '24px',
                    borderColor: `var(--joy-palette-${color}-${variant}Bg)`,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    overflow: 'hidden',
                    color: 'var(--joy-palette-background-level3)'
                }}
            />
        )}
    </AspectRatio>
);

ImageTile.propTypes = {
    src: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'secondary', 'warning', 'danger', 'success', 'neutral']),
    variant: PropTypes.oneOf(['solid', 'soft']),
    alt: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disabled: PropTypes.bool,
};

ImageTile.defaultProps = {
    src: null,
    width: 200,
    color: 'primary',
    variant: 'solid',
    alt: '',
    disabled: false,
}

export default ImageTile;
