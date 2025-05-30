import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  togglePinQuestion,
  updateQuestionNote, // Fixed typo here
  addQuestionsToSession
} from "../controllers/questionController.js";


const router = express.Router();

// @route   POST /questions/add
// @desc    Add a new question to the session
// @access  Protected
router.post('/add', protect, addQuestionsToSession);

// @route   POST /questions/:id/pin
// @desc    Toggle pin on a question
// @access  Protected
router.post('/:id/pin', protect, togglePinQuestion);

// @route   POST /questions/:id/note
// @desc    Update a note on a question
// @access  Protected
router.post('/:id/note', protect, updateQuestionNote); // Fixed function name here too

export default router;
