const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question: { type: String, required: true },
  userAnswer: { type: String, required: true },
  score: { type: Number, required: true },
  feedback: { type: String, required: true },
});

const interviewSessionSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    answers: [answerSchema],
    totalScore: { type: Number, required: true },
    maxScore: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);