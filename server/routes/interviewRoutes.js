const express = require('express');
const router = express.Router();
const InterviewSession = require('../models/InterviewSession');

router.post('/evaluate', (req, res) => {
  const { question, expectedKeywords = [], userAnswer = '' } = req.body;
  const normalized = userAnswer.toLowerCase();

  let matched = 0;
  const missing = [];

  for (const kw of expectedKeywords) {
    if (normalized.includes(kw.toLowerCase())) {
      matched += 1;
    } else {
      missing.push(kw);
    }
  }

  const keywordRatio = expectedKeywords.length ? matched / expectedKeywords.length : 1;
  const wordCount = userAnswer.trim().split(/\s+/).filter(Boolean).length;
  const depthBonus = wordCount >= 20 ? 2 : wordCount >= 10 ? 1 : 0;

  const score = Math.min(10, Math.max(1, Math.round(keywordRatio * 8) + depthBonus));
  const feedback =
    missing.length === 0
      ? 'Strong answer! You covered the key technical concepts clearly.'
      : `Good start. Try covering these key terms/concepts: ${missing.join(', ')}.`;

  res.json({ question, userAnswer, score, feedback, matchedCount: matched, wordCount });
});

router.post('/sessions', async (req, res) => {
  try {
    const session = await InterviewSession.create(req.body);
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/sessions', async (req, res) => {
  try {
    const sessions = await InterviewSession.find().sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;