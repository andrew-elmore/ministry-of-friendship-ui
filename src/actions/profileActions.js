const Parse = global.Parse;

import {Profile} from 'domain';

const PROFILE_FIELDS = Object.keys(Profile.DEFAULTS);

const get = (profileId, isMyProfile = false) => {
    const query = new Parse.Query(Profile)
        .select(PROFILE_FIELDS);

    return {
        type: 'GET_PROFILE',
        meta: { profileId, isMyProfile },
        payload: query.get(profileId),
    };
};

const set = (profile, isMyProfile = false) => {
    return {
        type: 'SET_PROFILE',
        meta: { profile, isMyProfile },
        payload: Promise.resolve(profile),
    };
};

const save = (profile, isMyProfile = false) => {
    return {
        type: 'SAVE_PROFILE',
        meta: { profile, isMyProfile },
        payload: profile.save(),
    };
};

const clear = () => ({
    type: `CLEAR_PROFILE`,
    meta: {},
    payload: Promise.resolve(null)
});

/**
 * Fetches the current authenticated user's Profile.
 *
 * @returns {Object|null} - The current user's details or null if not logged in.
 */
const me = (user) => {
    return {
        type: 'RESTORE_PROFILE',
        meta: { user },
        payload: new Parse.Query(Profile)
            .equalTo('user', user.toPointer())
            .select(PROFILE_FIELDS)
            .first(),
    };
};



export default {
    get,
    set,
    save,
    clear,
    me,
};
