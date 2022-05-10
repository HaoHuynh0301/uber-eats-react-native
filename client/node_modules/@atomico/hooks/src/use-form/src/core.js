import { h, useState } from "atomico";
import { useParent } from "../../use-parent/use-parent.js";
import { useListener } from "../../use-listener/use-listener.js";
import { useRender } from "../../use-render/use-render.js";

/**
 * Gets the top form
 * @returns {import("atomico").Ref<HTMLFormElement>}
 */
export function useForm() {
  return useParent("form");
}

/**
 * Allows you to listen to the native events of the form
 * @template {keyof FormEvents} T
 * @param {T} name
 * @param {FormHandler<T>} handler
 * @param {boolean|AddEventListenerOptions} [options]
 */
export function useFormListener(name, handler, options) {
  useListener(useForm(), name, handler, options);
}

/**
 * Render an input hidden to pass values to forms
 * @param {string} name
 * @param {string} value
 */
export function useFormInputHidden(name, value) {
  const [slot] = useState(Math.random);
  useRender(
    () => h("input", { type: "hidden", value, name, slot }),
    [name, value]
  );
}

/**
 * @typedef SubmitEvent
 * @property {FormData} formData
 */

/**
 * @typedef FormDataEvent
 * @property {HTMLElement} submitter
 */

/**
 * @typedef FormEvents
 * @property {FormDataEvent & Event} formdata
 * @property {SubmitEvent & Event} submit
 * @property {Event} reset
 * @property {Event} change
 * @property {Event} input
 */

/**
 * @template {keyof FormEvents} T
 * @typedef {(ev:FormEvents[T])=>any} FormHandler
 */
