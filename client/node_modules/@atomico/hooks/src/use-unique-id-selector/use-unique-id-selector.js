import { useState } from "atomico";
import { hash } from "@uppercod/hash";

const getUniqueIdSelector = () => {
  return "id-" + hash(Math.random() + "-" + Date.now());
};

export function useUniqueIdSelector() {
  const [id] = useState(getUniqueIdSelector);
  return id;
}
