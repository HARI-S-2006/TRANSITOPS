import React from 'react';

interface BadgeProps {
  status: 'success' | 'warning' | 'danger' | 'primary';
  pill?: boolean;
  children: React.ReactNode;
}

export function Badge({ status, pill = false, children }: BadgeProps) {
  return (
    <span className={`badge badge-${status} ${pill ? 'badge-pill' : ''}`}>
      {children}
    </span>
  );
}
