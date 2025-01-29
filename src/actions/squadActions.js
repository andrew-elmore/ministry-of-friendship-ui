import { Squad, Preference } from 'domain';

const get = (squadId) => {
    const query = new Parse.Query(Squad);
    return {
        type: 'GET_SQUAD',
        meta: { squadId },
        payload: query.get(squadId)
    };
};

const list = (filters = {}) => {
    if (filters.preference) {
        const prefQuery = new Parse.Query(Preference);
        prefQuery.equalTo('type', 'SQUAD');
        
        prefQuery.containedIn('difficulty', filters.preference.difficulty);
        prefQuery.containedIn('enemy', filters.preference.enemy);
        prefQuery.containedIn('mic', filters.preference.mic);
        prefQuery.containedIn('objective', filters.preference.objective);
        
        return {
            type: 'LIST_SQUAD',
            meta: { filters },
            payload: prefQuery.find().then(preferences => {
                const squadQuery = new Parse.Query(Squad);
                squadQuery.containedIn('preference', preferences);
                squadQuery.equalTo('guestThree', null);
                
                ['host', 'guestOne', 'guestTwo', 'guestThree'].forEach(field => {
                    squadQuery.include(field);
                });
                
                if (filters.code) squadQuery.equalTo('code', filters.code);
                if (filters.host) squadQuery.equalTo('host', filters.host);
                
                return squadQuery.find();
            })
        };
    }

    const query = new Parse.Query(Squad);
    
    ['host', 'guestOne', 'guestTwo', 'guestThree'].forEach(field => {
        query.include(field);
    });
    
    if (filters.code) query.equalTo('code', filters.code);
    if (filters.host) query.equalTo('host', filters.host);
    
    return {
        type: 'LIST_SQUAD',
        meta: { filters },
        payload: query.find()
    };
};

const save = (squad) => {
    const squadToSave = new Squad();

    squadToSave.set('id', squad.id);
    squadToSave.set('code', squad.code);
    squadToSave.set('preference', squad.preference);
    squadToSave.set('host', squad.host);
    squadToSave.set('players', squad.players);

    return {
        type: 'SAVE_SQUAD',
        meta: { squad },
        payload: squadToSave.save()
    };
};

const remove = (squadId) => {
    const query = new Parse.Query(Squad);
    
    return query.get(squadId).then(squad => {
        return {
            type: 'DELETE_SQUAD',
            meta: { squadId },
            payload: squad.destroy()
        };
    });
};

export default {
    get,
    list,
    save,
    remove
};