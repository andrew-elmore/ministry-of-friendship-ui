import Config from 'Config';
import Parse from 'parse';

global.Parse = Parse;

const initialize = () => {
    const { apiId, apiKey, apiUrl } = Config;
    global.Parse.initialize(apiId, apiKey);
    global.Parse.serverURL = apiUrl;
};

export { initialize };
