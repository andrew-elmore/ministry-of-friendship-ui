import Config from 'Config';
import Parse from 'parse';

global.Parse = Parse;

let tokenAccessor = null;

/**
 * Registers the function that returns the current Clerk session token (Clerk's getToken).
 * @param {Function|null} accessor
 */
const setTokenAccessor = (accessor) => {
    tokenAccessor = accessor;
};

const initialize = () => {
    const { apiId, apiKey, apiUrl, liveQueryUrl } = Config;
    global.Parse.initialize(apiId, apiKey);
    global.Parse.serverURL = apiUrl;
    global.Parse.liveQueryServerURL = liveQueryUrl;

    const restController = global.Parse.CoreManager.getRESTController();
    global.Parse.CoreManager.setRESTController({
        ...restController,
        request: async (...args) => {
            const token = tokenAccessor ? await tokenAccessor() : null;
            global.Parse.CoreManager.set('REQUEST_HEADERS', token ? { Authorization: `Bearer ${token}` } : {});
            return restController.request(...args);
        },
    });
};

export { initialize, setTokenAccessor };
