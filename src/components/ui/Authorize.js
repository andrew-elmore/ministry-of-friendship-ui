import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import Login from "views/Login";
// import UpdatePassword from "views/UpdatePassword";
import ProcessingOverlay from "components/core/ProcessingOverlay";
import authActions from "actions/authActions";

const Authorize = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const signout = searchParams.get('signout');
    const isAuthorized = useSelector(({ auth }) => auth.isAuthorized);
    const isProfileLoading = useSelector(({ profile }) => profile.isLoading);
    const isAuthLoading = useSelector(({ auth }) => auth.isLoading);
    const user = useSelector(({ auth }) => auth.me);


    useEffect(() => {
        if (signout !== null) {
            dispatch(authActions.logout());
        }
    }, [signout, dispatch]);

    if (isProfileLoading || isAuthLoading) {
        return <ProcessingOverlay enabled />
    }

    if (!isAuthorized) {
        return <Login />;
    }

    // if (user && user.get('changePassword')) {
    //     return <UpdatePassword />;
    // }

    return <Outlet />;
};

export default Authorize;
