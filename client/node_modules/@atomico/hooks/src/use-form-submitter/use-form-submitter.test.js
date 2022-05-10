import { createHooks } from "atomico/test-hooks";
import { expect } from "@esm-bundle/chai";
import { useFormSubmitter } from "./use-form-submitter";

it("useFormSubmitter", (done) => {
  const hooks = createHooks(() => {});
  const form = document.createElement("form");
  const value = "my value...";
  form.innerHTML = `<input type="text" name="field" value="${value}"/>`;

  const refForm = {
    current: form,
  };

  hooks.load(() => {
    useFormSubmitter(refForm, {
      submit(data) {
        expect(data.get("field")).to.equal(value);
        done();
      },
    });
  });

  hooks.cleanEffects()();

  form.dispatchEvent(new Event("submit"));
});
