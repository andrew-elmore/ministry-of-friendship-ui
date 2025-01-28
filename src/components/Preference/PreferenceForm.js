import React from 'react';
import PropTypes from 'prop-types';
import Stack from 'components/core/Stack';
import Grid from 'components/core/Grid';

import DifficultySlider from 'components/Preference/Inputs/DifficultySlider';
import EnemySelect from 'components/Preference/Inputs/EnemySelect';
import MicSelect from 'components/Preference/Inputs/MicSelect';
import ObjectiveSelect from 'components/Preference/Inputs/ObjectiveSelect';

const squadTypeDefaults = {
    difficulty: [0, 9],
    enemy: 'BUGS',
    mic: 'OPEN',
    objective: 'MAJORORDER',
    type: 'SQUAD'
}

const personalTypeDefaults = {
    difficulty: [0, 9],
    enemy: ['BUGS', 'BOTS', 'SQUIDS'],
    mic: ['OPEN', 'PUSH', 'OFF'],
    objective: ['MAJORORDER', 'MEDALS', 'SAMPLES'],
    type: 'PERSONAL'
}

const PreferenceForm = ({type}) => {
    const defaults = type === 'SQUAD' ? squadTypeDefaults : personalTypeDefaults;
    const [difficulty, setDifficulty] = React.useState(defaults.difficulty);
    const [enemy, setEnemy] = React.useState(defaults.enemy);
    const [mic, setMic] = React.useState(defaults.mic);
    const [objective, setObjective] = React.useState(defaults.objective);

    const data = {
        difficulty,
        enemy,
        mic,
        objective,
        type
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <DifficultySlider
                    value={difficulty}
                    onChange={setDifficulty}
                />
            </Grid>
            <Grid item xs={4}>
                <Stack alignItems="center" width="100%">
                    <EnemySelect
                        value={enemy}
                        onChange={setEnemy}
                    />
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack alignItems="center" width="100%">
                    <MicSelect
                        value={mic}
                        onChange={setMic}
                    />
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack alignItems="center" width="100%">
                    <ObjectiveSelect
                        value={objective}
                        onChange={setObjective}
                    />
                </Stack>
            </Grid>
        </Grid>
    );
}
PreferenceForm.PropTypes = {
    type: PropTypes.string
}

PreferenceForm.defaultProps = {
    type: 'SQUAD'
}

export default PreferenceForm;