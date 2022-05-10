import { useEffect, useState } from "atomico";
import { useCurrentValue } from "../use-current-value/use-current-value.js";
/**
 * create an instance of MutationObserver for the given reference
 * @example
 * ```js
 * const ref = useRef();
 * const config = {childList: true};
 * useMutationObserver(ref, (mutationRecords)=>{}, config);
 * ```
 * @param {import("atomico").Ref} ref
 * @param {MutationCallback} observe
 * @param {MutationObserverInit} [config]
 */
export function useMutationObserver(ref, observe, config) {
  const value = useCurrentValue(observe);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new MutationObserver((mutations) =>
      value.current(mutations)
    );
    observer.observe(ref.current, config);
    return () => observer.disconnect();
  }, [ref, ref?.current]);
}

/**
 * create an instance of MutationObserver for the given reference
 * and bind MutationRecord[] to a local state
 * @example
 * ```js
 * const ref = useRef();
 * const config = {childList: true};
 * const mutationRecords = useMutationObserverState(ref, config);
 * ```
 * @param {import("atomico").Ref} ref
 * @param {MutationObserverInit} [config]
 * @returns {MutationRecord[]}
 */
export function useMutationObserverState(ref, config) {
  const [state, setState] = useState();
  useMutationObserver(ref, setState, config);
  return state;
}
