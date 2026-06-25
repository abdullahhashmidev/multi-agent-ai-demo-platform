const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

async function generateResponse(prompt, systemPrompt) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return mockResponse(prompt, systemPrompt);

  try {
    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'qwen/qwen3-32b',
        temperature: 0.7,
        max_tokens: 1024,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Groq error: ${response.status} ${text}`);
    }

    const json = await response.json();
    return json.choices?.[0]?.message?.content?.trim() || 'No response generated.';
  } catch (error) {
    console.error('Groq error:', error.message);
    return mockResponse(prompt, systemPrompt);
  }
}

function mockResponse(prompt, systemPrompt) {
  return `[MOCK — Add GROQ_API_KEY]\nIntent: ${systemPrompt.split('.')[0]}.\nInput: ${prompt.slice(0, 100)}`;
}

module.exports = { generateResponse };
