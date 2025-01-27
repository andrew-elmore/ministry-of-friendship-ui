import { Message } from 'domain';

export default class ErrorHandlerUtils {
    static isError = ({ type }) => (type.includes('_REJECTED') || type.includes('ERROR_'));

    static statusCodeName = (code) => {
        switch (code) {
            case 400:
            case 406:
                return 'Bad Connection';

            case 401:
            case 403:
                return 'Login Session Expire or Invalid';

            case 404:
                return 'Object Not Found';

            case 500:
                return 'Server Error';

            case 502:
            case 503:
            case 504:
                return 'Server Unavailable';

            default:
                return `Unknown Error (${code})`;
        }
    };

    static generateNotices = ({ type, payload }, state) => {
        const notices = state.notices.clone();
        let title;
        let { details } = payload;

        switch (type) {
            case 'LOGIN_USER_REJECTED':
                title = 'Login Failed';
                break;
            case 'USER_ADD_REJECTED':
                title = 'Registration Failed';
                break;
            case 'USER_RESET_REJECTED':
                title = 'Reset Failed';
                break;
            case 'USER_CHANGE_PASSWORD_REJECTED':
                title = 'Incorrect Password';
                details = 'Current password entered is incorrect.';
                break;
            default:
                title = ErrorHandlerUtils.statusCodeName(payload.response.status);
        }

        if (
            payload.response != null
            && payload.response.data != null
            && payload.response.data.error != null
        ) {
            details = payload.response.data.error;
        }

        const message = new Message()
        message.set('title', title)
        message.set('details', details)
        message.set('source', payload)
        message.set('type', 'error')
        message.set('active', true)


        notices.add(message);

        return notices;
    };

    static process = (state, action) => ({ ...state, notices: ErrorHandlerUtils.generateNotices(action, state) });
}
