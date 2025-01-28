import React from 'react';
import Star from '@mui/icons-material/Star';
import StarOutline from '@mui/icons-material/StarOutline';

import Stack from 'components/core/Stack';
import IconButton from 'components/core/IconButton';
import PropTypes from "prop-types";

const InputRating = ({ value, onChange, disabled, ...props }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <IconButton
                    key={i}
                    onClick={() => onChange(i)}
                    disabled={disabled}
                    aria-label={`${i} star rating`}
                    {...props}
                >
                    {i <= value ? <Star color="secondary" /> : <StarOutline color="action" />}
                </IconButton>
            );
        }
        return stars;
    };

    return <Stack direction="row">{renderStars()}</Stack>;
};

InputRating.propTypes = {
    value: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

InputRating.defaultProps = {
    disabled: false,
    onChange: () => {},
};

export default InputRating;
