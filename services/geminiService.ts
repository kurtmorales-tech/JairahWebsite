
import { GoogleGenAI } from "@google/genai";

// Fixed: Correctly initialize GoogleGenAI with a named parameter and direct process.env.API_KEY access
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
