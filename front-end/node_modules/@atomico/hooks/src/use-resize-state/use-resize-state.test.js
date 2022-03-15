import { expect } from "@esm-bundle/chai";
import { setViewport } from "@web/test-runner-commands";
import { createHooks } from "atomico/test-hooks";
import { useResizeState } from "./use-resize-state.js";

it("useResponsiveState <= 320px", (done) => {
  const current = document.createElement("div");
  const ref = { current };
  let step = 0;

  document.body.appendChild(current);

  const hooks = createHooks(() => hooks.load(load), current);

  const load = () => {
    const value = useResizeState(ref, "no, yes 320px");
    switch (step++) {
      case 0:
        expect(value).to.undefined;
        break;
      case 1:
        expect(value).to.equal("yes");
        break;
      case 2:
        expect(value).to.equal("no");
        done();
        break;
    }
  };

  hooks.load(load);

  hooks.cleanEffects()();

  setViewport({ width: 360, height: 640 }).then(() => {
    setViewport({ width: 200, height: 640 });
  });
});
