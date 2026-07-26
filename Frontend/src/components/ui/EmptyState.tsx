import "./EmptyState.css";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📭</div>
      <p className="empty-state-title">{title}</p>
      {subtitle && <p className="empty-state-subtitle">{subtitle}</p>}
    </div>
  );
}

export default EmptyState;
