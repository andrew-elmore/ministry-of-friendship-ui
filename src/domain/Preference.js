import BasicDomain from "./BasicDomain";
import * as yup from 'yup';

export default class Preference extends BasicDomain {

    static BUGS = 'BUGS'
    static BOTS = 'BOTS'
    static SQUIDS = 'SQUIDS'
  
    static OPEN = 'OPEN'
    static PUSH = 'PUSH'
    static OFF = 'OFF'

    static MAJORORDER = 'MAJORORDER'
    static MEDALS = 'MEDALS'
    static SAMPLES = 'SAMPLES'

    static PERSONAL = 'PERSONAL'
    static SQUAD = 'SQUAD'

    static ENEMIES = [
        Preference.BUGS,
        Preference.BOTS,
        Preference.SQUIDS,
    ]

    static MICS = [
        Preference.OPEN,
        Preference.PUSH,
        Preference.OFF,
    ]

    static OBJECTIVES = [
        Preference.MAJORORDER,
        Preference.MEDALS,
        Preference.SAMPLES,
    ]

    static TYPES = [
        Preference.PERSONAL,
        Preference.SQUAD,
    ]

    
    static SQUAD_DEFAULTS = {
        difficulty: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        enemy: Preference.ENEMIES,
        mic: Preference.MICS,
        objective: Preference.OBJECTIVES,
        type: Preference.SQUAD,
    }

    static PERSONAL_DEFAULTS = {
        difficulty: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        enemy: Preference.ENEMIES,
        mic: Preference.MICS,
        objective: Preference.OBJECTIVES,
        type: Preference.PERSONAL
    }

    static VALIDATION_SCHEMA = yup.object({
        type: yup.string().required('Type is required'),
    }).required();

    constructor(props) {
        super('Preference', props, props?.type === Preference.SQUAD ? Preference.SQUAD_DEFAULTS : Preference.PERSONAL_DEFAULTS);
    }


    isSavable = () => (
      Preference.TYPES.includes(this.type)
    );

    inspect = () => {
        return Preference.VALIDATION_SCHEMA.validate(this, { abortEarly: false });
    }
}

if (global.Parse.Object.registerSubclass) {
    global.Parse.Object.registerSubclass('Preference', Preference);
}
