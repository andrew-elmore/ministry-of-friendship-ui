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