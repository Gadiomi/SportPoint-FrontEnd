// src/components/ui/button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive';
}

const buttonStyles = {
  default: 'bg-blue-500 hover:bg-blue-600 text-white',
  outline: 'border border-gray-300 text-gray-300 hover:bg-gray-800',
  destructive: 'bg-red-500 hover:bg-red-600 text-white',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md ${buttonStyles[variant]} ${className}`}
      {...props}
    />
  );
};
