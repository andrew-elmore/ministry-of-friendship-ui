import React from 'react';
import Stack from 'components/core/Stack';

import PropTypes from 'prop-types';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';



const options = [
    {
        label: 'Terminid',
        value: 'BUGS',
        image: 'url(./img/terminids_Icon.png)'
    },
    {
        label: 'Automaton',
        value: 'BOTS',
        image: 'url(./img/automaton_Icon.png)'
    },
    {
        label: 'Illuminate',
        value: 'SQUIDS',
        image: 'url(./img/illuminate_Icon.png)'
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
                            <div style={{
                                width: 20,
                                height: 20,
                                backgroundImage: option.image,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: 20,
                            }} />
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
    value: ['BUGS', 'BOTS', 'SQUIDS'],
    onChange: () => {}
}

export default EnemySelect;