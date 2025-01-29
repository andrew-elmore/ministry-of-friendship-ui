import React, { useState, useCallback, useEffect } from 'react';
import Slider from 'components/core/Slider';
import PropTypes from 'prop-types';
import ImageComponent from 'components/core/ImageComponent';
import Tooltip from '@mui/joy/Tooltip';

import { isEqual, debounce } from 'lodash';


const difficulties = [
    { label: 'Trivial', value: 0, image: 'url(./img/Trivial.png)'},
    { label: 'Easy', value: 1, image: 'url(./img/Easy.png)'},
    { label: 'Medium', value: 2, image: 'url(./img/Medium.png)'},
    { label: 'Challenging', value: 3, image: 'url(./img/Challenging.png)'},
    { label: 'Hard', value: 4, image: 'url(./img/Hard.png)'},
    { label: 'Extreme', value: 5, image: 'url(./img/Extreme.png)'},
    { label: 'Suicide Mission', value: 6, image: 'url(./img/Suicide_Mission.png)'},
    { label: 'Impossible', value: 7, image: 'url(./img/Impossible.png)'},
    { label: 'Helldive', value: 8, image: 'url(./img/Helldive.png)'},
    { label: 'Super Helldive', value: 9, image: 'url(./img/Super_Helldive.png)'}
];

const valuesToRange = (values) => {
    if (!values.length) return [0, 9];
    return [Math.min(...values), Math.max(...values)];
};

const rangeToValues = ([min, max]) => {
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
};

const DifficultySlider = ({
    value,
    onChange
}) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        if (!isEqual(value, localValue)) {
            setLocalValue(value);
        }
    }, [value]);

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
        setLocalValue(newValues);
        debouncedOnChange(newValues);
    };

    const sliderValue = valuesToRange(localValue);

    const marks = difficulties.map(({ label, value, image }) => ({
        value,
        label: (
            <Tooltip title={label}>
                <ImageComponent image={image} style={{ width: 30, height: 20, border: '1px solid grey', borderRadius: 0}} />
            </Tooltip>
        )
    }));
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