import { useEffect } from "atomico";
/**
 * Allows the useEffect callback to have asynchronous execution by default
 * @param {()=>Promise<()=>any|void>} effect
 * @param {Array<any>} [args]
 * @example
 * ```js
 * useAsyncEffect(async ()=>{});
 * ```
 */
export function useAsyncEffect(effect, args) {
  useEffect(() => {
    const task = Promise.resolve(args).then(effect);
    return () => task.then((collector) => collector());
  }, args);
}
