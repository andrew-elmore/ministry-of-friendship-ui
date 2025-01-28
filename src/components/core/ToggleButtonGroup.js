import { useTheme } from "@mui/joy";
import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup as JoyToggleButtonGroup } from '@mui/joy';
import Button from './Button';
import Box from '@mui/joy/Box';



const ToggleButtonGroup = ({ label, value, options, onChange }) => {
    const theme = useTheme();
    const styles = {
        button: {
            paddingTop: 10, 
            paddingBottom: 10, 
            paddingLeft: 20, 
            paddingRight: 20,
            fontSize: 14,
        }
    }
    const selectedColor = theme.palette.primary[400];
    const unselectedColor = theme.palette.neutral[700];

    return (
        <Box sx={{ marginBottom: 2 }}>
            <label className="MuiFormLabel-root css-1mse54e-JoyFormLabel-root" style={{marginBottom: 8}}>{label}</label>
            <JoyToggleButtonGroup
                spacing={1}
                value={value}
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        onChange(newValue);
                    }
                }}
            >
                {options.map((option, idx) => (
                    <Button 
                        key={`${option}-${idx}`}
                        style={{ 
                            ...styles.button, 
                            backgroundColor: value.includes(option) ? selectedColor : unselectedColor
                        }}
                        value={option}
                        variant="solid"
                    >{option}</Button>
                ))}
            </JoyToggleButtonGroup>
        </Box>
    );
};

ToggleButtonGroup.propTypes = {
    value: PropTypes.any,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    labels: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
};

export default ToggleButtonGroup;
