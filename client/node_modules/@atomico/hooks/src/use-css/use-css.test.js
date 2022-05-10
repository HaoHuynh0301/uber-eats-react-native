import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useCss } from "./use-css.js";

it("useCss", () => {
  const host = document.createElement("div");
  host.attachShadow({ mode: "open" });
  const hooks = createHooks(() => {}, host);

  const cssText = /*css*/ `
    :host{
        color: red
    }
  `;

  hooks.load(() => {
    useCss(cssText);
  });

  hooks.cleanEffects();

  expect(host.shadowRoot.querySelector("style")).to.be.an.instanceof(
    HTMLStyleElement
  );

  expect(host.shadowRoot.querySelector("style").textContent).to.equal(cssText);

  hooks.cleanEffects(1);

  expect(host.shadowRoot.querySelector("style")).to.be.null;
});
