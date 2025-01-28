import React from 'react';
import Stack from 'components/core/Stack';

import PropTypes from 'prop-types';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Tooltip from '@mui/joy/Tooltip';
import Button from '@mui/joy/Button';
import MicIcon from '@mui/icons-material/Mic';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOff';

const options = [
    {
        label: 'Mic Open',
        value: 'OPEN',
        icon: <MicIcon />
    },
    {
        label: 'Push To Talk',
        value: 'PUSH',
        icon: <MicNoneIcon />
    },
    {
        label: 'No Mic',
        value: 'OFF',
        icon: <MicOffIcon />
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
            color='secondary'
        >
            {options.map((option, idx) => (
                <Tooltip title={option.label} key={`${option.value}-${idx}`}>
                    <Button 
                        key={`${option.value}-${idx}`}
                        value={option.value}
                        variant="solid"
                        
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
    value: PropTypes.array,
    onChange: PropTypes.func
}

EnemySelect.defaultProps = {
    value: 'PUSH',
    onChange: () => {}
}

export default EnemySelect;