import { createStreamableUI } from "ai/rsc";

async function genKataFinal() {
  //
}

async function genKataInitial() {
  //
}

async function genReadme() {
  //
}

export async function genKata({
  uiStream,
  kataTitle,
  kataDescription,
  mock = false,
}: {
  uiStream: ReturnType<typeof createStreamableUI>;
  kataTitle: string;
  kataDescription: string;
  mock: boolean;
}) {
  // build completed version of code
  // build initial version of code
  // build README
}
