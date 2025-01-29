import React, { useState, useCallback, useEffect } from 'react';
import Slider from 'components/core/Slider';
import PropTypes from 'prop-types';
import { isEqual, debounce } from 'lodash';

const marks = [
    { label: 'Trivial', value: 0 },
    { label: 'Easy', value: 1 },
    { label: 'Medium', value: 2 },
    { label: 'Challenging', value: 3 },
    { label: 'Hard', value: 4 }, 
    { label: 'Extreme', value: 5 },
    { label: 'Suicide Mission', value: 6 },
    { label: 'Impossible', value: 7 },
    { label: 'Helldive', value: 8 },
    { label: 'Super Helldive', value: 9 }
];

// Convert array of sequential values to range bounds
const valuesToRange = (values) => {
    if (!values.length) return [0, 9];
    return [Math.min(...values), Math.max(...values)];
};

// Convert range bounds to array of sequential values
const rangeToValues = ([min, max]) => {
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
};

const DifficultySlider = ({
    value,
    onChange
}) => {
    // Local state for immediate UI updates
    const [localValue, setLocalValue] = useState(value);

    // Update local state when parent value changes
    useEffect(() => {
        if (!isEqual(value, localValue)) {
            setLocalValue(value);
        }
    }, [value]);

    // Debounced handler for parent updates
    const debouncedOnChange = useCallback(
        debounce((newValues) => {
            if (!isEqual(newValues, value)) {
                onChange(newValues);
            }
        }, 300),
        [value, onChange]
    );

    const handleChange = (event, newRange) => {
        const newValues = rangeToValues(newRange);
        // Immediately update local state for smooth UI
        setLocalValue(newValues);
        // Debounce the parent update
        debouncedOnChange(newValues);
    };

    // Convert the local value to range bounds for the slider
    const sliderValue = valuesToRange(localValue);

    return (
        <Slider
            value={sliderValue}
            onChange={handleChange}        
            step={1}
            max={9}
            valueLabelDisplay="auto"
            marks={marks}
        />
    );
};

DifficultySlider.propTypes = {
    value: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func
};

DifficultySlider.defaultProps = {
    value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    onChange: () => {}
};

export default DifficultySlider;