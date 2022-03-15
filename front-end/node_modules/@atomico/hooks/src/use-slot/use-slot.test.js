import { expect } from "@esm-bundle/chai";
import { Mark } from "atomico";
import { createHooks } from "atomico/test-hooks";
import { useSlot } from "./use-slot.js";

it("useSlot", () => {
  const current = document.createElement("slot");
  const host = document.createElement("div");

  host.innerHTML = `Text...<br/>`;
  host.attachShadow({ mode: "open" }).append(current);

  const ref = { current };

  const hooks = createHooks(() => {
    expect(render()).to.deep.equal([...host.childNodes]); // next  render
  });

  const render = () => hooks.load(() => useSlot(ref));

  render(); // first  render

  hooks.cleanEffects()();
});

it("avoid Mark", () => {
  const current = document.createElement("slot");
  const host = document.createElement("div");

  host.append(new Mark("Hidden"));
  host.attachShadow({ mode: "open" }).append(current);

  const ref = { current };

  const hooks = createHooks(() => {
    expect(render()).to.deep.equal([]); // next  render
  });

  const render = () => hooks.load(() => useSlot(ref));

  render(); // first  render

  hooks.cleanEffects()();
});
