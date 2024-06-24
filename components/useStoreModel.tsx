import { OpenaiModel, openaiModels } from "@/lib/constants";
import { useLocalStorage } from "usehooks-ts";

export function useStoreModel() {
  return useLocalStorage<OpenaiModel>('openaimodel', 'gpt-4o')
}