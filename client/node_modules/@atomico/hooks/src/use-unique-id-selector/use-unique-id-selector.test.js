import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useUniqueIdSelector } from "./use-unique-id-selector";

it("useSlot", () => {
  const hooks = createHooks(() => {});

  const id = hooks.load(() => useUniqueIdSelector());

  expect(typeof id).to.equal("string");

  expect(id.length > 6).to.be.true;
});
