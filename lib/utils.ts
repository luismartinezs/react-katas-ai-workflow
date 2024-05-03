import type { Step, AiState } from "@/app/play/action";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getLastStep(aiState: AiState): Step {
  if (aiState.kata) {
    return "kata";
  } else if (aiState.ideas) {
    return "ideas";
  } else if (aiState.outline) {
    return "outline";
  } else if (aiState.docs) {
    return "docs";
  }

  return "docs";
}