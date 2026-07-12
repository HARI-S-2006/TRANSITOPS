import React from 'react';

interface CardProps {
  indicator?: 'success' | 'warning' | 'danger' | 'primary';
  children: React.ReactNode;
  className?: string;
}

export function Card({ indicator, children, className = '' }: CardProps) {
  const indicatorClass = indicator ? `card-indicator card-indicator-${indicator}` : '';
  return (
    <div className={`card ${indicatorClass} ${className}`}>
      {children}
    </div>
  );
}
