import React from 'react';
import JoySlider from '@mui/joy/Slider';
import PropTypes from "prop-types";
import Sheet from "./Sheet"

const Switch = ({ label, ...props }) => (
    <Sheet sx={{background: 'none', paddingLeft: 1, paddingRight: 1, paddingBottom: 1, paddingTop: 2}}>
        <JoySlider sx={{ 
            ...props.sx, 
            width: '100%',
            '& .MuiSlider-markLabel': {
                color: 'white'
            }
        }} {...props} />
    </Sheet>
);

Switch.propTypes = {
    label: PropTypes.string.isRequired
};

export default Switch;
