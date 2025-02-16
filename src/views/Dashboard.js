import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import preferenceActions from 'actions/preferenceActions';
import squadActions from 'actions/squadActions';

import Stack from 'components/core/Stack';
import Button from 'components/core/Button';
import IconButton from 'components/core/IconButton';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import PreferenceForm from 'components/Preference/PreferenceForm';
import SquadCard from 'components/Squad/SquadCard';

import { Preference } from 'domain';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const preference = useSelector(({ preference }) => preference.current);
    const squads = useSelector(({ squad }) => squad.list);
    const openProfile = useSelector(({ profile }) => profile.open);

    const handleProfileClick = () => {
        navigate('/profile');
    };

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
                    dispatch(squadActions.addSquadToList(squad.id, preference));
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
        <Stack spacing={1}>
            <PreferenceForm 
                preference={preference}
                onChange={handleSavePreference}
            />
            <Button onClick={handleStartSquad}>Start A Squad</Button>
            <Stack 
                spacing={1} 
                sx={{ 
                    overflow: 'auto',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 20px)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20px)',
                    paddingTop: 2,
                    width: '100%',
                    flex: 1,
                    minHeight: 0,
                }}
            >
                {squads.map(squad => (
                    <SquadCard key={squad.id} squad={squad} />
                ))}
            </Stack>
            <IconButton
                onClick={handleProfileClick}
                sx={{
                    position: 'fixed',
                    bottom: 8,
                    left: 8,
                    width: 56,
                    height: 56,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        width: '150%',
                        height: '150%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
                        zIndex: -1,
                        pointerEvents: 'none',
                        borderRadius: '50%',
                    }
                }}
            >
                <AccountCircleIcon color="primary" sx={{ fontSize: 40 }} />
            </IconButton>
        </Stack>
    );
}

export default Dashboard;