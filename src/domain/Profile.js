import BasicDomain from "./BasicDomain";
import * as yup from 'yup';

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

    static TYPE_ADMIN = 'ADMIN';
    static TYPE_USER = 'USER';

    static TYPES = [
        Profile.TYPE_ADMIN,
        Profile.TYPE_USER,
    ]

 
    static DEFAULTS = {
        firstName: '',
        lastName: '',
        status: Profile.STATUS_ACTIVE,
        type: Profile.TYPE_USER
    }

    static VALIDATION_SCHEMA = yup.object({
        lastName: yup.string().required('Last Name/Initial is required'),
        firstName: yup.string().required('First Name is required'),
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
