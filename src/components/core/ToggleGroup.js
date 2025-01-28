import React from 'react';
import PropTypes from 'prop-types';
import {FormLabel, FormControl, RadioGroup, Radio, FormHelperText} from "@mui/joy";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import Sheet from "./Sheet";
import Avatar from "./Avatar";

const ToggleGroup = ({ label, value, options, labels, error, required, disabled, onChange, ...props }) => (
    <FormControl error={!!error} required={required} disabled={disabled}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
            {...props}
            aria-label={label}
            value={value}
            onChange={(event) => { onChange(event.target.value) }}
            overlay
            name={label}
            sx={{
                flexDirection: 'row',
                gap: 4,
            }}
        >
            {options.map((option) => (
                <Sheet
                    key={option}
                    variant="outlined"
                    sx={{
                        borderRadius: 'xl',
                        borderColor: 'var(--joy-palette-primary-solidBg)',
                        boxShadow: 'sm',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 2,
                        minWidth: 120,
                    }}
                >
                    <Radio id={option} value={option} disabled={disabled} checkedIcon={<CheckCircleRoundedIcon />} />
                    <Avatar variant="soft" size="sm" />
                    <FormLabel htmlFor={option} sx={{ textAlign: 'center', width: '100%', display: 'inline-block' }}>{labels[option] ?? option}</FormLabel>
                </Sheet>
            ))}
        </RadioGroup>
        <FormHelperText>{error}</FormHelperText>
    </FormControl>
);

ToggleGroup.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    labels: PropTypes.object,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func,
};

ToggleGroup.defaultProps = {
    error: null,
    labels: {},
    disabled: false,
    required: false,
    onChange: () => {},
};

export default ToggleGroup;
