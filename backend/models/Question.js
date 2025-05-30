import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  session:{type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true},
  question: String,
  answer: String,
  notes: String,
  isPinned: {
    type: Boolean,
    default: false
  },


},{timestamps: true});


export default mongoose.model('Question', QuestionSchema);