import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";

import ProcessingOverlay from "components/core/ProcessingOverlay";
import authActions from "actions/authActions";
import profileActions from "actions/profileActions";
import preferenceActions from 'actions/preferenceActions';

const Loader = () => {
    const dispatch = useDispatch();
    const isAuthorized = useSelector(({ auth }) => auth.isAuthorized);
    const user = useSelector(({ auth }) => auth.me);

    const isAuthorizing = useSelector(({ auth }) => auth.isAuthorizing);
    const isProfileLoading = useSelector(({ profile }) => profile.isLoading);
    const profile = useSelector(({ profile }) => profile.me);
    const isLoading = isAuthorizing || isProfileLoading;

    /*** Manage Authorization & Profile ***/
    const clear = () => {
        dispatch(profileActions.clear())
    }

    useEffect(() => {
        dispatch(authActions.me());
    }, []);

    useEffect(() => {
        if (profile?.id) {
            dispatch(preferenceActions.get(profile?.preference?.id))
        }
    }, [profile])

    useEffect( () => {
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
