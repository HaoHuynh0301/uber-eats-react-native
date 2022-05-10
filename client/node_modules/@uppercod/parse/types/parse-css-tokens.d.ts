export function createParseCssTokens({ prefix, tokens }: {
    prefix: string;
    tokens?: {
        [x: string]: Tokens & TokensUnknown;
    };
}): {
    /**
     * @type {Object<string,Tokens & TokensUnknown>}
     */
    tokens: {
        [x: string]: Tokens & TokensUnknown;
    };
    /**
     * @param {TemplateStringsArray}
     */
    tokenize({ raw }: TemplateStringsArray): string;
};
export type Tokens = {
    title: string;
    type?: string | undefined;
    children: [string, string, string, (string | undefined)][];
};
export type TokensUnknown = {
    [x: string]: string;
};
