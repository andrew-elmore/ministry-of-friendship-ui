import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import preferenceActions from 'actions/preferenceActions';

import { Preference } from 'domain';

import PreferenceForm from 'components/Preference/PreferenceForm';


const Dashboard = () => {
    const dispatch = useDispatch();
    const preference = useSelector(({ preference }) => preference.current);

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
        <PreferenceForm 
            preference={preference}
            onChange={handleSavePreference}
        />
    );
}


export default Dashboard;