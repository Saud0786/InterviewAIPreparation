// import { GoogleGenAI } from "@google/genai";
// import { conceptExplainPrompt, questionAnswerPrompt } from "../utils/prompts.js";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// export const generateInterviewQuestions = async (req, res) => {
//   try {
//     const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

//     if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: prompt,
//     });

//     // Await the text if it's a Promise or a method
//     const rawText =response.text;

//     // Clean the response (remove ```json and ``` from start/end)
//     const cleanedText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();

//     const data = JSON.parse(cleanedText);

//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error in generateInterviewQuestions:", error);
//     res.status(500).json({ error: "Failed to generate interview questions." });
//   }
// };


export const generateConceptExplanation = async (req, res) => {
  try {
    // You can implement this similarly later
  } catch (error) {
    res.status(500).json({ error: "Failed to generate concept explanation." });
  }
};

