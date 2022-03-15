import { useHost, useLayoutEffect } from "atomico";

/**
 *
 * @param {string} cssText
 */
export function useCss(cssText) {
  const host = useHost();

  if (!host.style) {
    host.style = document.createElement("style");
  }

  if (host.style.textContent != cssText) host.style.textContent = cssText;

  useLayoutEffect(() => {
    const {
      current: { shadowRoot },
    } = host;
    if (!shadowRoot) return;
    shadowRoot.appendChild(host.style);
    return () => host.style.remove();
  }, []);
}
