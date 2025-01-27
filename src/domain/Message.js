import BasicDomain from './BasicDomain';
import CommonUtils from "../utils/CommonUtils";

export default class Message extends BasicDomain {
    static TYPE_INFO = 'neutral';

    static TYPE_WARN = 'warning';

    static TYPE_ERROR = 'danger';

    static TYPE_SUCCESS = 'success';

    static TYPES = [
        Message.TYPE_COPYRIGHT,
        Message.TYPE_INFO,
        Message.TYPE_WARN,
        Message.TYPE_ERROR,
        Message.TYPE_SUCCESS,
    ]

    static DEFAULTS = {
        title: '',
        details: '',
        time: new Date(),
        active: true,
        type: Message.TYPE_INFO,
        source: {}
    }

    constructor(props) {
        super(
            'Message',
            props,
            {key: CommonUtils.generateKey(), ...Message.DEFAULTS}
        );
    }

    getSecondsOld = () => ((new Date() - this.time) / 1000);

    getLabel = () => (this.details != null && this.details !== '' ? `${this.title}: ${this.details}` : this.title);

    equals = (obj) => (obj instanceof Message && this.key === obj.key);

    toString = () => this.getLabel();
}
