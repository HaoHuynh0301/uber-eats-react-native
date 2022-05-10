import { expect } from "@esm-bundle/chai";
import { useHost } from "atomico";
import { createHooks } from "atomico/test-hooks";
import { useReflectEvent } from "./use-reflect-event";

it("useReflectEvent", (done) => {
  const host = document.createElement("div");
  const hooks = createHooks(null, host);
  const refTo = { current: document.createElement("div") };

  hooks.load(() => {
    const refFrom = useHost();
    useReflectEvent(refFrom, refTo, "click");
  });

  hooks.cleanEffects()();

  refTo.current.addEventListener("click", (event) => {
    done();
    expect(event).to.be.an.instanceof(PointerEvent);
  });

  host.click();
});
