import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Stack from 'components/core/Stack';
import Button from 'components/core/Button';
import PreferenceDisplay from 'components/Preference/PreferenceDisplay';

import squadActions from 'actions/squadActions';

const SquadView = () => {
    const dispatch = useDispatch();
    const squad = useSelector(({ squad }) => squad.current);
    if (!squad) return null;

    const leaveSquad = () => {
        dispatch(squadActions.leaveSquad(squad.id));
    }

    return (
        <Stack>
            <Stack key={squad.id}>
                <PreferenceDisplay preference={squad.get('preference')} />
                <Button variant="outlined" onClick={leaveSquad}>Leave</Button>
            </Stack>
        </Stack>
    );
}

export default SquadView;