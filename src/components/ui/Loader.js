import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Parse from 'parse';
import CommonUtils from 'utils/CommonUtils';

import ProcessingOverlay from "components/core/ProcessingOverlay";
import authActions from "actions/authActions";
import profileActions from "actions/profileActions";
import preferenceActions from 'actions/preferenceActions';
import squadActions from 'actions/squadActions';

const Loader = () => {
    const dispatch = useDispatch();
    const isAuthorized = useSelector(({ auth }) => auth.isAuthorized);
    const user = useSelector(({ auth }) => auth.me);
    const isAuthorizing = useSelector(({ auth }) => auth.isAuthorizing);
    const isProfileLoading = useSelector(({ profile }) => profile.isLoading);
    const profile = useSelector(({ profile }) => profile.me);
    const isLoading = isAuthorizing || isProfileLoading;

    const setupSquadLiveQuery = async (profileId) => {
        const profileQuery = new Parse.Query('Profile');
        profileQuery.equalTo('objectId', profileId);
        const profile = await profileQuery.first();
        
        if (!profile) return;
    
        const queries = [
            new Parse.Query('Squad').equalTo('host', profile)
        ];
    
        ['guestOne', 'guestTwo', 'guestThree'].forEach(guestField => {
            const query = new Parse.Query('Squad');
            query.exists(guestField);
            query.equalTo(guestField, profile);
            queries.push(query);
        });
    
        const squadQuery = Parse.Query.or(...queries);
        squadQuery.include('host');
        squadQuery.include('guestOne');
        squadQuery.include('guestTwo');
        squadQuery.include('guestThree');
        
        const subscription = await squadQuery.subscribe();
    
        subscription.on('update', (object) => {
            console.log(':~: Squad updated', object);
            dispatch(squadActions.updateSquad(object));
        });
    
        return () => subscription.unsubscribe();
    };

    const clear = () => {
        dispatch(profileActions.clear())
    }

    useEffect(() => {
        dispatch(authActions.me());
    }, []);

    useEffect(() => {
        if (profile?.id) {
            dispatch(preferenceActions.get(profile?.preference?.id))
            dispatch(squadActions.getMySquad(profile?.id))
            dispatch(profileActions.getClassified())
            dispatch(profileActions.getOpen())
            
            const cleanup = setupSquadLiveQuery(profile.id);
            return () => {
                cleanup.then(cleanupFn => cleanupFn());
            };
        }
    }, [profile])

    useEffect(() => {
        if (isAuthorized) {
            dispatch(profileActions.me(user))
        } else {
            clear()
        }
        return () => {
            clear()
        }
    }, [isAuthorized]);

    return <ProcessingOverlay enabled={isLoading} />;
};

export default Loader;
