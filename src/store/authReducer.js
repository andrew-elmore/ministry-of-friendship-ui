
export const initState = {
    me: null,
    isAuthorizing: false,
    isAuthorized: false,
};

export default function authReducer(state = initState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'LOGIN_USER_PENDING': {
            return {
                ...state,
                isAuthorizing: true,
            };
        }

        case 'LOGOUT_USER_PENDING':
        case 'LOGIN_USER_REJECTED': {
            return {
                ...state,
                me: null,
                isAuthorizing: false,
                isAuthorized: false,
            };
        }

        case 'RESTORE_USER':
        case 'UPDATE_USER':
        case 'LOGIN_USER_FULFILLED': {
            if (!payload) {
                return {
                    ...state,
                    me: null,
                    isAuthorizing: false,
                    isAuthorized: false,
                };
            }

            return {
                ...state,
                me: payload,
                isAuthorizing: false,
                isAuthorized: true,
            };
        }

        default: {
            return state;
        }
    }
}
