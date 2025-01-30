import Config from 'Config';
import Parse from 'parse';

global.Parse = Parse;

const initialize = () => {
    const { apiId, apiKey, apiUrl, liveQueryUrl } = Config;
    global.Parse.initialize(apiId, apiKey);
    global.Parse.serverURL = apiUrl;
    global.Parse.liveQueryServerURL = liveQueryUrl;
};

export { initialize };
