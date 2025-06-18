import "server-only";
import { GoogleGenAI } from "@google/genai";

export function getAiClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
}

export const DEFAULT_MODEL = "gemini-2.0-flash-lite";
