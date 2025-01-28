const Parse = global.Parse;


/**
 * Attempts to log in a user.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} - A promise that resolves to the user details.
 */
const login = (username, password) => {
    return {
        type: 'LOGIN_USER',
        payload: Parse.User.logIn(username, password),
    };
};

/**
 * Logs out the current user.
 *
 * @returns {Promise} - A promise that resolves when the user is logged out.
 */
const logout = () => {
    return {
        type: 'LOGOUT_USER',
        payload: Parse.User.logOut(),
    };
};

const me = () => {
    return {
        type: 'RESTORE_USER',
        payload: Parse.User.current(),
    };
};

const createUser = ({email, firstName, lastName}) => {
    return {
        type: 'CREATE_USER',
        payload: Parse.Cloud.run('createUser', {email, firstName, lastName}),
    };
};

const reset = (email) => {
    return {
        type: 'RESET_USER',
        meta: { email },
        payload: Parse.User.requestPasswordReset(email),
    };
};

const updatePassword = (newPassword) => {
    return {
        type: 'UPDATE_USER',
        payload: Parse.Cloud.run('updatePassword', { password: newPassword })
    };
};

export default {
    login,
    logout,
    me,
    createUser,
    reset,
    updatePassword
};
