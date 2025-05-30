import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import { protect } from './middleware/authMiddleware.js';
import { GoogleGenAI } from '@google/genai';
import {questionAnswerPrompt,conceptExplainPrompt} from "./utils/prompts.js"

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS middleware
app.use(cors({
  origin:"*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

connectDB();

// JSON parser
app.use(express.json());
app.use(bodyParser.json());



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);



// Serve static files from uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generate = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  const rawText = response.text;

  const cleanedText = rawText
    .replace(/^```json\s*/i, "") // Remove ```json
    .replace(/```[\n\r]*$/i, "") // Remove ending ```
    .trim();

  const data = JSON.parse(cleanedText);

  // FIX: Convert escaped \\n to real newlines (if needed)
  if (data.explanation) {
    data.explanation = data.explanation.replace(/\\n/g, '\n');
  }

  return data;
};



const generateInterviewQuestions = async(req,res)=>{
   try {

     const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
     if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
     let result = await generate(prompt);
     res.status(200).json(result);
   } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to generate concept explanation." });
   }
}

const generateConceptExplanation = async(req,res)=>{
   try {

     const {question } = req.body;
     if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const prompt = conceptExplainPrompt(question);
     let result = await generate(prompt);
     res.status(200).json(result);
   } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to generate concept explanation." });
   }
}



// Routes for genrate question answer
app.post('/api/ai/generate-questions',protect,generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
