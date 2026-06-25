const { generateResponse } = require('../ai-client');

const SYSTEM_PROMPT = `You are a senior USA job recruitment AI for tech companies.
Screen candidates, match skills to roles, draft job descriptions, score CVs.
Provide: candidate score, skill match %, interview questions, salary range, hiring recommendation.
Be professional, data-driven, and bias-free.`;

const EXAMPLES = [
  { id: 1, text: 'Senior Python developer job in UK remote' },
  { id: 2, text: 'Screen this candidate: 5 years React, AWS certified, $120k expectation' },
  { id: 3, text: 'Write job description for ML Engineer at a startup' },
  { id: 4, text: 'Interview questions for a senior data analyst role' },
];

let history = [];

const getHistory = (req, res) => res.json({ items: history });
const getExamples = (req, res) => res.json({ examples: EXAMPLES });

const handleChat = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const output = await generateResponse(message, SYSTEM_PROMPT);
  const item = {
    id: `chat_${Date.now()}`,
    type: 'chat',
    input: message,
    output,
    createdAt: new Date().toISOString(),
  };
  history.unshift(item);
  res.json(item);
};

const runTask = async (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'Task required' });

  const output = await generateResponse(task, SYSTEM_PROMPT + '\nGenerate a complete recruitment report with scoring matrix.');
  const item = {
    id: `task_${Date.now()}`,
    type: 'task',
    input: task,
    output,
    createdAt: new Date().toISOString(),
  };
  history.unshift(item);
  res.json(item);
};

module.exports = { getHistory, getExamples, handleChat, runTask };
