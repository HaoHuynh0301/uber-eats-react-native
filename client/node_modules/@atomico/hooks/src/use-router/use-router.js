import { useState, useEffect } from "atomico";
import { getPath, listener, redirect } from "./src/history.js";
import { matches, getMatch } from "./src/matches.js";
export { redirect, getPath } from "./src/history.js";
import { addListener } from "../use-listener/use-listener.js";
import { useCurrentValue } from "../use-current-value/use-current-value.js";

const DefaultState = {};
/**
 * @template T
 * allows you to listen to only one route
 * @param {import("./src/matches").Routes} routes
 * @returns {[T, StringPath, ParamsPath, SearchPath]}
 */
export function useRouter(routes) {
  const [state, setState] = useState(DefaultState);
  const refRoutes = useCurrentValue(routes);

  useEffect(() => {
    // Returns to the default state to recycle the routes object
    setState(DefaultState);

    const reduce = () => {
      setState((current) => {
        const path = getPath();
        return current.path != path
          ? {
              path,
              result: matches(refRoutes.current, path),
            }
          : current;
      });
    };

    reduce();

    return listener(reduce);
  }, Object.keys(routes));

  return state.result || [];
}

/**
 * @template T
 * allows you to listen to only one route
 * @param {string} path
 * @param {import("./src/matches").RouterCallback} [callback]
 * @returns {[T, StringPath, ParamsPath, SearchPath]}
 */
export function useRoute(path, callback = (param) => param) {
  const routes = { [path]: callback };
  return useRouter(routes);
}
/**
 * Create a match function to manually compare route matches,
 * the instance of this hook listens for route changes
 * @example
 * ```js
 * const match = useRouteMatch();
 *
 * if(match("/")){
 *  console.log("in root")
 * }
 *
 * console.log(match("/:id"))
 * ```
 * @returns {(path:string)=>import("@uppercod/exp-route").Match}
 */
export function useRouteMatch() {
  const [state, setState] = useState(getPath);
  useEffect(() => listener(() => setState(getPath)), []);
  return (path) => getMatch(path)(state);
}

/**
 * Capture the click events of a reference to find
 * if a node declares href to associate redirection
 * @param {import("atomico").Ref<Element>} ref
 * @param {(path:string)=>string} [proxy] allows to change the redirect url
 */
export function useRedirect(ref, proxy) {
  useEffect(() => {
    const { current } = ref;
    const handler = (ev) => {
      const path = ev.composedPath();
      let target;
      while ((target = path.shift())) {
        if (
          target.hasAttribute &&
          target.hasAttribute("href") &&
          !target.hasAttribute("ignore")
        ) {
          ev.preventDefault();
          const href = target.getAttribute("href");
          if (!/^(http(s){0,1}:){0,1}\/\//.test(href))
            redirect(proxy ? proxy(href) : href);
          break;
        }
      }
    };
    return addListener(current, "click", handler, { capture: true });
  }, [ref]);
}

/**
 * @typedef {Object} InternalState
 * @property {string} [path]
 * @property {any} [result]
 */

/**
 * @typedef {string} StringPath
 */

/**
 * @typedef {Object<string,string>} ParamsPath
 */

/**
 * @typedef {Object<string,string>} SearchPath
 */
