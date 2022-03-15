/**
 * captures the parameters of a string
 * @example
 * ```js
 * parseParams(`var(--z)`) // [ [["var","--z"]] ]
 * ```
 * @param {string} input
 * @returns {[string,string[]][]}
 */
export function parseParams(input: string): [string, string[]][];
