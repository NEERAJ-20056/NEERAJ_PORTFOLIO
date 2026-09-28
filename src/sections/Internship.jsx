import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import { internshipData } from '../data/internship';
import { CalendarIcon, BriefcaseIcon } from '../components/Icons';

export default function Internship() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <section id="internship" className="section internship-section" aria-label="Internship">
      <div className="container centered-section-container">
        <SectionHeading title="Internship" />

        <div className="internship-wrapper">
          <button
            type="button"
            className={`internship-trigger-card ${isOpen ? 'is-open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="internship-detail-panel"
          >
            <div className="trigger-card-content">
              <span className="trigger-icon-badge" aria-hidden="true">
                <BriefcaseIcon size={18} />
              </span>
              <span className="trigger-card-title">{internshipData.title}</span>
            </div>
            <span className="trigger-card-indicator" aria-hidden="true">
              {isOpen ? '−' : '+'}
            </span>
          </button>

          <div
            className={`expandable-panel-wrapper ${isOpen ? 'is-expanded' : ''}`}
            aria-hidden={!isOpen}
          >
            <div className="expandable-panel-inner" inert={!isOpen ? "" : undefined}>
              <div
                id="internship-detail-panel"
                className="inline-detail-panel internship-detail-panel"
                role="region"
                aria-label="Internship Details"
              >
                <div className="panel-header">
                  <div className="panel-meta-row">
                    <span className="panel-meta-item">
                      <CalendarIcon size={14} aria-hidden="true" />
                      <strong>Period:</strong> {internshipData.period}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="panel-close-btn"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close internship details"
                  >
                    &times; Close
                  </button>
                </div>

                <div className="panel-body-content">
                  <p className="internship-work-desc">{internshipData.responsibilities}</p>

                  <div className="panel-subsection">
                    <h4 className="panel-subtitle">Projects Completed</h4>
                    <ul className="panel-bullet-list">
                      {internshipData.projectsCompleted.map((project, idx) => (
                        <li key={idx} className="panel-bullet-item">
                          <span className="task-bullet" aria-hidden="true" />
                          <span>{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="panel-subsection">
                    <h4 className="panel-subtitle">Technologies</h4>
                    <div className="skills-pill-row">
                      {internshipData.technologies.map((tech, idx) => (
                        <span key={idx} className="skill-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
