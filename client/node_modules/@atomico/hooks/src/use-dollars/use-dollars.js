import { useHost, useEffect } from "atomico";
import { useSlot } from "../use-slot/use-slot";
import { State, Host } from "dollars.js";

class AtomicoState extends State {
  init(state) {
    return state;
  }
}

export function useDollars(ref, config = { prefix: "$" }) {
  const childNodes = useSlot(ref);
  const host = useHost();

  useEffect(() => {
    ref.states = childNodes
      .filter((el) => el instanceof Element)
      .map(
        /**
         *
         * @param {Element} element
         */
        (element) => {
          const state = new AtomicoState(host.current);
          new Host(element, state, config);
          return state;
        }
      );
  }, childNodes);

  useEffect(() => ref?.states?.forEach((state) => state.update()));

  return ref;
}
