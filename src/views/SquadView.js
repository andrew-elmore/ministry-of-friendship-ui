import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Stack from 'components/core/Stack';
import Button from 'components/core/Button';
import HoldButton from 'components/core/HoldButton';
import Typography from 'components/core/Typography';

import PreferenceDisplay from 'components/Preference/PreferenceDisplay';
import SquadMemberButton from 'components/Squad/SquadMemberButton';

import squadActions from 'actions/squadActions';
import { Squad } from 'domain';


const SquadView = () => {
    const dispatch = useDispatch();
    const squad = useSelector(({ squad }) => squad.current);
    const profile = useSelector(({ profile }) => profile.me);
    const openProfile = useSelector(({ profile }) => profile.open);

    if (!squad || !profile) return null;

    const isHost = squad.get('host')?.id === profile.id;


    const leaveSquad = () => {
        if (isHost) {
            dispatch(squadActions.remove(squad.id));
        } else {
            dispatch(squadActions.leaveSquad(squad.id, profile.id, openProfile.id));
        }
    }

    const handleChange = async ({key, value}) => {

        const squadToSave = new Squad();
        squadToSave.set('id', squad.id);
        squadToSave.set('code', squad.get('code'));
        squadToSave.set('preference', squad.get('preference'));
        squadToSave.set('host', squad.get('host'));
        squadToSave.set('guestOne', squad.get('guestOne'));
        squadToSave.set('guestTwo', squad.get('guestTwo'));
        squadToSave.set('guestThree', squad.get('guestThree'));
        squadToSave.set(key, value);

        await dispatch(squadActions.save(squadToSave));
        dispatch(squadActions.getMySquad(profile?.id))
    }

    const squadSlots = [
        {id: 'guestOne', squadMember: squad.get('guestOne')},
        {id: 'guestTwo', squadMember: squad.get('guestTwo')},
        {id: 'guestThree', squadMember: squad.get('guestThree')},
    ]

    return (
        <Stack spacing={4} justifyContent="center" sx={{ height: '100vh' }}>
            <PreferenceDisplay preference={squad?.get('preference')} />
            <Button sx={{width: '100%'}} disabled={true}>{profile?.get('gamerTag')}</Button>
            {squadSlots.map(({id, squadMember}) => (
                <SquadMemberButton key={id} guestSlot={id} squadMember={squadMember} onClick={handleChange} />
            ))}
            <Typography 
                variant="h4"
                textAlign="center"
            >{squad.get('code')}</Typography>
            <HoldButton color="danger" onHold={leaveSquad}>{isHost ? 'Disband' : 'Leave'}</HoldButton>
        </Stack>
    );
}

export default SquadView;