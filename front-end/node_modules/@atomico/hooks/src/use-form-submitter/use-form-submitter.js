import { useState, useEffect } from "atomico";
export { formToObject } from "@uppercod/form-tools";
import { Status } from "../use-promise/use-promise.js";
import { useCurrentValue } from "../use-current-value/use-current-value.js";
import { addListener } from "../use-listener/use-listener.js";
/**
 * @type {Options}
 */
const defaultOptions = {
  action: "",
  request: { method: "POST", credentials: "same-origin" },
  submit: (body, { action, request }) =>
    fetch(action, { ...request, body }).then((res) => res.json()),
  formData: (target) => new FormData(target),
};

/**
 * Capture the submit of a form for submission
 * @param {import("atomico").Ref<HTMLFormElement>} ref
 * @param {Options} options
 * @returns {[any, import("../use-promise/use-promise").PromiseStatus,()=>void]}
 */
export function useFormSubmitter(ref, options) {
  const currentOptions = useCurrentValue(options);
  /**
   * @type {import("atomico").UseState<[any, import("../use-promise/use-promise").PromiseStatus]>}
   */
  const [state, setState] = useState([null, Status.quiet]);

  async function submit(event) {
    if (event instanceof Event) {
      event.preventDefault();
    }
    const { current } = ref;

    const target = event?.target || current;
    /**
     * @type {Options}
     */
    const { action, request, submit, formData } = {
      ...defaultOptions,
      ...{
        action: target.getAttribute("action"),
      },
      ...currentOptions.current,
    };

    if (currentOptions.prevent) return;
    currentOptions.prevent = true;

    setState([null, Status.pending]);
    const data = await formData(target);
    try {
      setState([await submit(data, { action, request }), Status.fulfilled]);
    } catch (error) {
      setState([error, Status.rejected]);
    }
    currentOptions.prevent = false;
  }

  useEffect(() => {
    const { current } = ref;
    return addListener(current, "submit", submit);
  }, []);

  return [...state, submit];
}

/**
 * @typedef {Object} Options
 * @property {string} [action]
 * @property {RequestInit} [request]
 * @property {(target: HTMLFormElement)=>any} [formData]
 * @property {(data: any, options: {action: string, request: RequestInit})=>any} [submit]
 */
