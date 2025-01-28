import React from 'react';
import JoySlider from '@mui/joy/Slider';
import PropTypes from "prop-types";
import Sheet from "./Sheet"

const Switch = ({ label, ...props }) => (
    <Sheet sx={{background: 'none', paddingLeft: 8, paddingRight: 8, paddingBottom: 4, paddingTop: 4}}>
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
