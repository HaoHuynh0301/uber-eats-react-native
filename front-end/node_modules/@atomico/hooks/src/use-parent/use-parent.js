import { useHost, useMemo } from "atomico";
/**
 * @template {HTMLElement} T - reference current
 * @param {string} matches
 * @param {Boolean} [composed]
 * @returns {import("atomico").Ref<T>}
 */
export function useParent(matches, composed) {
  const path = useParentPath(composed);
  return useMemo(
    () => ({
      current: path.find((el) => el.matches && el.matches(matches)),
    }),
    [matches]
  );
}

/**
 * @param {boolean} composed
 * @returns {Element[]}
 */
export function useParentPath(composed) {
  const host = useHost();
  return useMemo(() => {
    const path = [];
    let { current } = host;
    while ((current = current.parentNode || (composed && current.host)))
      path.push(current);
    return path;
  }, [composed]);
}

/**
 * @typedef {(element:Element)=>Element|void} Reduce
 */
