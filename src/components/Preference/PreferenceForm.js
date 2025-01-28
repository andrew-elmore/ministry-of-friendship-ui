import React from 'react';
import Stack from 'components/core/Stack';

import DifficultySlider from 'components/Preference/Inputs/DifficultySlider';
import EnemySelect from 'components/Preference/Inputs/EnemySelect';
import MicSelect from 'components/Preference/Inputs/MicSelect';
import ObjectiveSelect from 'components/Preference/Inputs/ObjectiveSelect';


const PreferenceForm = () => {
    const [difficulty, setDifficulty] = React.useState([0, 9]);
    const [enemy, setEnemy] = React.useState(['BUGS', 'BOTS', 'SQUIDS']);
    const [mic, setMic] = React.useState('OPEN');
    const [objective, setObjective] = React.useState('MAJORORDER');

    return (
        <div style={{padding:16}}>
            <DifficultySlider
                value={difficulty}
                onChange={setDifficulty}
            />
            <EnemySelect
                value={enemy}
                onChange={setEnemy}
            />
            <MicSelect
                value={mic}
                onChange={setMic}
            />
            <ObjectiveSelect
                value={objective}
                onChange={setObjective}
            />

        </div>
    );
}


export default PreferenceForm;