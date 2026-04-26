interface StatusBadgeProps {
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    Pending: 'bg-orange-50 text-orange-700 border-orange-200',
    'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
    Resolved: 'bg-green-50 text-green-700 border-green-200',
    Rejected: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${styles[status]}`}
    >
      {status}
    </span>
  );
}
