import { useHost, useLayoutEffect } from "atomico";
import { getRules } from "./src/utils.js";

let ID = 0;
/**
 * Create a style collector to apply once the render is finished
 * @param {import("atomico").Sheets} sheet
 */
export function useCssLightDom(sheet) {
  const host = useHost();

  useLayoutEffect(() => {
    const style = document.createElement("style");

    const { current } = host;

    if (!current.dataset.sheet) {
      current.dataset.sheet = ID++;
    }

    current.appendChild(style);

    (Array.isArray(sheet) ? sheet.flat(100) : [sheet]).forEach(
      (sheet) =>
        sheet &&
        getRules(
          sheet,
          current.localName + `[data-sheet="${current.dataset.sheet}"]`
        ).forEach((rule) =>
          style.sheet.insertRule(rule, style.sheet.cssRules.length)
        )
    );

    return () => style.remove();
  }, [sheet]);
}
