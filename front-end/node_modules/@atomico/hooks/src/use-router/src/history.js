/**
 * @param {string} url
 */
export function redirect(url) {
  history.pushState({}, "history", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
/**
 *
 * @param {(ev: PopStateEvent) => void} handler
 */
export function listener(handler) {
  window.addEventListener("popstate", handler);
  return () => window.removeEventListener("popstate", handler);
}

export const getPath = () =>
  location.pathname + location.hash + location.search;
