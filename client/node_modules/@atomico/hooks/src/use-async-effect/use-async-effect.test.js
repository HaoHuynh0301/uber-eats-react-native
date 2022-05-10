import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useAsyncEffect } from "./use-async-effect.js";

it("useAsyncEffect", (done) => {
  const hooks = createHooks();

  function load() {
    // done only completes at the end of the useEffect loop
    useAsyncEffect(async () => done);
  }

  hooks.load(load);
  // mounted effect
  hooks.cleanEffects()();
  // unmounted effect
  hooks.cleanEffects(true)();
});
