export const DEFAULTS = {
  OPENAI_MODEL: "gpt-3.5-turbo",
} as const

export const sectionTitle = {
  docs: 'Documentation',
  outline: 'Outline',
  ideas: 'Ideas',
  kata: 'Kata'
}


export const openaiModels: OpenaiModel[] = [
  "gpt-3.5-turbo",
  "gpt-4-turbo",
  "gpt-4o"
]

export type OpenaiModel = "gpt-3.5-turbo" | "gpt-4-turbo" | "gpt-4o"