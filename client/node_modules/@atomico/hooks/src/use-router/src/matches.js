import { createMatch, getParts, searchParams } from "@uppercod/exp-route";

/**
 * @type {Object<string,import("@uppercod/exp-route").Match>}
 */
const cache = {};

/**
 *
 * @param {string} path
 */
export const getMatch = (path) =>
  (cache[path] = cache[path] || createMatch(path));
/**
 *
 * @param {Routes} routes
 * @param {string} currentPath
 */
export const matches = (routes, currentPath) => {
  const [path, pathSearch] = getParts(currentPath);
  const search = pathSearch ? searchParams(pathSearch) : {};
  for (const route in routes) {
    const match = getMatch(route);
    const params = match(path);
    if (params) {
      return [routes[route](params, search), route, params, search];
    }
  }
};

/**
 * @callback RouterCallback
 * @param {import("@uppercod/exp-route").Params} params
 * @param {import("@uppercod/exp-route").Params} search
 */

/**
 * @typedef {Object<string, RouterCallback>} Routes
 */
