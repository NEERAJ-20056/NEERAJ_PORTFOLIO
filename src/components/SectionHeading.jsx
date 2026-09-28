import React from 'react';

export default function SectionHeading({ title, subtitle, className = "" }) {
  return (
    <div className={`section-header centered-header ${className}`.trim()}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
