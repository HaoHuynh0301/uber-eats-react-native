# @uppercod/parse

utilities for text analysis

## parse-css-params

Capture the parameters using the css parameter syntax, example:

```js
import { parseCssParams } from "@uppercod/parse/parse-css-params";

parseCssParams(`var(--z, var(--x)) url("background.jpg")`);
```

**Output**

```json
[
    [
        ["var", ["--z", "var(--x)"]],
        ["url", ["background.jpg"]]
    ]
]
```

## parse-css-tokens

captures the properties of a string and associates them to an object, the capture allows associating useful meta tags to document or group the tokens

```js
import { createTokens } from "@uppercod/parse/parse-css-tokens";

const { tokenize, tokens } = createTokens({ prefix: "fm--" });

tokenize`
    @title: Colors
    @description: UI colors;
    primary: red;
    secondary: black;
`;
/**
 * @output
 * --my-property: var(--fm--my-property, red);
 */

console.log(tokens);
/**
 * @output
 * {
 *    "Colors": {
 *        "title": "Colors",
 *        "description": "UI colors",
 *        "children": [["--fm--my-property", "red"]]
 *    }
 * }
 */
```

> the regular expression is weak when capturing the parameters, so the metadata cannot include property type characters such as `:` and `;`.
