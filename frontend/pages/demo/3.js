import AgentPage from '../../components/AgentPage';

export default function Demo3() {
  return (
    <AgentPage
      demoId={3}
      title="E-commerce Product Agent"
      description="Amazon-style listings, trend analysis, winning product recommendations"
      placeholder="Ask for trending products or listing..."
      taskPlaceholder="Task: build listing for smart kitchen gadget..."
      accentColor="bg-orange-600"
      emoji="🛒"
    />
  );
}
