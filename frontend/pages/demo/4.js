import AgentPage from '../../components/AgentPage';

export default function Demo4() {
  return (
    <AgentPage
      demoId={4}
      title="Social Media Content Agent"
      description="TikTok, Instagram, Twitter viral content creation with hooks and hashtags"
      placeholder="Ask for platform-specific content..."
      taskPlaceholder="Task: create 7-day campaign for AI brand..."
      accentColor="bg-pink-600"
      emoji="📱"
    />
  );
}
