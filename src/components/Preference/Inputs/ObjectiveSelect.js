import React from 'react';
import Stack from 'components/core/Stack';

import PropTypes from 'prop-types';
import Tooltip from '@mui/joy/Tooltip';
import Button from '@mui/joy/Button';

import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import PublicIcon from '@mui/icons-material/Public';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import WindowIcon from '@mui/icons-material/Window';


const options = [
    {
        label: 'Major Order',
        value: 'MAJORORDER',
        icon: <PublicIcon />
    },
    {
        label: 'Medals',
        value: 'MEDALS',
        icon: <MilitaryTechIcon />
    },
    {
        label: 'Samples',
        value: 'SAMPLES',
        icon: <WindowIcon />
    }
]

const EnemySelect = ({
    value,
    onChange
}) => {


    return (
        <ToggleButtonGroup
            value={value}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            variant="outlined"
        >
            {options.map((option, idx) => (
                <Tooltip title={option.label} key={`${option.value}-${idx}`}>
                    <Button 
                        key={`${option.value}-${idx}`}
                        value={option.value}                        
                    >
                        <Stack alignItems="center">
                            {option.icon}
                        </Stack>
                    </Button>
                </Tooltip>
            ))}
            
        </ToggleButtonGroup>
    );
}

EnemySelect.PropTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func
}

EnemySelect.defaultProps = {
    onChange: () => {}
}

export default EnemySelect;