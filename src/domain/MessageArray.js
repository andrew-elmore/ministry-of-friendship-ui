import BasicArray from './BasicArray';
import Message from './Message';

export default class MessageArray extends BasicArray {
    get myItemClass() { return Message; }

    constructor(items = []) {
        super(items);
    }

    clone = () => new MessageArray(this.filter((e) => (e.active || e.getSecondsOld() < 60)));
}
