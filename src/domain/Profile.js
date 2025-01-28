import BasicDomain from "./BasicDomain";
import * as yup from 'yup';
import Preference from "./Preference";

export default class Profile extends BasicDomain {

    static STATUS_ACTIVE = 'ACTIVE';

    static STATUS_INACTIVE = 'INACTIVE';

    static STATUSES = [
        Profile.STATUS_ACTIVE,
        Profile.STATUS_INACTIVE,
    ]

    static STATUS_LABELS = {
        [Profile.STATUS_ACTIVE]: 'Active',
        [Profile.STATUS_INACTIVE]: 'Inactive',
    }
 
    static DEFAULTS = {
        gamerTag: '',
        preference: new Preference(),
        status: Profile.STATUS_ACTIVE,
    }

    static VALIDATION_SCHEMA = yup.object({
        gamerTag: yup.string().required('Gamer Tag is required'),
        type: yup.string().required('Type is required'),
    }).required();

    constructor(props) {
        super('Profile', props, Profile.DEFAULTS);
    }


    isSavable = () => (
        Profile.TYPES.includes(this.type)
        && Profile.STATUSES.includes(this.status)
    );

    inspect = () => {
        return Profile.VALIDATION_SCHEMA.validate(this, { abortEarly: false });
    }
}

if (global.Parse.Object.registerSubclass) {
    global.Parse.Object.registerSubclass('Profile', Profile);
}
