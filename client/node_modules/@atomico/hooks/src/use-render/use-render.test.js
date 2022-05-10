import { expect } from "@esm-bundle/chai";
import html from "atomico/html";
import { createHooks } from "atomico/test-hooks";
import { useRender } from "./use-render.js";

it("use-render", () => {
  const container = document.createElement("div");
  const hooks = createHooks(() => {}, container);

  hooks.load(() => {
    useRender(() => html`<button />`);
  });

  expect(container.querySelector("button")).to.not.equal(null);
});
