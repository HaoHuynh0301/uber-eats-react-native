import { expect } from "@esm-bundle/chai";
import { compareSnapshot, setViewport } from "@web/test-runner-commands";
import { createHooks } from "atomico/test-hooks";
import { useMediaQuery } from "./use-media-query.js";

it("useMediaQuery", (done) => {
  const hooks = createHooks(() => {
    expect(hooks.load(load)).to.equal(true);
    done();
  });

  const load = () => useMediaQuery("(max-width: 520px)");

  const match = hooks.load(load);

  expect(match).to.equal(false);

  hooks.cleanEffects()();

  setViewport({ width: 360, height: 640 });
});
