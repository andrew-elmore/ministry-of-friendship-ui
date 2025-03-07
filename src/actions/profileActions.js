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
    return async (dispatch) => {
        try {
            const preference = await profile.preference.save();
            
            profile.set('preference', preference);
            
            const savedProfile = await profile.save();
            
            dispatch({
                type: 'SAVE_PROFILE',
                meta: { profile: savedProfile, isMyProfile },
                payload: savedProfile,
            });
            
            return savedProfile;
        } catch (error) {
            throw error;
        }
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

const getClassified = () => {
    const query = new Parse.Query(Profile)
        .select(PROFILE_FIELDS);
    query.equalTo('gamerTag', 'CLASSIFIED');
    return {
        type: 'GET_CLASSIFIED',
        payload: query.first(),
    };
};
const getOpen = () => {
    const query = new Parse.Query(Profile)
        .select(PROFILE_FIELDS);
    query.equalTo('gamerTag', 'OPEN');
    return {
        type: 'GET_OPEN',
        payload: query.first(),
    };
};

export default {
    get,
    set,
    save,
    clear,
    me,
    getClassified,
    getOpen
};
