import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md bg-gray-800 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="p-2">{children}</div>;
};
