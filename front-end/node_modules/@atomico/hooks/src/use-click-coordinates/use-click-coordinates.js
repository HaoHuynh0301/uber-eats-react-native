import { useEffect } from "atomico";
import { useCurrentValue } from "../use-current-value/use-current-value.js";
import { addListener } from "../use-listener/use-listener.js";
/**
 *
 * @param {import("atomico").Ref} ref
 * @param {(coordinates:Coordinates)=>void} callback
 */
export function useClickCoordinates(ref, callback) {
  const value = useCurrentValue(callback);

  useEffect(() => {
    const { current } = ref;

    if (!current) return;

    return addListener(
      current,
      "click",
      (event) => {
        const coordinates = getCoordinates(event);
        coordinates && value.current(coordinates);
      },
      true
    );
  }, [ref, ref?.current]);
}

/**
 *
 * @param {PointerEvent & TouchEvent} event
 * @returns {Coordinates|null}
 */
function getCoordinates({ pageX: x, pageY: y, currentTarget, isTrusted }) {
  if (!isTrusted) return;

  const rect = currentTarget.getBoundingClientRect();

  return {
    x,
    y,
    offset: {
      x: x - rect.left,
      y: y - rect.top,
    },
  };
}

/**
 *
 * @typedef {{x:number,y:number,offset:{x:number,y:number}}} Coordinates
 */
