const { generateResponse } = require('../ai-client');

const SYSTEM_PROMPT = `You are a senior USA real estate lead qualification AI.
Analyze buyer/seller leads. Score them 1-100. Identify budget, location, timeline.
Provide: lead score, property recommendations, follow-up strategy, market insights.
Be professional and data-driven.`;

const EXAMPLES = [
  { id: 1, text: '3 bedroom house in Austin Texas under $500k' },
  { id: 2, text: 'Looking to sell my condo in Miami, whats the market like?' },
  { id: 3, text: 'First time buyer, budget $350k, need good schools nearby' },
  { id: 4, text: 'Investment property with good rental yield in Phoenix' },
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

  const output = await generateResponse(task, SYSTEM_PROMPT + '\nGenerate a detailed lead report with market analysis.');
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
