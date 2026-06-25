import { useState, useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function AgentPage({ demoId, title, description, placeholder, taskPlaceholder, accentColor, emoji }) {
  const [message, setMessage] = useState('');
  const [task, setTask] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [examples, setExamples] = useState([]);
  const [activeTab, setActiveTab] = useState('chat');

  useEffect(() => {
    fetchHistory();
    fetchExamples();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/demo${demoId}/history`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data.items || []);
      }
    } catch (e) {}
  };

  const fetchExamples = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/demo${demoId}/examples`);
      if (res.ok) {
        const data = await res.json();
        setExamples(data.examples || []);
      }
    } catch (e) {}
  };

  const sendChat = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch(`${API_BASE}/api/demo${demoId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setOutput(data.output || data.error || 'No response');
      setHistory(prev => [data, ...prev]);
    } catch (e) {
      setOutput('Error: ' + e.message);
    }
    setLoading(false);
  };

  const runTask = async () => {
    if (!task.trim()) return;
    setTaskLoading(true);
    setOutput('');
    try {
      const res = await fetch(`${API_BASE}/api/demo${demoId}/run-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
      });
      const data = await res.json();
      setOutput(data.output || data.error || 'No response');
      setHistory(prev => [data, ...prev]);
    } catch (e) {
      setOutput('Error: ' + e.message);
    }
    setTaskLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6 pt-4">
          <a href="/" className="text-slate-500 hover:text-slate-300 text-sm mb-4 inline-block">
            ← Back to Dashboard
          </a>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-3xl">{emoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs font-mono">Demo {demoId}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                <span className="text-green-400 text-xs">Live</span>
              </div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              <p className="text-slate-400 text-sm">{description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Left Panel */}
          <div className="lg:col-span-2 space-y-4">

            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'chat' ? `${accentColor} text-white` : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setActiveTab('task')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'task' ? `${accentColor} text-white` : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                ⚡ Run Task
              </button>
            </div>

            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3">
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 resize-none focus:outline-none focus:border-slate-500 text-sm"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={sendChat}
                    disabled={loading || !message.trim()}
                    className={`${accentColor} text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity`}
                  >
                    {loading ? '⏳ Thinking...' : '→ Send'}
                  </button>
                  {examples.length > 0 && (
                    <button
                      onClick={() => setMessage(examples[Math.floor(Math.random() * examples.length)].text)}
                      className="bg-slate-800 text-slate-400 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Try Example
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Task Tab */}
            {activeTab === 'task' && (
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3">
                <textarea
                  value={task}
                  onChange={e => setTask(e.target.value)}
                  placeholder={taskPlaceholder}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 resize-none focus:outline-none focus:border-slate-500 text-sm"
                  rows={3}
                />
                <button
                  onClick={runTask}
                  disabled={taskLoading || !task.trim()}
                  className={`${accentColor} text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity`}
                >
                  {taskLoading ? '⏳ Running...' : '⚡ Execute Task'}
                </button>
              </div>
            )}

            {/* Response Window */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
              <h3 className="text-slate-400 text-xs font-mono mb-3">RESPONSE</h3>
              {loading || taskLoading ? (
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-200"></div>
                  <span className="text-sm ml-1">AI is thinking...</span>
                </div>
              ) : output ? (
                <p className="text-slate-200 text-sm response-text leading-relaxed">{output}</p>
              ) : (
                <p className="text-slate-600 text-sm font-mono">No response yet.</p>
              )}
            </div>
          </div>

          {/* Right Panel — History */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
            <h3 className="text-slate-400 text-xs font-mono mb-3">
              HISTORY ({history.length})
            </h3>
            {history.length === 0 ? (
              <p className="text-slate-600 text-xs">No history yet.</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {history.map((item) => (
                  <div key={item.id} className="bg-slate-800 rounded-lg p-2 border border-slate-700">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs font-mono text-slate-500 uppercase">{item.type}</span>
                    </div>
                    <p className="text-slate-300 text-xs truncate">{item.input}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
