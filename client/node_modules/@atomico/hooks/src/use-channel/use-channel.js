import { useHost, useState, useLayoutEffect } from "atomico";
import { Channel } from "@atomico/channel";
/**
 * @template T
 * @param {string} namespace
 * @returns {[T,(T)=>T]}
 */

export function useChannel(namespace) {
  const host = useHost();
  const [state, setState] = useState();

  useLayoutEffect(() => {
    const channel = new Channel(host.current, namespace, true);

    host.channel = channel;

    channel.connect(setState);

    return () => channel.disconnect();
  }, [namespace]);

  return [state, (state) => host.channel.cast(state)];
}
