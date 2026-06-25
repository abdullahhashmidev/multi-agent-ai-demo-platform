import Link from 'next/link';

const agents = [
  {
    id: 1,
    name: 'Customer Support Agent',
    desc: 'Zendesk-style complaint handling with ticket classification',
    color: 'from-indigo-600 to-blue-600',
    border: 'border-indigo-500',
    href: '/demo/1',
    emoji: '🎧',
  },
  {
    id: 2,
    name: 'Real Estate Lead Agent',
    desc: 'Lead qualification, property matching, market insights',
    color: 'from-emerald-600 to-green-600',
    border: 'border-emerald-500',
    href: '/demo/2',
    emoji: '🏠',
  },
  {
    id: 3,
    name: 'E-commerce Product Agent',
    desc: 'Amazon-style listings, trend analysis, product recommendations',
    color: 'from-orange-600 to-amber-600',
    border: 'border-orange-500',
    href: '/demo/3',
    emoji: '🛒',
  },
  {
    id: 4,
    name: 'Social Media Content Agent',
    desc: 'TikTok, Instagram, Twitter viral content creation',
    color: 'from-pink-600 to-purple-600',
    border: 'border-pink-500',
    href: '/demo/4',
    emoji: '📱',
  },
  {
    id: 5,
    name: 'Job Recruitment Agent',
    desc: 'CV screening, job descriptions, interview questions',
    color: 'from-cyan-600 to-teal-600',
    border: 'border-cyan-500',
    href: '/demo/5',
    emoji: '💼',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <p className="text-indigo-400 text-sm font-mono tracking-widest mb-2">
            AI-AGENTS-USA-MULTI-DEMO
          </p>
          <h1 className="text-5xl font-bold text-white mb-4">
            Multi-Agent Dashboard
          </h1>
          <p className="text-slate-400 text-lg">
            5 specialized AI agents powered by Groq + qwen3-32b
          </p>
        </div>

        {/* Agent Cards */}
        <div className="grid gap-4">
          {agents.map((agent) => (
            <Link key={agent.id} href={agent.href}>
              <div className={`bg-slate-900 border ${agent.border} border-opacity-50 rounded-xl p-6 hover:bg-slate-800 transition-all cursor-pointer group`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {agent.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-slate-500 text-sm font-mono">Demo {agent.id}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                      <span className="text-green-400 text-xs">Live</span>
                    </div>
                    <h2 className="text-white text-xl font-semibold group-hover:text-indigo-300 transition-colors">
                      {agent.name}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">{agent.desc}</p>
                  </div>
                  <div className="text-slate-600 group-hover:text-white transition-colors text-2xl">
                    →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-slate-600 text-sm mt-8">
          Powered by Groq API • qwen/qwen3-32b
        </p>
      </div>
    </div>
  );
}
