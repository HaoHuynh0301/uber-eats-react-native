/**
 * instance to identify a value
 * @param {*} value
 */
function Value(value) {
    this.value = value;
}
/**
 * returns a property path from an expression
 * @param {string} path
 * @returns {string[]}
 */
export const getPath = (path) => path.match(/(\[\d+\]|\w+)/g);

/**
 * create an object from a path
 * @param {string[]} path
 * @param {*} value
 * @returns {[string,any]}
 */
export const createObjectFromPath = (path, value) =>
    // @ts-ignore
    path.reverse().reduce((value, prop) => [prop, value], new Value(value));
/**
 * @template {Object<string,any>}  T
 * @param {T} [defaultData]
 * @returns {(target:HTMLFormElement)=>any}
 */

/**
 *
 * @param {*} parent
 * @param {[string,any]} next
 */
export function extend(parent, [name, value]) {
    if (value instanceof Value) {
        parent[name] = value.value;
    } else {
        const [nextName, nextValue] = value;
        const test = nextName.match(/^\[(\d+)\]$/);
        let current = parent[name];
        if (test) {
            const [, index] = test;
            value = [index, nextValue];
        }
        if (current == null) {
            current = test ? [] : {};
            extend(current, value);
        } else {
            extend(current, value);
        }
        parent[name] = test ? current.filter((value) => value) : current;
    }
    return parent;
}
/**
 *
 * @param {string} name
 * @param {Element & {type?:string, value?:string,checked?:boolean}} input
 * @returns {number|string|boolean}
 */
export const getValueFromInput = (name, input) => {
    const isRadioList = input instanceof RadioNodeList;
    const withvalue = isRadioList ? true : input.hasAttribute("value");
    const { type, value, checked } = input;
    const isSwitch = type == "radio" || type == "checkbox";
    const isNumber = type == "number";
    return isSwitch
        ? withvalue
            ? checked
                ? value
                : null
            : checked
        : isRadioList && value === ""
        ? null
        : isNumber
        ? Number(value)
        : value;
};

export const formToObject = (defaultData) => (target) => {
    const elements = Object.entries(target.elements).filter(
        ([prop]) => !/^\d+$/.test(prop)
    );
    const data = elements.reduce(
        /**
         *
         * @param {Object<string,any>} data
         * @param {[string,HTMLInputElement]} entry
         * @returns
         */
        (data, [name, input]) =>
            extend(
                data,
                createObjectFromPath(
                    getPath(name),
                    getValueFromInput(name, input)
                )
            ),
        { ...defaultData }
    );
    return data;
};
