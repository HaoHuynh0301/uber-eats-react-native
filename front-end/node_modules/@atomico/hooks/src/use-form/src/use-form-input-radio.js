import { useProp, useRef, useEffect } from "atomico";
import { useListener } from "../../use-listener/use-listener.js";
import { useRender } from "../../use-render/use-render.js";
import { useFormListener } from "./core.js";

/**
 * reflects input radio in forms, this hook requires the declaration
 * of the props checked: Boolean and name: String
 * @param {*} input
 * @returns {import("atomico").Ref<HTMLInputElement>}
 */
export function useFormInputRadio(input) {
  const ref = useRef();
  const [checked, setChecked] = useProp("checked");
  const [name] = useProp("name");

  useFormListener("change", ({ currentTarget, target }) => {
    if (!(target instanceof HTMLInputElement)) return;
    const group = currentTarget.elements[name];
    if (group instanceof RadioNodeList) {
      [...group].forEach((input) => {
        input.checked = target === input;
      });
    }
    setChecked(target === ref.current);
  });

  useFormListener("reset", () => setChecked(false));

  useRender(() => ({
    ...input,
    props: {
      ...input.props,
      ref,
      type: "radio",
      name,
      checked,
    },
  }));

  useListener(ref, "change", (event) => {
    setChecked(event.target.checked);
  });

  useEffect(() => {
    setChecked(ref.current.checked);
  }, []);

  return ref;
}
