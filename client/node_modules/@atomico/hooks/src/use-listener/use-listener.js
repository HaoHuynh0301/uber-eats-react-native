import { useLayoutEffect, useState } from "atomico";
import { useCurrentValue } from "../use-current-value/use-current-value.js";
/**
 * @param {import("atomico").Ref} ref
 * @param {string} name
 * @param {EventListener} handler
 * @param {boolean|AddEventListenerOptions} [options]
 */
export function useListener(ref, name, handler, options) {
  const value = useCurrentValue(handler);
  useLayoutEffect(() => {
    const { current } = ref;
    if (!current || !handler) return;
    return addListener(current, name, (event) => value.current(event), options);
  }, [ref, ref?.current, name, !!handler]);
}

/**
 * Associate an event and return a callback to remove said event
 * @param {ChildNode} current
 * @param {string} name
 * @param {EventListener} handler
 * @param {boolean|AddEventListenerOptions} [options]
 * @returns {()=>void}
 */
export function addListener(current, name, handler, options) {
  current.addEventListener(name, handler, options);
  return () => current.removeEventListener(name, handler);
}

/**
 * @template T
 * @param {import("atomico").Ref} ref
 * @param {string} name
 * @param {(event:Event)=>T} handler
 * @param {boolean|AddEventListenerOptions} [options]
 * @return {T|null}
 */
export function useListenerState(ref, name, handler, options) {
  const [state, setState] = useState();
  useListener(ref, name, (event) => setState(handler(event)), options);
  return state;
}
