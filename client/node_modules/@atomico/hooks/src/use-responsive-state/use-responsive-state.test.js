import { expect } from "@esm-bundle/chai";
import { setViewport } from "@web/test-runner-commands";
import { createHooks } from "atomico/test-hooks";
import {
  getSizes,
  getQuery,
  useResponsiveState,
} from "./use-responsive-state.js";

it("getSize", () => {
  const [sizeDefault, sizes] = getSizes("default, hd 1080px, fullhd 1980px");
  expect(sizeDefault).to.equal("default");

  const cases = [
    {
      value: "fullhd",
      media: "(min-width: 1980px)",
    },
    {
      value: "hd",
      media: "(min-width: 1080px)",
    },
  ];

  sizes
    .map((match) => ({ ...match, query: getQuery(match) }))
    .map(({ query, value }, index) => {
      expect(value).to.equal(cases[index].value);
      expect(query.media).to.equal(cases[index].media);
    });
});

it("useResponsiveState <= 320px", async () => {
  const hooks = createHooks(() => {});

  await setViewport({ width: 360, height: 640 });

  const load = () => {
    return useResponsiveState("no, yes 320px");
  };

  expect(hooks.load(load)).to.equal("yes");

  await setViewport({ width: 280, height: 640 });

  hooks.cleanEffects()();

  expect(hooks.load(load)).to.equal("no");
});
