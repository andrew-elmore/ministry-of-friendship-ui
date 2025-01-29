import BasicDomain from "./BasicDomain";
import * as yup from 'yup';

import Preference from "./Preference";

export default class Squad extends BasicDomain {

    static DEFAULTS = {
        code: null,
        preference: new Preference(),
        host: null,
        guestOne: null,
        guestTwo: null,
        guestThree: null,
    }

    static VALIDATION_SCHEMA = yup.object({
        type: yup.string().required('Type is required'),
    }).required();

    constructor(props) {
        super('Squad', props, Squad.DEFAULTS);
    }


    isSavable = () => (
      Preference.TYPES.includes(this.type)
    );

    inspect = () => {
        return Preference.VALIDATION_SCHEMA.validate(this, { abortEarly: false });
    }
}

if (global.Parse.Object.registerSubclass) {
    global.Parse.Object.registerSubclass('Squad', Squad);
}
