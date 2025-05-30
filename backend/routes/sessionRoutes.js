import express from 'express';
import { createSession, getSessionById, getMySessions, deleteSession } from '../controllers/sessionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();



// Session Routes

router.post('/create', protect, createSession); // Create a new session
router.get('/my-sessions', protect, getMySessions); // Get all sessions for the authenticated user
router.get('/:id', protect, getSessionById); // Get session by ID
router.delete('/:id', protect, deleteSession); // Delete session by ID
export default router;

