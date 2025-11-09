import { ApiResponse } from "../2/types";
import OpenAi from "openai";

const openai = new OpenAi({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const AI_MODEL = "gpt-3.5-turbo";

const realAnalyzeLecture = async (text: string): Promise<ApiResponse> => {
    const prompt = `
    Analyze the following lecture transcript chunk. Your response MUST be a valid JSON object.
    Do not include any text before or after the JSON.

    Provide:
    1. "summary": A 1-2 sentence high-level summary of this chunk.
    2. "keyTerms": An array of 1-2 key technical terms. For each, provide a "term" and a "definition".
    3. "simplified": A 1-2 sentence simplified explanation ("In other words...").

    Respond using this exact JSON format:
    {
      "summary": "...",
      "keyTerms": [
        {"term": "...", "definition": "..."}
      ],
      "simplified": "..."
    }

    Transcript Chunk:
    """
    ${text}
    """
  `;

    try {
        const response = await openai.chat.completions.create({
            model: AI_MODEL,
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error("No content from AI");

        return JSON.parse(content) as ApiResponse;
    } catch (error) {
        console.log("Error analyzing chunks", error);

        return {
            summary: "Error: Could not analyze this section.",
            keyTerms: [],
            simplified: "An error occurred during simplification.",
        };
    }
};
export const mocktestapi = (text: string): Promise<ApiResponse> => {
    console.log("Mock Api response", text);

    const faketerm = text.split(" ")[2] || "concept";

    const fakeResponse: ApiResponse = {
        summary: `This section was about ${text.slice(0, 20)}...`,
        keyTerms: [
            {
                term: faketerm,
                definition: "A mock definition for this key term.",
            },
            { term: "Hackathon", definition: "haha" },
        ],
        simplified: `In simple terms, the professor just said: "${text.slice(
            0,
            30
        )}..."`,
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 1500); //1.5
    });
};

export const analyzeLecture = (text: string): Promise<ApiResponse> => {
    //APi stuff
    return realAnalyzeLecture(text);
};
