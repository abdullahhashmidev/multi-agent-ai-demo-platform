import AgentPage from '../../components/AgentPage';

export default function Demo2() {
  return (
    <AgentPage
      demoId={2}
      title="Real Estate Lead Agent"
      description="Lead qualification, property matching, market insights for USA real estate"
      placeholder="Describe property requirement or lead..."
      taskPlaceholder="Enter lead analysis task..."
      accentColor="bg-emerald-600"
      emoji="🏠"
    />
  );
}
