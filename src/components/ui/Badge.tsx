import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'primary';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
  const variantStyles = {
    default: 'bg-surface-variant text-on-surface-variant border-outline-variant',
    primary: 'bg-primary/20 text-primary border-primary/50',
    success: 'bg-secondary/20 text-secondary border-secondary/50',
    warning: 'bg-tertiary/20 text-tertiary border-tertiary/50',
    danger: 'bg-error/20 text-error border-error/50',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm border ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
