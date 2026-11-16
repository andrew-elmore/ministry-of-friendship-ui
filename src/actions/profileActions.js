const Parse = global.Parse;

import {Profile, Preference} from 'domain';

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
 * Fetches the Profile owned by the signed in Clerk user.
 *
 * @param {string} clerkUserId - The Clerk user id of the signed in user.
 * @returns {Object} - Resolves to the user's Profile, or undefined when they have not created one yet.
 */
const me = (clerkUserId) => {
    return {
        type: 'RESTORE_PROFILE',
        meta: { clerkUserId },
        payload: new Parse.Query(Profile)
            .equalTo('clerkUserId', clerkUserId)
            .select(PROFILE_FIELDS)
            .first(),
    };
};

/**
 * Creates the signed in Clerk user's Profile and personal Preference. The API stamps both with the Clerk user id.
 *
 * @param {string} gamerTag - The gamer tag the user chose.
 * @returns {Object} - Resolves to the saved Profile.
 */
const create = (gamerTag) => {
    const preference = new Preference();
    preference.set('type', Preference.PERSONAL);

    const profile = new Profile();
    profile.set('gamerTag', gamerTag);
    profile.set('preference', preference);

    return {
        type: 'CREATE_PROFILE',
        payload: profile.save(),
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
    create,
    getClassified,
    getOpen
};
