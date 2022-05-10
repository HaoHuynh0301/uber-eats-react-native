import { useHost, useState } from "atomico";

const selectedChild = Symbol();
/**
 * Search for the ChildNode outside the render
 * @param {HTMLElement & import("atomico/types/dom").AtomBase} current
 * @returns {ChildNode[]}
 */
function loadChildNodes(current) {
  const { symbolId } = current;
  /**@type {ChildNode[]} */
  const currentChildren = [];
  current.childNodes.forEach((node) => {
    if (!node[symbolId]) {
      if (!node[symbolId] || node[selectedChild]) {
        node[selectedChild] = true;
        currentChildren.push(node);
      }
    }
  });
  return currentChildren;
}
/**
 * Return ChildNode[] outside the render
 * @returns {[ChildNode[],()=>void]}
 */
export function useChildNodes() {
  const { current } = useHost();
  const update = () => loadChildNodes(current);
  const [childNodes, setChildNodes] = useState(update);
  return [childNodes, () => setChildNodes(update)];
}
