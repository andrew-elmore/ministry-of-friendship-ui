import React from 'react';
import PropTypes from 'prop-types';
import { Select as JoySelect, Option, Box, FormControl, FormLabel, FormHelperText, ListItemDecorator } from '@mui/joy';
import { selectClasses } from '@mui/joy/Select';
import IndicatorIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/joy/IconButton';
import CloseRounded from '@mui/icons-material/CloseRounded';

const Select = ({
    label, value, placeholder, error, options, labels, icons, disabled,
    required, multiple, onChange, clearable, ...props
}) => {

    const renderValue = (selection) => {
        if (Array.isArray(selection)) {
            return (
                <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                    {selection.map((item, ix) => {
                        const { value } = item;
                        const Icon = icons[value];
                        return (
                            <Box
                                key={value}
                                display="flex"
                                alignItems="center"
                                gap={1}
                                sx={{ textWrap: 'wrap', textAlign: 'left' }}
                            >
                                {Icon && <Icon />}
                                {labels[value]}
                                {ix < selection.length - 1 && ','}
                            </Box>
                        );
                    })}
                </Box>
            );
        } else {
            const { value } = selection;
            const Icon = icons[value];
            return (
                <Box display="flex" alignItems="center" gap={1}>
                    {Icon && <Icon />}
                    {labels[value]}
                </Box>
            );
        }
    };

    let clearIndicator = {};

    if (clearable) {
        const isSelected = multiple ? (value.length > 0) : (value !== '' && value != null);
        if (isSelected) {
            clearIndicator = {
                endDecorator: (
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="neutral"
                        onMouseDown={(event) => {
                            event.stopPropagation();
                        }}
                        onClick={() => {
                            onChange(multiple ? [] : '');
                            // action.current?.focusVisible();
                        }}
                        sx={{
                            width: 28,
                            minWidth: 28,
                            height: 28,
                            minHeight: 28,
                        }}
                    >
                        <CloseRounded />
                    </IconButton>
                ),
                indicator: null,
            }
        }
    }

    return (
        <FormControl required={required} error={!!error}>
            <FormLabel>{label}</FormLabel>
            <JoySelect
                {...props}
                placeholder={placeholder}
                value={value}
                indicator={<IndicatorIcon
                    sx={{
                        width: 28,
                        minWidth: 28,
                        height: 28,
                        minHeight: 28,
                    }}
                />}
                disabled={disabled}
                onBlur={() => {
                    if (disabled) {
                        const selectElement = document.querySelector(`.${selectClasses.root}`);
                        if (selectElement) {
                            selectElement.blur();
                        }
                        props.onBlur?.();
                    }
                }}
                onChange={(evt, val) => { onChange(val) }}
                renderValue={renderValue}
                multiple={multiple}
                {...clearIndicator}
                sx={{
                    [`& .${selectClasses.indicator}`]: {
                        transition: '0.3s',
                        [`&.${selectClasses.expanded}`]: {
                            transform: 'rotate(-180deg)',
                        },
                    },
                }}
            >
                {options.map((option) => {
                    const Icon = icons[option];
                    return (
                        <Option key={option} value={option}>
                            {Icon && (
                                <ListItemDecorator>
                                    <Icon/>
                                </ListItemDecorator>
                            )}
                            {labels[option] ?? option}
                        </Option>
                    )
                })}
            </JoySelect>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    );
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    options: PropTypes.arrayOf(PropTypes.any).isRequired,
    placeholder: PropTypes.string,
    labels: PropTypes.object,
    icons: PropTypes.object,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    multiple: PropTypes.bool,
    clearable: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};

Select.defaultProps = {
    error: null,
    placeholder: '',
    labels: {},
    icons: {},
    disabled: false,
    required: false,
    multiple: false,
    clearable: false,
    onChange: () => {},
    onBlur: () => {},
};

export default Select;
