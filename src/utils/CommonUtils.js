/* eslint no-bitwise: ["error", { "allow": ["<<"] }] */
export default class CommonUtils {
    static EMPTY_FUNCTION = () => {};

    static generateKey = () => (Math.random() * 0xFFFFFF << 0).toString(16)

    static createPointer = (className, objectId) => ({
        __type: 'Pointer',
        className,
        objectId
    });
}
