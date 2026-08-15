import React from 'react';

export default function GlassCard({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}
