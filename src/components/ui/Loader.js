import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Parse from 'parse';
import { useUser } from '@clerk/react';
import ProcessingOverlay from "components/core/ProcessingOverlay";
import profileActions from "actions/profileActions";
import preferenceActions from 'actions/preferenceActions';
import squadActions from 'actions/squadActions';

const Loader = () => {
    const dispatch = useDispatch();
    const { user } = useUser();
    const isProfileLoading = useSelector(({ profile }) => profile.isLoading);
    const profile = useSelector(({ profile }) => profile.me);
    const squad = useSelector(({ squad }) => squad.current?.id ? squad.current : null);
    const isLoading = isProfileLoading;

    const setupSquadLiveQuery = async () => {
        if (!squad?.id) return;
        
        const squadQuery = new Parse.Query('Squad')
            .equalTo('objectId', squad.id);
        squadQuery.include('host');
        squadQuery.include('guestOne');
        squadQuery.include('guestTwo');
        squadQuery.include('guestThree');
        squadQuery.include('preference');
        
        const subscription = await squadQuery.subscribe();
        subscription.on('update', (object) => {
            const isStillInSquad = ['host', 'guestOne', 'guestTwo', 'guestThree'].some(field => object.get(field)?.id === profile.id);
            if (!isStillInSquad) {
                dispatch(squadActions.getMySquad(profile.id));
            }
            dispatch(squadActions.updateSquad(object));
        });

        subscription.on('create', () => {
            dispatch(squadActions.getMySquad(profile.id));
        })
        subscription.on('delete', () => {
            dispatch(squadActions.getMySquad(profile.id));
        })
    
        return () => subscription.unsubscribe();
    };

    const clear = () => {
        dispatch(profileActions.clear())
    }

    useEffect(() => {
        if (profile?.id) {
            dispatch(preferenceActions.get(profile?.preference?.id))
            dispatch(squadActions.getMySquad(profile?.id))
            dispatch(profileActions.getClassified())
            dispatch(profileActions.getOpen())
        }
    }, [profile])

    useEffect(() => {
        if (squad?.id) {
            const cleanup = setupSquadLiveQuery();
            return () => {
                cleanup.then(cleanupFn => cleanupFn && cleanupFn());
            };
        }
    }, [squad?.id]);

    useEffect(() => {
        dispatch(profileActions.me(user.id))
        return () => {
            clear()
        }
    }, [user.id]);

    return <ProcessingOverlay enabled={isLoading} />;
};

export default Loader;