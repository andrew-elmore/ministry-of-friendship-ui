import { Squad, Preference } from 'domain';
import CommonUtils from 'utils/CommonUtils.js';

const updateInList = (squadId, preference) => {
    const query = new Parse.Query(Squad);
    query.include('host')
    query.include('guestOne')
    query.include('guestTwo')
    query.include('guestThree')
    query.include('preference')

    return {
        type: 'UPDATE_SQUAD_IN_LIST',
        meta: { squadId, preference },
        payload: query.get(squadId)
    };
}

const removeFromList = (squadId) => {
    return {
        type: 'REMOVE_SQUAD_FROM_LIST',
        meta: { squadId }
    };
};

const addSquadToList = (squadId, preference) => {
    const query = new Parse.Query(Squad);

    return {
        type: 'ADD_SQUAD_TO_LIST',
        meta: { squadId, preference },
        payload: query.get(squadId)
    };
};

const get = (squadId) => {
    const query = new Parse.Query(Squad);
    return {
        type: 'GET_SQUAD',
        meta: { squadId },
        payload: query.get(squadId)
    };
};

const getMySquad = (profileId) => {
    const profilePointer = CommonUtils.createPointer('Profile', profileId);

    const query = Parse.Query.or(
        new Parse.Query(Squad).equalTo('host', profilePointer),
        new Parse.Query(Squad).equalTo('guestOne', profilePointer),
        new Parse.Query(Squad).equalTo('guestTwo', profilePointer),
        new Parse.Query(Squad).equalTo('guestThree', profilePointer)
    );

    query.include(['host', 'guestOne', 'guestTwo', 'guestThree', 'preference']);

    return {
        type: 'GET_MY_SQUAD',
        payload: query.first()
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
    squadToSave.set('preference', CommonUtils.createPointer('Preference', squad.preference.id));
    squadToSave.set('host', CommonUtils.createPointer('Profile', squad.host.id));
    squadToSave.set('guestOne', squad.guestOne ? CommonUtils.createPointer('Profile', squad.guestOne.id) : null);
    squadToSave.set('guestTwo', squad.guestTwo ? CommonUtils.createPointer('Profile', squad.guestTwo.id) : null);
    squadToSave.set('guestThree', squad.guestThree ? CommonUtils.createPointer('Profile', squad.guestThree.id) : null);


    return {
        type: 'SAVE_SQUAD',
        meta: { squad },
        payload: squadToSave.save()
    };
};

const leaveSquad = (squadId, personId, openSquadId) => {
    return async (dispatch) => {
        const query = new Parse.Query(Squad);
        const squad = await query.get(squadId);
        const guests = ['guestOne', 'guestTwo', 'guestThree'];

        for (let i = 0; i < guests.length; i++) {
            if (squad.get(guests[i])?.id === personId) {
                squad.set(guests[i], CommonUtils.createPointer('Profile', openSquadId));
                break;
            }
        }
        
        dispatch({
            type: 'DELETE_SQUAD',
            meta: { squadId },
            payload: squad.save()
        });
    };
}

const remove = (squadId) => {
    return async (dispatch) => {
        const query = new Parse.Query(Squad);
        const squad = await query.get(squadId);
        await squad.destroy();
        
        dispatch({
            type: 'DELETE_SQUAD',
            meta: { squadId }
        });
    };
}

const joinSquad = (profileId, squadId) => {
    return async (dispatch) => {
        const query = new Parse.Query(Squad);
        query.include(['host', 'guestOne', 'guestTwo', 'guestThree', 'preference']);
        const squad = await query.get(squadId);
        const hasSpace = ['guestOne', 'guestTwo', 'guestThree'].some(field => {
            const gamerTag = squad.get(field).get('gamerTag')
            return gamerTag === 'OPEN';
        });

        if (!hasSpace) {
            throw new Error('Squad is full');
        } else {
            const guests = ['guestOne', 'guestTwo', 'guestThree'];
            for (let i = 0; i < guests.length; i++) {
                if (squad.get(guests[i])?.get('gamerTag') === 'OPEN') {
                    squad.set(guests[i], CommonUtils.createPointer('Profile', profileId));
                    break;
                }
            }
        }

        await squad.save();

        dispatch({
            type: 'JOIN_SQUAD',
            meta: { squadId, profileId },
            payload: query.get(squadId)
        });
    };
}

const updateSquad = (squad) => {
    return {
        type: 'GET_MY_SQUAD',
        meta: { squad },
        payload: squad
    };
}

export default {
    get,
    getMySquad,
    list,
    save,
    remove,
    leaveSquad,
    joinSquad,
    updateSquad,
    updateInList,
    removeFromList,
    addSquadToList
};