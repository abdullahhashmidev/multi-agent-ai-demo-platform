import AgentPage from '../../components/AgentPage';

export default function Demo5() {
  return (
    <AgentPage
      demoId={5}
      title="Job Recruitment Agent"
      description="CV screening, job descriptions, interview questions for tech roles"
      placeholder="Describe job requirement or candidate..."
      taskPlaceholder="Task: screen senior Python developer candidate..."
      accentColor="bg-cyan-600"
      emoji="💼"
    />
  );
}
