import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not set. Consultant will be disabled.");
}

const ai = apiKey ? new GoogleGenAI(apiKey) : null;

export const getStylingAdvice = async (prompt: string, history: any[] = []) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      // Fixed: Removed system context from contents and moved it to systemInstruction config parameter
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }]}
      ],
      config: {
        systemInstruction: "You are \"Jaira's Digital Consultant\", a premium virtual stylist for \"Braids By Jaira\". Your tone is warm, sophisticated, professional, and boutique-inspired. You recommend elegant braid styles (Knotless, Goddess Locs, Stitch, Fulani) based on client needs. Focus on hair health, luxury maintenance, and timeless beauty. Keep responses concise, encouraging, and high-end.",
        temperature: 0.7,
        topP: 0.9,
      }
    });

    // Fixed: response.text is a property access, not a function call
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a little trouble connecting to my style guide. Could you please try asking again in a moment, darling?";
  }
};
