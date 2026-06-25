const { generateResponse } = require('../ai-client');

const SYSTEM_PROMPT = `You are a senior USA e-commerce product trend AI for Amazon/Shopify sellers.
Analyze product trends, draft Amazon-style listings, recommend winning items.
Provide: trend score, listing title, bullet points, description, keywords, pricing strategy.
Be data-driven and conversion-focused.`;

const EXAMPLES = [
  { id: 1, text: 'Best laptop deals under $800 for students' },
  { id: 2, text: 'Trending kitchen gadgets for Amazon FBA' },
  { id: 3, text: 'Write a product listing for wireless earbuds' },
  { id: 4, text: 'What smart home products are trending this season?' },
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

  const output = await generateResponse(task, SYSTEM_PROMPT + '\nGenerate a complete Amazon product listing with all sections.');
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
