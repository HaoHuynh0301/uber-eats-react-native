import { useRef } from "atomico";
import { useListener } from "../use-listener/use-listener.js";

/**
 * Capture the click or touch event to execute the callback multiple times,
 * depending on the type of pressure
 * @param {import("atomico").Ref} ref
 * @param {() => any} callback
 * @param {number} [aceleration]
 * @param {number} [minMs]
 */
export function useClickPress(ref, callback, aceleration = 0.9, minMs = 24) {
  const ctx = useRef();

  /**
   * @param {Event} event
   */
  const isEventIsTouches = (event) => event.type.startsWith("touch");

  /**
   * @param {Event} event
   */
  const handlerStart = (event) => {
    let isTouches = isEventIsTouches(event);

    if (isTouches) ctx.touches = true;

    if (!ctx.current && (ctx.touches ? isTouches : true)) {
      ctx.current = true;
      /**
       *
       * @param {number} ms
       */
      const loop = (ms) => {
        ms = minMs > ms ? minMs : ms;
        if (ctx.current) {
          ctx.timeout = setTimeout(() => {
            if (ctx.current) {
              callback();
              loop(ms * aceleration);
            }
          }, ms);
        }
      };
      loop(200);
    }
  };

  /**
   * @param {Event} event
   */
  const handlerStop = (event) => {
    let isTouches = isEventIsTouches(event);
    if (ctx.touches && !isTouches) return;

    if (ctx.timeout && ctx.current) {
      clearInterval(ctx.timeout);
      callback();
    }

    ctx.current = false;
  };

  useListener(ref, "mousedown", handlerStart);
  useListener(ref, "touchstart", handlerStart);

  useListener(
    ref,
    "keydown",
    (event) => event.code === "Space" && handlerStart(event)
  );

  useListener(ref, "mouseup", handlerStop);
  useListener(ref, "mouseleave", handlerStop);
  useListener(ref, "touchend", handlerStop);
  useListener(ref, "touchmove", handlerStop);

  useListener(ref, "keyup", (event) => handlerStop(event));
}
