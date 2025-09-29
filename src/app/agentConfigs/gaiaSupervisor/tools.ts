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
        "https://images.pexels.com/photos/6009651/pexels-photo-6009651.jpeg",
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
