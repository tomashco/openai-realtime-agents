import { tool } from "@openai/agents/realtime";

export const generateImage = tool({
  name: "generateImage",
  description:
    "Genera un’immagine evocativa che rappresenta come sarebbe il mondo se tutti vivessero come l’utente oggi. Usa l’API OpenAI Images.",
  parameters: {
    type: "object",
    properties: {
      prompt: {
        type: "string",
        description:
          "Descrizione visiva poetica e motivante, basata sull’impatto ambientale calcolato (CO₂e, acqua, energia, rifiuti). Deve comunicare l’effetto globale dello stile di vita quotidiano dell’utente.",
      },
      size: {
        type: "string",
        description:
          "Opzionale: dimensione dell’immagine da generare. Valori tipici: 256x256, 512x512, 1024x1024.",
      },
    },
    required: ["prompt"],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { prompt, size } = input as {
      prompt: string;
      size?: string;
    };

    return {
      imageUrl:
        "https://sdmntprpolandcentral.oaiusercontent.com/files/00000000-2a30-620a-b3ed-1f286e730595/raw?se=2025-09-28T16%3A26%3A53Z&sp=r&sv=2024-08-04&sr=b&scid=9db15001-ac35-53d8-b88b-c2b5837b1401&skoid=b928fb90-500a-412f-a661-1ece57a7c318&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-28T15%3A21%3A52Z&ske=2025-09-29T15%3A21%3A52Z&sks=b&skv=2024-08-04&sig=pvI62O4CCyWsxhDyzXpydQs5TZfJaLATjkO0fCoAOX8%3D",
      metadata: {},
    };

    // try {
    //   const response = await fetch(
    //     "https://api.openai.com/v1/images/generations",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //       },
    //       body: JSON.stringify({
    //         model: "gpt-image-1",
    //         prompt,
    //         size: size || "1024x1024",
    //       }),
    //     }
    //   );

    //   if (!response.ok) {
    //     console.warn("OpenAI Images API error:", response);
    //     return { error: "Impossibile generare l’immagine al momento." };
    //   }

    //   const result = await response.json();
    //   return {
    //     imageUrl: result.data?.[0]?.url || null,
    //     metadata: result,
    //   };
    // } catch (err) {
    //   console.error("generateImage error:", err);
    //   return {
    //     error: "Si è verificato un errore nella generazione dell’immagine.",
    //   };
    // }
  },
});
