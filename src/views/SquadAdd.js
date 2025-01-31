import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
const { useNavigate } = require('react-router-dom');

import Stack from 'components/core/Stack';
import Input from 'components/core/Input';
import Button from 'components/core/Button';

import PreferenceForm from 'components/Preference/PreferenceForm';

import squadActions from 'actions/squadActions';
import preferenceActions from 'actions/preferenceActions';

import { Squad, Preference } from 'domain';

const SquadAdd = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const personalPreference = useSelector(({ preference }) => preference.current);
    const profile = useSelector(({ profile }) => profile.me);
    const classifiedProfile = useSelector(({ profile }) => profile.classified);
    const openProfile = useSelector(({ profile }) => profile.open);
    const [squad, setSquad] = React.useState(new Squad());
    const [errors, setErrors] = React.useState({});

    React.useEffect(() => {
        const newPreference = new Preference()
        newPreference.set('type', Preference.SQUAD);
        newPreference.set('enemy', personalPreference.enemy);
        newPreference.set('mic', personalPreference.mic);
        newPreference.set('objective', personalPreference.objective);
        newPreference.set('difficulty', personalPreference.difficulty);
        handleChangeSquad({key: 'preference', value: newPreference});
    }, [personalPreference]);

    const handleChangePreference = ({key, value}) => {
        const newPreference = new Preference();
        newPreference.set('type', Preference.SQUAD);
        newPreference.set('enemy', squad.preference.enemy);
        newPreference.set('mic', squad.preference.mic);
        newPreference.set('objective', squad.preference.objective);
        newPreference.set('difficulty', squad.preference.difficulty);
        newPreference.set(key, value);
        handleChangeSquad({key: 'preference', value: newPreference});
    }

    const handleChangeSquad = ({key, value}) => {
        const newSquad = new Squad();
        newSquad.set('code', squad.code);
        newSquad.set('preference', squad.preference);
        newSquad.set('host', profile);
        newSquad.set('guestOne', squad.guestOne);
        newSquad.set('guestTwo', squad.guestTwo);
        newSquad.set('guestThree', squad.guestThree);
        newSquad.set(key, value);
        setSquad(newSquad);
    }

    const squadGuestButton = (guestSlotId) => {
        if (squad.get(guestSlotId) === null) {
            return (
                <Button 
                    sx={{width: '100%'}}
                    variant="outlined"
                    onClick={() => handleChangeSquad({key: guestSlotId, value: {id: classifiedProfile.id}})}
                >
                    OPEN
                </Button>
            )
        } else {
            return (
                <Button 
                    sx={{width: '100%'}}
                    onClick={() => handleChangeSquad({key: guestSlotId, value: null})}
                >
                    CLASSIFIED
                </Button>
            )
        }
    }

    const handleSubmit = async () => {
        if (!squad.get('code')) {
            setErrors({code: 'Friend Code is required'});
            return;
        }

        const preferenceToSave = new Preference();
        preferenceToSave.set('type', Preference.SQUAD);
        preferenceToSave.set('enemy', squad.preference.enemy);
        preferenceToSave.set('mic', squad.preference.mic);
        preferenceToSave.set('objective', squad.preference.objective);
        preferenceToSave.set('difficulty', squad.preference.difficulty);
        const preferenceResult = await dispatch(preferenceActions.save(preferenceToSave));
        const squadToSave = new Squad();
        squadToSave.set('id', squad.id);
        squadToSave.set('code', squad.code);
        squadToSave.set('preference', preferenceResult.value);
        squadToSave.set('host', squad.host);
        squadToSave.set('guestOne', squad.guestOne || {id: openProfile.id});
        squadToSave.set('guestTwo', squad.guestTwo || {id: openProfile.id});
        squadToSave.set('guestThree', squad.guestThree || {id: openProfile.id});

        await dispatch(squadActions.save(squadToSave));
        dispatch(squadActions.getMySquad(profile?.id))
    }

    const handleCancel = () => {
        navigate('/');
    }
    return (
        <Stack alignItems="center" justifyContent="center" spacing={4} sx={{ height: '100vh' }}>
            <PreferenceForm  preference={squad?.get('preference')} onChange={handleChangePreference}/>
            <Button sx={{width: '100%'}} disabled={true}>{profile?.get('gamerTag')}</Button>
            {squadGuestButton('guestOne')}
            {squadGuestButton('guestTwo')}
            {squadGuestButton('guestThree')}
            <Input
                placeholder="Friend Code"
                value={squad.get('code')}
                onChange={(value) => handleChangeSquad({key: 'code', value})}
                error={errors.code}
            />
            <Button onClick={handleSubmit} sx={{width: '100%'}}>Create Squad</Button>
            <Button variant="outlined" onClick={handleCancel} sx={{width: '100%'}}>Cancel</Button>
        </Stack>
    );
}

export default SquadAdd;