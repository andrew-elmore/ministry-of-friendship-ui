import React from 'react';
import PropTypes from 'prop-types';
import { Input as JoyInput, Textarea as JoyTextarea, FormControl, FormLabel, FormHelperText } from '@mui/joy';
import InputRating from './InputRating';

const Input = ({ label, type, placeholder, value, error, disabled, required, onChange, ...props }) => {
    const renderInputContent = () => {
        switch (type) {
            case 'rating':
                return <InputRating {...props} value={value} onChange={onChange} />;
            case 'textarea':
                return (
                    <JoyTextarea
                        {...props}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        error={!!error}
                        disabled={disabled}
                    />
                );
            default:
                return (
                    <JoyInput
                        {...props}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        error={!!error}
                        disabled={disabled}
                    />
                );
        }
    };

    return (
        <FormControl error={!!error} required={required} disabled={disabled}>
            <FormLabel>{label}</FormLabel>
            {renderInputContent()}
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    );
};

Input.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    type: PropTypes.oneOf(['text', 'date', 'datetime-local', 'email', 'hidden', 'month', 'number', 'password', 'tel', 'time', 'url', 'week', 'textarea', 'richtext', 'rating']),
    placeholder: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func,
};

Input.defaultProps = {
    type: 'text',
    error: null,
    placeholder: '',
    disabled: false,
    required: false,
    onChange: () => {},
};

export default Input;
