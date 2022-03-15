import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { usePromise } from "./use-promise.js";

it("usePromise run = true", (done) => {
  let cycle = 0;

  const load = () => {
    const [result, status] = usePromise(async () => 10, true);

    switch (cycle++) {
      case 0:
        expect(status).to.equal("");
        expect(result).to.undefined;
        break;
      case 1:
        expect(status).to.equal("pending");
        expect(result).to.undefined;
        break;
      case 2:
        expect(status).to.equal("fulfilled");
        expect(result).to.equal(10);
        done();
        break;
    }
  };

  const render = () => hooks.load(load);

  const hooks = createHooks(render);

  render();

  hooks.cleanEffects()();
});
