const { generateResponse } = require('../ai-client');

const SYSTEM_PROMPT = `You are a senior USA social media content AI for brands and influencers.
Create viral TikTok, Instagram, Twitter/X content with hooks, captions, hashtags.
Provide: platform-specific content, viral hooks, hashtag sets, posting schedule, engagement tips.
Be creative, trendy, and conversion-focused.`;

const EXAMPLES = [
  { id: 1, text: 'Instagram caption for new clothing brand launch' },
  { id: 2, text: 'Create a 7-day TikTok content calendar for a fitness brand' },
  { id: 3, text: 'Write viral Twitter thread about AI productivity tips' },
  { id: 4, text: 'LinkedIn post for B2B SaaS product launch' },
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

  const output = await generateResponse(task, SYSTEM_PROMPT + '\nCreate a complete multi-platform content campaign.');
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
