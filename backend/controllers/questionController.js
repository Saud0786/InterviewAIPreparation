import Question from '../models/Question.js';
import Session from '../models/Session.js';

// Add questions to a session
export const addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;
    if (!sessionId || !Array.isArray(questions) || !questions) {
      return res.status(400).json({ message: 'Invalid session ID or questions' });
    }

    const session = await Session.findById(sessionId);

    if(!session){
      return res.status(404).json({message:"Session not Found" })
    }

    // Create new Questions
    const createdQuestions = await Question.insertMany(
      questions.map((q)=>({
        session: sessionId,
        question: q.question,
        answer : q.answer,
      }))
    )

    // Update session to include new QuestionIds
    session.questions.push(...createdQuestions.map((q)=>q._id));
    await session.save();

    res.status(201).json(createdQuestions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Toggle pin on a question
export const togglePinQuestion = async (req, res) => {
  try {
    
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.isPinned = !question.isPinned; // Toggle pin status
    await question.save();
    

    res.status(200).json({ success: true,question });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update note on a question
export const updateQuestionNote = async (req, res) => {
  try {
    const { notes } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.notes = notes || ""; // Update the note
    await question.save();

    return res.status(200).json({ success: true, question }); // ✅ only one response
  } catch (error) {
    console.error('Error updating question note:', error);
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};



