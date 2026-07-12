import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center rounded p-2 text-body-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:pointer-events-none";
  const variantStyles = {
    primary: "bg-primary text-on-primary hover:bg-primary/90",
    secondary: "bg-surface-variant text-on-surface-variant hover:bg-surface-variant/80",
    outline: "border border-outline-variant text-on-surface hover:bg-surface-variant/50",
    ghost: "hover:bg-surface-variant/50 text-on-surface",
  };

  return (
    <button className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
