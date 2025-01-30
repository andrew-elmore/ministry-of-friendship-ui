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
        code: yup.string().required('Friend Code is required'),
    }).required();

    constructor(props) {
        super('Squad', props, Squad.DEFAULTS);
    }


    isSavable = () => (
        this.get('code') !== null
    );

    inspect = () => {
        return Squad.VALIDATION_SCHEMA.validate(this, { abortEarly: false });
    }
}

if (global.Parse.Object.registerSubclass) {
    global.Parse.Object.registerSubclass('Squad', Squad);
}
