import React from 'react';
import PropTypes from 'prop-types';
import Stack from 'components/core/Stack';
import Grid from 'components/core/Grid';

import DifficultySlider from 'components/Preference/Inputs/DifficultySlider';
import EnemySelect from 'components/Preference/Inputs/EnemySelect';
import MicSelect from 'components/Preference/Inputs/MicSelect';
import ObjectiveSelect from 'components/Preference/Inputs/ObjectiveSelect';

import { Preference } from 'domain';


const PreferenceForm = ({preference, onChange}) => {
    const handleChange = ({key, value}) => {
        onChange({key, value});
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <DifficultySlider
                    value={preference.difficulty}
                    onChange={(value) => handleChange({key: 'difficulty', value})}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <Stack alignItems="center" width="100%">
                    <EnemySelect
                        value={preference.enemy}
                        onChange={(value) => handleChange({key: 'enemy', value})}
                    />
                </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
                <Stack alignItems="center" width="100%">
                    <MicSelect
                        value={preference.mic}
                        onChange={(value) => handleChange({key: 'mic', value})}
                    />
                </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
                <Stack alignItems="center" width="100%">
                    <ObjectiveSelect
                        value={preference.objective}
                        onChange={(value) => handleChange({key: 'objective', value})}
                    />
                </Stack>
            </Grid>
        </Grid>
    );
}
PreferenceForm.PropTypes = {
    preference: PropTypes.instanceOf(Preference),
    onChange: PropTypes.func
}

PreferenceForm.defaultProps = {
    preference: new Preference(),
    onChange: () => {}
}

export default PreferenceForm;