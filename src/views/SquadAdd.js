import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Stack from 'components/core/Stack';
import Input from 'components/core/Input';
import Button from 'components/core/Button';

import PreferenceForm from 'components/Preference/PreferenceForm';

import { Squad, Preference } from 'domain';

const SquadAdd = () => {
    const dispatch = useDispatch();
    const personalPreference = useSelector(({ preference }) => preference.current);
    const profile = useSelector(({ profile }) => profile.me);
    const [squad, setSquad] = React.useState(new Squad());

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
        console.log(key, value);
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
                    onClick={() => handleChangeSquad({key: guestSlotId, value: "CLASSIFIED"})}
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

    return (
        <Stack alignItems="center" justifyContent="center" spacing={4} sx={{ height: '100vh' }}>

            <PreferenceForm  preference={squad?.get('preference')} onChange={handleChangePreference}/>
            <Button sx={{width: '100%'}} disabled={true}>{profile?.get('gamerTag')}</Button>
            {squadGuestButton('guestOne')}
            {squadGuestButton('guestTwo')}
            {squadGuestButton('guestThree')}
            <Input
                placeholder="Squad Code"
                value={squad.get('code')}
                onChange={(value) => handleChangeSquad({key: 'code', value})}
            />
            <Button sx={{width: '100%'}}>Create Squad</Button>
        </Stack>
    );
}

export default SquadAdd;