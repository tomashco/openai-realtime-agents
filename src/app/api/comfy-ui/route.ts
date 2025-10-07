import { NextRequest, NextResponse } from "next/server";
import { ComfyUIClient, LogLevel } from "comfyui-sdk";

// Proxy endpoint for the OpenAI Responses API
export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const simpleWorkflow = {
    3: {
      inputs: {
        seed: 621113468789119,
        steps: 20,
        cfg: 8,
        sampler_name: "euler",
        scheduler: "normal",
        denoise: 1,
        model: ["4", 0],
        positive: ["6", 0],
        negative: ["7", 0],
        latent_image: ["5", 0],
      },
      class_type: "KSampler",
      _meta: {
        title: "KSampler",
      },
    },
    4: {
      inputs: {
        ckpt_name: "v1-5-pruned-emaonly-fp16.safetensors",
      },
      class_type: "CheckpointLoaderSimple",
      _meta: {
        title: "Load Checkpoint",
      },
    },
    5: {
      inputs: {
        width: 512,
        height: 512,
        batch_size: 1,
      },
      class_type: "EmptyLatentImage",
      _meta: {
        title: "Empty Latent Image",
      },
    },
    6: {
      inputs: {
        text: prompt,
        clip: ["4", 1],
      },
      class_type: "CLIPTextEncode",
      _meta: {
        title: "CLIP Text Encode (Prompt)",
      },
    },
    7: {
      inputs: {
        text: "text, watermark",
        clip: ["4", 1],
      },
      class_type: "CLIPTextEncode",
      _meta: {
        title: "CLIP Text Encode (Prompt)",
      },
    },
    8: {
      inputs: {
        samples: ["3", 0],
        vae: ["4", 2],
      },
      class_type: "VAEDecode",
      _meta: {
        title: "VAE Decode",
      },
    },
    9: {
      inputs: {
        filename_prefix: "ComfyUI",
        images: ["8", 0],
      },
      class_type: "SaveImage",
      _meta: {
        title: "Save Image",
      },
    },
  };

  const client = new ComfyUIClient({
    baseUrl: "http://localhost:8000", // ComfyUI server URL
    // apiKey: 'your-api-key-here', // Optional API key
    timeout: 90_000, // Request timeout (ms)
    logging: true, // Enable logging
    logLevel: LogLevel.INFO, // Adjust log verbosity
  });

  try {
    const artifacts = await client.run(simpleWorkflow);

    // Convert the binary buffer to a base64 string
    // @ts-expect-error toString expect parameter
    const base64 = (artifacts?.[0]?.payload as BinaryType).toString("base64");

    // Create a data URL that browsers can render
    const dataUrl = `data:image/png;base64,${base64}`;

    console.log("🚀 ~ POST ~ metadata:", artifacts?.[0].manifest);
    return NextResponse.json({
      imageUrl: dataUrl,
      metadata: { ...artifacts?.[0]?.manifest },
    });
  } catch (err) {
    console.log("🚀 ~ POST ~ err:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
