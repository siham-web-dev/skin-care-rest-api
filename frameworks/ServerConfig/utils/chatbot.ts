import { GoogleGenerativeAI } from "@google/generative-ai";
import { instructions } from "./chatBotInstructions";
import dotenv from 'dotenv'
import logger from "./logger";
dotenv.config()

const apiKey: string = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

async function run(prompt: string) {
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const model = await genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: instructions,
    generationConfig: generationConfig,
  });

  const result = await model.generateContent([prompt]);
  const message: any = result.response.candidates?.[0].content.parts[0].text
  return message;
}

export default run;
