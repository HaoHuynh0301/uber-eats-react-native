import { useRef } from "atomico";

/**
 * @template T
 * @param {T} value
 * @returns {import("atomico").Ref<T>}
 */
export function useCurrentValue(value) {
  const ref = useRef();
  ref.current = value;
  return ref;
}
