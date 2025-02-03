import { Squad } from 'domain';

export const initState = {
    list: [],
    current: new Squad(),
    isLoading: false,
    hasFailed: false
};

export default function squadReducer(state = initState, action) {
    const { type, payload, meta } = action;
    let squadMeetsPreference = false;
    switch (type) {
        case 'JOIN_SQUAD_PENDING':
        case 'LIST_SQUAD_PENDING':
        case 'GET_SQUAD_PENDING':
        case 'GET_MY_SQUAD_PENDING':
        case 'SAVE_SQUAD_PENDING':
        case 'DELETE_SQUAD_PENDING':
            return { ...state, isLoading: true, hasFailed: false };
        case 'JOIN_SQUAD_REJECTED':
        case 'LIST_SQUAD_REJECTED':
        case 'GET_SQUAD_REJECTED':
        case 'GET_MY_SQUAD_REJECTED':
        case 'SAVE_SQUAD_REJECTED':
        case 'DELETE_SQUAD_REJECTED':
            return { ...state, isLoading: false, hasFailed: true };

        case 'LIST_SQUAD_FULFILLED':
            return {
                ...state,
                list: payload.map(item => new Squad(item)),
                isLoading: false,
                hasFailed: false
            };

        case 'JOIN_SQUAD_FULFILLED':
        case 'GET_SQUAD_FULFILLED':
        case 'GET_MY_SQUAD':
        case 'GET_MY_SQUAD_FULFILLED':
            return {
                ...state,
                current: payload ? new Squad(payload) : null,
                isLoading: false,
                hasFailed: false
            };

        case 'SAVE_SQUAD_FULFILLED':
            return {
                ...state,
                isLoading: false,
                hasFailed: false
            };

        case 'DELETE_SQUAD':
        case 'DELETE_SQUAD_FULFILLED':
            return {
                ...state,
                current: null,
                list: state.list.filter(item => item.id !== meta.squadId),
                isLoading: false,
                hasFailed: false
            };
        case 'UPDATE_SQUAD_IN_LIST_FULFILLED':
            squadMeetsPreference = meta.preference.matches(new Squad(payload).get('preference'));
            if (squadMeetsPreference) {
                const squadIsAlreadyInList = state.list.some(item => item.id === payload.id);
                if (squadIsAlreadyInList) {
                    return {
                        ...state,
                        list: state.list.map(item => item.id === payload.id ? new Squad(payload) : item),
                    }
                } else {
                    return {
                        ...state,
                        list: [...state.list, new Squad(payload)],
                    }
                }
            } else {
                return {
                    ...state,
                    list: state.list.filter(item => item.id !== payload.id),
                }
            }
        case 'ADD_SQUAD_TO_LIST_FULFILLED':
            return {
                ...state,
                list: [...state.list, new Squad(payload)],
            }
        case 'REMOVE_SQUAD_FROM_LIST':
            return {
                ...state,
                list: state.list.filter(item => item.id !== meta.squadId),
            }
        default:
            return state;
    }
}