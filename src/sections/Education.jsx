import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import { educationData } from '../data/education';
import { GraduationIcon, CalendarIcon } from '../components/Icons';

export default function Education() {
  const [activeEduId, setActiveEduId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeEduId) {
        setActiveEduId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEduId]);

  const toggleEdu = (id) => {
    setActiveEduId(activeEduId === id ? null : id);
  };

  return (
    <section id="education" className="section education-section" aria-label="Education History">
      <div className="container centered-section-container">
        <SectionHeading title="Education" />

        <div className="education-list">
          {educationData.map((edu) => {
            const isExpanded = activeEduId === edu.id;
            return (
              <div key={edu.id} className="education-entry-item">
                <button
                  type="button"
                  className={`education-trigger-btn ${isExpanded ? 'is-active' : ''}`}
                  onClick={() => toggleEdu(edu.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`education-panel-${edu.id}`}
                >
                  <div className="edu-trigger-info">
                    <span className="edu-trigger-heading">{edu.heading}:</span>
                    <span className="edu-trigger-summary"> {edu.summary}</span>
                  </div>
                  <span className="edu-trigger-indicator" aria-hidden="true">
                    {isExpanded ? '−' : '+'}
                  </span>
                </button>

                <div
                  className={`expandable-panel-wrapper ${isExpanded ? 'is-expanded' : ''}`}
                  aria-hidden={!isExpanded}
                >
                  <div className="expandable-panel-inner" inert={!isExpanded ? "" : undefined}>
                    <div
                      id={`education-panel-${edu.id}`}
                      className="inline-detail-panel education-detail-panel"
                      role="region"
                      aria-label={`${edu.heading} details`}
                    >
                      <div className="panel-header">
                        <div className="panel-meta-row">
                          <span className="panel-meta-item">
                            <GraduationIcon size={16} aria-hidden="true" />
                            <strong>Institution:</strong> {edu.institution}
                          </span>
                          <span className="panel-meta-item">
                            <CalendarIcon size={14} aria-hidden="true" />
                            <strong>Year:</strong> {edu.timeline}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="panel-close-btn"
                          onClick={() => setActiveEduId(null)}
                          aria-label="Close education details"
                        >
                          &times; Close
                        </button>
                      </div>

                      <div className="panel-body-content">
                        <p className="edu-detail-text">{edu.details}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
