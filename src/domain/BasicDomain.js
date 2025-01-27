export default class BasicDomain extends global.Parse.Object {

    constructor(className, props = {}, defaults = {}) {
        super(className);

        // Retain attributes
        let attr = defaults;
        if (props.attributes) {
            attr = {...defaults, ...props.attributes}
        } else if (typeof yourVariable === 'object') {
            attr = {...defaults, ...props}
        }

        if(props.id) {
            super.set('id', props.id);
            attr['_localId'] = props._localId; // Used by LiveQuery to persist objects across calls
        }

        super.set(attr)
        this._initOriginalValues(props._originalValues ?? {});

        // Dynamically create getters and setters for each property in defaults
        Object.keys(defaults).forEach(key => {
            if (!this[key]) {
                Object.defineProperty(this, key, {
                    get: function() {
                        return this.get(key) ?? defaults[key];
                    },
                    set: function(value) {
                        this.set(key, value ?? defaults[key]);
                    },
                });
            }
        });
    }

    _initOriginalValues(incoming = {}) {
        this._originalValues = {...incoming}
    }

    _logOriginalValue(key, nextValue, prevValue) {
        if (this._originalValues[key] === undefined) {
            this._originalValues[key] = prevValue;
        } else if (this._originalValues[key] === nextValue) {
            delete this._originalValues[key];
        }
    }

    set(key, value, options) {
        if (typeof key === 'object') {
            Object.keys(key).forEach(k => {
                this._logOriginalValue(k, value, this.get(k));
            });
        } else {
            this._logOriginalValue(key, value, this.get(key));
        }
        return super.set(key, value, options);
    }

    reset() {
        super.set(this._originalValues);
        this._initOriginalValues();
        return this;
    }

    async save(...args) {
        this._initOriginalValues();
        return super.save(...args);
    }

    isDirty = () => Object.keys(this._originalValues).length > 0;

    dirtyKeys = () => Object.keys(this._originalValues);

    isSavable = () => false;

    /**
     * Inspects the current object instance for issues.
     *
     * This is a basic placeholder method intended to be overridden in child classes.
     * By default, it returns a Promise that resolves to an empty object, ensuring
     * consistency in behavior across all derived classes if they do not implement
     * their own inspect method.
     *
     * Child Class Override Example:
     * ```
     * // In a child class like Employee
     * export default class Example extends BasicDomain {
     *  static VALIDATION_SCHEMA = yup.object({
     *    field1: yup.string().required('Field 1 is required'),
     *    field2: yup.string().email('Invalid email format').required('Field 2 is required'),
     *  }).required();
     *
     *   inspect = () => {
     *     return Example.VALIDATION_SCHEMA.validate({...this}, { abortEarly: false });
     *   }
     * }
     * ```
     * In this example, the Example class uses Yup to define a validation schema
     * and the inspect method validates the instance against this schema.
     *
     * UI Component Usage Example:
     * ```
     * // In a React component
     * const [errors, setErrors] = useState({});
     * const handleSubmit = async (event) => {
     *    try {
     *      await myObject.inspect();
     *      onSave(myObject);
     *    } catch (err) {
     *      const newErrors = err.inner.reduce((acc, curr) => {
     *        acc[curr.path] = curr.message;
     *        return acc;
     *      }, {});
     *      setErrors(newErrors);
     *    }
     *  };
     * ```
     * Here, the inspect method is used to validate an object before saving.
     *
     * @returns {Promise<Object>} A Promise that resolves to an object of errors where the key is the field with the
     *                            error and the value is the error message.
     */
    inspect = () => {
        return new Promise(resolve => {
            resolve({});
        });
    }

    getByPath = (path = []) => {
        let value = this;
        for (const key of path) {
            if (!value) return null;
            value = value.get(key);
            if (value instanceof Date) {
                return new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                }).format(value).replace(/(\d+)(?=,)/, (d) => {
                    const s = ['th', 'st', 'nd', 'rd'];
                    return d + (s[(d % 10)] || s[0]); 
                });
            }
        }
        return value;
    }
}
