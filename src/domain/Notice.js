import CommonUtils from "utils/CommonUtils";

export default class Notice {
    static TYPE_INFO = 'neutral';

    static TYPE_WARN = 'warning';

    static TYPE_ERROR = 'danger';

    static TYPE_SUCCESS = 'success';

    static TYPES = [
        Notice.TYPE_COPYRIGHT,
        Notice.TYPE_INFO,
        Notice.TYPE_WARN,
        Notice.TYPE_ERROR,
        Notice.TYPE_SUCCESS,
    ]

    static DEFAULTS = {
        title: '',
        details: '',
        time: new Date(),
        active: true,
        type: Notice.TYPE_INFO,
        source: {}
    }

    constructor(props) {
        const defaults = {key: CommonUtils.generateKey(), ...Notice.DEFAULTS};
        Object.keys(defaults).forEach(key => {
            this[key] = props[key] ?? defaults[key];
        });
    }

    getSecondsOld = () => ((new Date() - this.time) / 1000);

    getLabel = () => (this.details != null && this.details !== '' ? `${this.title}: ${this.details}` : this.title);

    equals = (obj) => (obj instanceof Notice && this.key === obj.key);

    toString = () => this.getLabel();
}
