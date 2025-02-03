import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import preferenceActions from 'actions/preferenceActions';
import squadActions from 'actions/squadActions';

import Stack from 'components/core/Stack';
import Button from 'components/core/Button';

import PreferenceForm from 'components/Preference/PreferenceForm';
import SquadCard from 'components/Squad/SquadCard';

import { Preference } from 'domain';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const preference = useSelector(({ preference }) => preference.current);
    const squads = useSelector(({ squad }) => squad.list);
    const openProfile = useSelector(({ profile }) => profile.open);

    const isSquadOpen = (squad) => {
        return (
            squad.guestOne?.id === openProfile?.id || 
            squad.guestTwo?.id === openProfile?.id || 
            squad.guestThree?.id === openProfile?.id
        )
    }

    React.useEffect(() => {
        const setupSubscription = async () => {
            const query = new Parse.Query('Squad');
            const subscription = await query.subscribe();
    
            subscription.on('update', (squad) => {
                if (isSquadOpen(squad)) {
                    console.log('update', squad.id);
                    dispatch(squadActions.updateInList(squad.id, preference));
                } else {
                    console.log('remove', squad.id);
                    dispatch(squadActions.removeFromList(squad.id));
                }
            });
            subscription.on('create', (squad) => {
                if (isSquadOpen(squad)) {
                    console.log('add', squad.id);
                    dispatch(squadActions.addToList(squad.id, preference));
                }         
            });
            subscription.on('delete', (squad) => {
                console.log('remove', squad.id);
                dispatch(squadActions.removeFromList(squad.id));
            });
    
            return subscription;
        };
    
        if (!openProfile) return;
        let subscription;
        setupSubscription().then(sub => {
            subscription = sub;
        });
    
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [openProfile]);

    React.useEffect(() => {
        dispatch(squadActions.list({ preference }));
    }, [preference]);

    const handleSavePreference = ({key, value}) => {
        const newPreference = new Preference();
        newPreference.set('id', preference.id);
        newPreference.set('type', preference.type);
        newPreference.set('enemy', preference.enemy);
        newPreference.set('mic', preference.mic);
        newPreference.set('objective', preference.objective);
        newPreference.set('difficulty', preference.difficulty);
        newPreference.set(key, value);
        dispatch(preferenceActions.save(newPreference));
    }

    const handleStartSquad = () => {
        navigate('/squad/add');
    }


    return (
        <Stack spacing={2} sx={{ height: '100vh' }}>
            <PreferenceForm 
                preference={preference}
                onChange={handleSavePreference}
            />
            <Button onClick={handleStartSquad}>Start A Squad</Button>
            <Stack 
                spacing={2} 
                sx={{ 
                    overflow: 'auto',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 20px)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20px)',
                    paddingTop: 2,
                    width: '100%',
                }}
            >
                {squads.map(squad => (
                    <SquadCard key={squad.id} squad={squad} />
                ))}
            </Stack>
        </Stack>
    );
}

export default Dashboard;