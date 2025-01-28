import React from 'react';
import { Autocomplete as JoyAutocomplete, FormControl, FormLabel, AutocompleteOption } from '@mui/joy';
import PropTypes from "prop-types";
import Typography from './Typography';

const defaultGetOptionLabel = option => {
    return option && option.label !== undefined ? option.label : option;
};

const Autocomplete = ({ label, error, disabled, required, onChange, noOptionComponent, noOptionAlwaysVisible, options, getOptionLabel, ...props }) => {
    const handleCustomOptionClick = (event, option) => {
        if (option.isNoOption && noOptionComponent.props.onClick) {
            noOptionComponent.props.onClick(event);
        }
    };

    return (
        <FormControl required={required} error={!!error} disabled={disabled}>
            <FormLabel>{label}</FormLabel>
            <JoyAutocomplete
                {...props}
                options={noOptionAlwaysVisible ? [...options, { isNoOption: true, label: 'Add New Evidence' }] : options}
                onChange={(evt, val) => { onChange(val) }}
                noOptionsText={noOptionComponent}
                getOptionLabel={getOptionLabel}
                renderOption={(props, option) => {
                    if (option.isNoOption) {
                        return (
                            <AutocompleteOption {...props} onClick={(e) => handleCustomOptionClick(e, option)}>
                                {noOptionComponent}
                            </AutocompleteOption>
                        );
                    }
                    return <AutocompleteOption {...props}>{getOptionLabel(option)}</AutocompleteOption>;
                }}
            />
        </FormControl>
    );
};

Autocomplete.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    noOptionComponent: PropTypes.element,
    noOptionAlwaysVisible: PropTypes.bool,
    options: PropTypes.array,
    getOptionLabel: PropTypes.func,
};

Autocomplete.defaultProps = {
    label: null,
    error: '',
    disabled: false,
    required: false,
    onChange: () => {},
    noOptionComponent: <li>No options</li>,
    noOptionAlwaysVisible: false,
    options: [],
    getOptionLabel: defaultGetOptionLabel
};

export default Autocomplete;