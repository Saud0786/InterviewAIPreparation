import Question from '../models/Question.js';
import Session from '../models/Session.js';

export const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    }

    if (!Array.isArray(questions)) {
      return res.status(400).json({ success: false, message: "Questions must be an array" });
    }

    const session = await Session.create({
      user: req.user.id,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionIds = await Promise.all(
      questions.map(q =>
        Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        }).then(qDoc => qDoc._id)
      )
    );

    session.questions = questionIds;
    await session.save();

    const populatedSession = await Session.findById(session._id).populate('questions');

    return res.status(201).json({ success: true, session: populatedSession });
  } catch (error) {
    console.error("Error creating session:", error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
};

export const getMySessions = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    }

    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");

    return res.status(200).json({ success: true, sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      });

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    return res.status(200).json({ success: true, session });
  } catch (error) {
    console.error("Error fetching session:", error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
};

export const deleteSession = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    }

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    // Check if the user is authorized to delete this session
    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this session",
      });
    }

    // Delete associated questions
    await Question.deleteMany({ session: session._id });

    // Delete the session
    await session.deleteOne();

    return res.status(200).json({ success: true, message: "Session deleted successfully" });
  } catch (error) {
    console.error("Error deleting session:", error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
};
