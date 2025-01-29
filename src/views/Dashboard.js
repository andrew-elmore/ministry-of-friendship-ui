import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import preferenceActions from 'actions/preferenceActions';
import squadActions from 'actions/squadActions';

import { Preference } from 'domain';

import PreferenceForm from 'components/Preference/PreferenceForm';


const Dashboard = () => {
    const dispatch = useDispatch();
    const preference = useSelector(({ preference }) => preference.current);
    const squads = useSelector(({ squad }) => squad.list);

    React.useEffect(() => {
        // load squads based on preference
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

    return (
        <>
            <PreferenceForm 
                preference={preference}
                onChange={handleSavePreference}
            />
            <h2>Squads {squads.length}</h2>
            
            <div>
                {squads.map(squad => (
                    <div key={squad.id}>
                        {squad.code}
                    </div>
                ))}
            </div>
        </>
  
    );
}


export default Dashboard;