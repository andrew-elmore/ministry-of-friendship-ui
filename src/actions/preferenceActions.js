import { Preference } from 'domain';

const get = (preferenceId) => {
    const query = new Parse.Query(Preference);
    
    return {
        type: 'GET_PREFERENCE',
        meta: { preferenceId },
        payload: query.get(preferenceId)
    };
};

const list = (filters = {}) => {
    const query = new Parse.Query(Preference);

    if (filters.type) {
        query.equalTo('type', filters.type);
    }

    if (filters.enemy) {
        query.equalTo('enemy', filters.enemy);
    }

    if (filters.mic) {
        query.equalTo('mic', filters.mic);
    }

    if (filters.objective) {
        query.equalTo('objective', filters.objective);
    }

    if (filters.difficulty) {
        query.containedIn('difficulty', filters.difficulty);
    }

    return {
        type: 'LIST_PREFERENCE',
        meta: { filters },
        payload: query.find()
    };
};

const save = (preference) => {

    const preferenceToSave = new Preference();

    preferenceToSave.set('id', preference.id);
    preferenceToSave.set('type', preference.type);
    preferenceToSave.set('enemy', preference.enemy);
    preferenceToSave.set('mic', preference.mic);
    preferenceToSave.set('objective', preference.objective);
    preferenceToSave.set('difficulty', preference.difficulty);

    return {
        type: 'SAVE_PREFERENCE',
        meta: { preference },
        payload: preferenceToSave.save()
    };
};

const remove = (preferenceId) => {
    const query = new Parse.Query(Preference);
    
    return {
        type: 'REMOVE_PREFERENCE',
        meta: { preferenceId },
        payload: query.get(preferenceId).then(preference => preference.destroy())
    };
};

export default {
    get,
    list,
    save,
    remove
};
