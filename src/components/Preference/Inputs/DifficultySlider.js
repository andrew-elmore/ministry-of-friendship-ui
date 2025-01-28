import React from 'react';
import Slider from 'components/core/Slider';

import PropTypes from 'prop-types';


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


const DifficultySlider = ({
    value,
    onChange
}) => {
    const handleChange = (event, newValue) => {
        onChange(newValue);
    };

    return (
        <Slider
            value={value}
            onChange={handleChange}        
            step={1}
            max={9}
            valueLabelDisplay="auto"
            marks={marks}
        />
    );
}

DifficultySlider.PropTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func
}

DifficultySlider.defaultProps = {
    value: [0, 9],
    onChange: () => {}
}

export default DifficultySlider;