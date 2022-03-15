import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { useRoute, useRouteMatch } from "./use-router.js";

it("useRouter", () => {
  const hooks = createHooks(() => {});
  let render = 0;
  function load() {
    const result = useRoute("/[...any]");

    if (render++) {
      expect(result[0]).to.deep.equal({ any: "" });
    } else {
      expect(result).to.deep.equal([]);
    }
  }

  hooks.load(load);

  hooks.cleanEffects()();

  hooks.load(load);
});

it("useRouteMatch", () => {
  const hooks = createHooks();

  function load() {
    const match = useRouteMatch();

    expect(match("/[id]")).to.deep.equal({ id: "" });
  }

  hooks.load(load);
});
