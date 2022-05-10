import { c, html } from "atomico";
import { fixture } from "atomico/test-dom";
import { expect } from "@esm-bundle/chai";
import { useDisabled } from "./use-disabled.js";

it("useDisabled", async () => {
  const input = () => {
    const disabled = useDisabled();
    return html`<host>${disabled ? "disabled" : ""}</host>`;
  };

  input.props = { disabled: Boolean };

  const Input = c(input);

  customElements.define("use-disabled", Input);

  const node = new Input();

  const fieldset = fixture(html`<fieldset>
    <${node} />
  </fieldset>`);

  await node.updated;

  expect(node.textContent).to.equal("");

  fieldset.disabled = true;

  await node.updated;
  await node.updated;

  expect(node.textContent).to.equal("disabled");
});
