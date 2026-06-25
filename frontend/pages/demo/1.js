import AgentPage from '../../components/AgentPage';

export default function Demo1() {
  return (
    <AgentPage
      demoId={1}
      title="Customer Support Agent"
      description="Zendesk-style complaint handling with ticket classification (billing, technical, refund)"
      placeholder="Enter customer complaint..."
      taskPlaceholder="Enter support workflow task..."
      accentColor="bg-indigo-600"
      emoji="🎧"
    />
  );
}
