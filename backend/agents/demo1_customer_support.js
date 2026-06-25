const { generateResponse } = require('../ai-client');

const SYSTEM_PROMPT = `You are a senior USA SaaS customer support AI for a tech company.
Classify complaints into: billing, technical, refund, general.
Create Zendesk-style tickets. Be professional, empathetic, and solution-focused.
Always provide: ticket number, category, resolution steps, ETA.`;

const EXAMPLES = [
  { id: 1, text: 'My billing is wrong, I was charged twice' },
  { id: 2, text: 'App is not loading, I get a 500 error' },
  { id: 3, text: 'I want to cancel and get a refund' },
  { id: 4, text: 'How do I upgrade my plan?' },
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

  const output = await generateResponse(task, SYSTEM_PROMPT + '\nThis is an automated task run. Provide detailed workflow output.');
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
