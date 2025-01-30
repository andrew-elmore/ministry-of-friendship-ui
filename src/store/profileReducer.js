import {Profile} from "domain";

export const initState = {
    current: null,
    me: null,
    isLoading: false,
    hasFailed: false,
    classified: null,
    open: null
};

export default function profileReducer(state = initState, action) {
    const { type, payload, meta } = action;

    switch (type) {
        case 'LOGOUT_USER_PENDING':
        case 'LOGIN_USER_REJECTED':
        case 'RESTORE_PROFILE_REJECTED':
        case 'CLEAR_EMPLOYEE_PENDING': {
            return { ...initState };
        }

        case 'SET_PROFILE_PENDING':
        case 'GET_PROFILE_PENDING':
        case 'GET_CLASSIFIED_PENDING':
        case 'RESTORE_PROFILE_PENDING': {
            return { ...state, isLoading: true, hasFailed: false };
        }

        case 'SET_PROFILE_REJECTED':
        case 'GET_CLASSIFIED_REJECTED':
        case 'GET_PROFILE_REJECTED':{
            return { ...state, isLoading: false, hasFailed: true };
        }

        case 'RESTORE_PROFILE_FULFILLED': {
            return { ...state, me: new Profile(payload), isLoading: false, hasFailed: false };
        }

        case 'SAVE_PROFILE_FULFILLED':
        case 'SET_PROFILE_FULFILLED':
        case 'GET_PROFILE_FULFILLED': {
            const { isMyProfile } = meta;
            if (isMyProfile) {
                return { ...state, me: new Profile(payload), isLoading: false, hasFailed: false };
            } else {
                return { ...state, current: new Profile(payload), isLoading: false, hasFailed: false };
            }
        }

        case 'GET_CLASSIFIED_FULFILLED': {
            return { ...state, classified: new Profile(payload), isLoading: false, hasFailed: false };
        }
        case 'GET_OPEN_FULFILLED': {
            return { ...state, open: new Profile(payload), isLoading: false, hasFailed: false };
        }

        default: {
            return state;
        }
    }
}
