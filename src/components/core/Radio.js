import React from 'react';
import PropTypes from 'prop-types';
import {FormLabel, FormControl, RadioGroup, FormHelperText} from "@mui/joy";
import JoyRadio from "@mui/joy/Radio"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const Radio = ({ label, value, options, error, required, disabled, onChange, ...props }) => {
    return (
        <FormControl error={!!error} required={required} disabled={disabled}>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                {...props}
                aria-label={label}
                value={value}
                onChange={(event) => {
                    const newValue = options.find(option => String(option.value) === event.target.value)?.value;
                    onChange(newValue);
                }}
                name={label}
                sx={{
                    flexDirection: 'row',
                    gap: 4,
                }}
            >
                {options.map((option) => (
                    <React.Fragment key={String(option.value)}>
                        <FormLabel>{option.label}</FormLabel>
                        <JoyRadio
                            value={String(option.value)}
                            checked={value === option.value}
                            disabled={disabled}
                            checkedIcon={<CheckCircleRoundedIcon />}
                        />
                    </React.Fragment>
                ))}
            </RadioGroup>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    )
};

Radio.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired
    })).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func,
};

Radio.defaultProps = {
    error: null,
    disabled: false,
    required: false,
    onChange: () => {},
};

export default Radio;
