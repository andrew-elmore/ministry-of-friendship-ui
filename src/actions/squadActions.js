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
    const query = new Parse.Query(Squad);
    
    if (filters.code) {
        query.equalTo('code', filters.code);
    }
    
    if (filters.host) {
        query.equalTo('host', filters.host);
    }
    
    if (filters.preference) {
        query.include('preference');
        const preference = filters.preference;
        
        query.find().then(squads => {
            return squads.filter(squad => {
                const squadPref = squad.get('preference');
                
                const hasDifficultyOverlap = squadPref.difficulty.some(d => 
                    preference.difficulty.includes(d)
                );
                
                const hasAllEnemies = preference.enemy.every(e => 
                    squadPref.enemy.includes(e)
                );
                
                const hasMicOverlap = squadPref.mic.some(m => 
                    preference.mic.includes(m)
                );
                
                const hasAllObjectives = preference.objective.every(o => 
                    squadPref.objective.includes(o)
                );
                
                return hasDifficultyOverlap && 
                       hasAllEnemies && 
                       hasMicOverlap && 
                       hasAllObjectives;
            });
        });
    }

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