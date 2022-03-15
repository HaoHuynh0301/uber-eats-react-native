import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useChildNodes } from "./use-child-nodes.js";

it("useSlots", () => {
  const div = document.createElement("div");
  const header = div.appendChild(document.createElement("header"));

  header.setAttribute("slot", "Header");

  const hooks = createHooks(null, div);

  function load() {
    const [childNodes] = useChildNodes();
    expect(childNodes).to.deep.equal([header]);
  }

  hooks.load(load);
});
