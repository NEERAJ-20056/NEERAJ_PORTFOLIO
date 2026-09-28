import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import { profileData } from '../data/profile';

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  return (
    <section id="about" className="section about-section" aria-label="About Rampally Neeraj Chary">
      <div className="container centered-section-container">
        <SectionHeading title="About Me" />

        <div className="about-content-wrapper">
          <p className="about-intro-text">
            {profileData.aboutIntro}
          </p>

          <div className="about-action-row">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-controls="about-details-panel"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          </div>

          <div
            className={`expandable-panel-wrapper ${isExpanded ? 'is-expanded' : ''}`}
            aria-hidden={!isExpanded}
          >
            <div className="expandable-panel-inner" inert={!isExpanded ? "" : undefined}>
              <div
                id="about-details-panel"
                className="inline-detail-panel"
                role="region"
                aria-label="Additional details about Rampally Neeraj Chary"
              >
                <p className="about-more-text">
                  {profileData.aboutMore}
                </p>
                <button
                  type="button"
                  className="panel-close-btn"
                  onClick={() => setIsExpanded(false)}
                  aria-label="Close additional details"
                >
                  &times; Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
