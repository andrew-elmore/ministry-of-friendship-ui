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

const createUser = ({email, gamerTag, password}) => {
    return {
        type: 'CREATE_USER',
        payload: (async () => {
            const user = new Parse.User();
            user.set('username', email);
            user.set('email', email);
            user.set('password', password);
            
            await user.signUp();
            
            const Profile = Parse.Object.extend('Profile');
            const profile = new Profile();
            profile.set('user', user);
            profile.set('gamerTag', gamerTag);
            
            await profile.save();
            
            return user;
        })()
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
