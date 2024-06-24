import { useLocalStorage } from "usehooks-ts";

export function useStoreKey() {
  return useLocalStorage<string>("openaikey", "");
}
