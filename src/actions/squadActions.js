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
        
        return {
            type: 'LIST_SQUAD',
            meta: { filters },
            payload: prefQuery.find().then(preferences => {
                
                const matchingPrefs = preferences.filter(squadPref => {
                    
                    const hasDifficultyOverlap = squadPref.get('difficulty').every(d => 
                        filters.preference.difficulty.includes(d)
                    );

                    const hasEnemyOverlap = squadPref.get('enemy').every(e =>
                        filters.preference.enemy.includes(e)
                    );
                    
                    const hasMicOverlap = squadPref.get('mic').every(m => 
                        filters.preference.mic.includes(m)
                    );
                    
                    const hasObjectiveOverlap = squadPref.get('objective').every(o => 
                        filters.preference.objective.includes(o)
                    );
                    
                    const matches = hasDifficultyOverlap && hasEnemyOverlap && 
                                  hasMicOverlap && hasObjectiveOverlap;
                    return matches;
                });

                const squadQuery = new Parse.Query(Squad);
                squadQuery.containedIn('preference', matchingPrefs);
                
                if (filters.code) {
                    squadQuery.equalTo('code', filters.code);
                }
                
                if (filters.host) {
                    squadQuery.equalTo('host', filters.host);
                }
                
                return squadQuery.find().then(squads => {
                    return squads;
                });
            })
        };
    }

    const query = new Parse.Query(Squad);
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