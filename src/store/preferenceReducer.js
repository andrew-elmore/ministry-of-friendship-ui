import { Preference } from 'domain';

export const initState = {
    list: [],
    current: new Preference(),
    isLoading: false,
    hasFailed: false
};

export default function preferenceReducer(state = initState, action) {
    const { type, payload, meta } = action;

    switch (type) {
        case 'LIST_PREFERENCE_PENDING':
        case 'GET_PREFERENCE_PENDING':
        case 'SAVE_PREFERENCE_PENDING':
            return { ...state, isLoading: true, hasFailed: false };

        case 'LIST_PREFERENCE_REJECTED':
        case 'GET_PREFERENCE_REJECTED':
        case 'SAVE_PREFERENCE_REJECTED':
            return { ...state, isLoading: false, hasFailed: true };

        case 'LIST_PREFERENCE_FULFILLED':
            return {
                ...state,
                list: payload.map(item => new Preference(item)),
                isLoading: false,
                hasFailed: false
            };

        case 'GET_PREFERENCE_FULFILLED':
            return {
                ...state,
                current: new Preference(payload),
                isLoading: false,
                hasFailed: false
            };

        case 'SAVE_PREFERENCE_FULFILLED':
            return {
                ...state,
                current: new Preference(payload),
                isLoading: false,
                hasFailed: false
            };

        default:
            return state;
    }
}