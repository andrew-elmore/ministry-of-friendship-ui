import ErrorHandlerUtils from 'utils/ErrorHandlerUtils';
import { MessageArray } from 'domain';

const initState = {
    notices: new MessageArray(),
};

export default function appStateReducer(state = initState, action = {}) {
    const { type, payload } = action;

    if (ErrorHandlerUtils.isError(action)) {
        return ErrorHandlerUtils.process(state, action);
    }

    switch (type) {
        case 'NOTICE_ADD_FULFILLED': {
            const { notices } = state;
            return { ...state, notices: notices.clone().add(payload) };
        }

        case 'NOTICE_UPDATE_FULFILLED': {
            const { notices } = state;
            return { ...state, notices: notices.clone().update(payload) };
        }

        case 'NOTICE_REMOVE_FULFILLED': {
            const { notices } = state;
            return { ...state, notices: notices.clone().remove(payload) };
        }

        case 'NOTICE_CLEAR_FULFILLED': {
            return { ...state, notices: new MessageArray() };
        }

        default: {
            return state;
        }
    }
}