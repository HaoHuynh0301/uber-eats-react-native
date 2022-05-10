/**
 * @typedef {Object} Tokens
 * @property {string} title
 * @property {string} [type]
 * @property {[string,string,string,(string|undefined)][]} children
 */

/**
 * @typedef {Object<string,string>} TokensUnknown
 */

/**
 *
 * @param {{prefix:string,tokens?:Object<string,Tokens & TokensUnknown>}} config
 */
export const createParseCssTokens = ({ prefix, tokens = {} }) => ({
    /**
     * @type {Object<string,Tokens & TokensUnknown>}
     */
    tokens,
    /**
     * @param {TemplateStringsArray}
     */
    tokenize({ raw }) {
        let id;
        let cssProps = "";
        let text = raw.join("");
        let nextProp = "";
        text.replace(
            /\s*(@){0,1}([^:]+)\s*:\s*([^;]+);/g,
            (part, meta, prop, value) => {
                if (meta && prop == "title") id = value;

                if (id) {
                    tokens[id] = tokens[id] || {
                        children: [],
                    };
                    if (meta) {
                        if (prop == "prop") {
                            nextProp = value;
                        } else {
                            tokens[id][prop] = value;
                        }
                    } else {
                        const global = `--${prefix}${prop}`;
                        cssProps += `--${prop}: var(${global}, ${value});\n`;
                        tokens[id].children.push([
                            global,
                            value,
                            prop,
                            nextProp,
                        ]);
                        nextProp = "";
                    }
                }
            }
        );

        return cssProps.trim();
    },
});
