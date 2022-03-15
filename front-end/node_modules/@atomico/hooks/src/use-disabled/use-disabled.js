import { useProp, useLayoutEffect } from "atomico";
import { useParent } from "../use-parent/use-parent.js";
import { useMutationObserver } from "../use-mutation-observer/use-mutation-observer.js";

/**
 *
 * @param {Element} el
 * @returns
 */
const checkDisable = (el) => el.hasAttribute("disabled");
/**
 * Synchronize disabled status with a parent
 * @param {string} [matches] - allows to change the search of the fieldset to another element.
 * @returns {boolean}
 * @example
 * ```jsx
 * <fieldset disabled>
 *      <my-input>I am disabled</my-input>
 * </fieldset>
 * ```
 * @example
 * ```css
 * :host([disabled]){
 *      pointer-events: none;
 * }
 * ```
 */
export function useDisabled(matches = "fieldset") {
  const fieldset = useParent(matches);
  const [disabled, setDisabled] = useProp("disabled");

  useMutationObserver(
    fieldset,
    (items) =>
      items
        .filter((item) => item.attributeName == "disabled")
        .map((el) => {
          setDisabled(checkDisable(el.target));
        }),
    {
      attributes: true,
    }
  );

  useLayoutEffect(() => {
    const { current } = fieldset;
    if (current) {
      setDisabled(checkDisable(current));
    }
  }, []);

  return disabled;
}
