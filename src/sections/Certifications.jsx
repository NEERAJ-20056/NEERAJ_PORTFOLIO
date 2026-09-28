import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import { certificationsData } from '../data/certifications';
import { CalendarIcon, ExternalLinkIcon, AwardIcon } from '../components/Icons';

export default function Certifications() {
  const [activeCertId, setActiveCertId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeCertId) {
        setActiveCertId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCertId]);

  const toggleCert = (id) => {
    setActiveCertId(activeCertId === id ? null : id);
  };

  return (
    <section id="certifications" className="section certifications-section" aria-label="Certifications">
      <div className="container centered-section-container">
        <SectionHeading title="Certifications" />

        <div className="certifications-list">
          {certificationsData.map((cert) => {
            const isExpanded = activeCertId === cert.id;
            return (
              <div key={cert.id} className="cert-entry-item">
                <button
                  type="button"
                  className={`cert-trigger-btn ${isExpanded ? 'is-active' : ''}`}
                  onClick={() => toggleCert(cert.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`cert-panel-${cert.id}`}
                >
                  <span className="cert-trigger-title">{cert.summaryTitle}</span>
                  <span className="cert-trigger-indicator" aria-hidden="true">
                    {isExpanded ? '−' : '+'}
                  </span>
                </button>

                <div
                  className={`expandable-panel-wrapper ${isExpanded ? 'is-expanded' : ''}`}
                  aria-hidden={!isExpanded}
                >
                  <div className="expandable-panel-inner" inert={!isExpanded ? "" : undefined}>
                    <div
                      id={`cert-panel-${cert.id}`}
                      className="inline-detail-panel cert-detail-panel"
                      role="region"
                      aria-label={`${cert.title} details`}
                    >
                      <div className="panel-header">
                        <div className="cert-detail-header-info">
                          <span className="cert-org-tag">{cert.organization}</span>
                          <h4 className="cert-detail-title">{cert.title}</h4>
                        </div>
                        <button
                          type="button"
                          className="panel-close-btn"
                          onClick={() => setActiveCertId(null)}
                          aria-label="Close certificate details"
                        >
                          &times; Close
                        </button>
                      </div>

                      <div className="cert-detail-meta">
                        <CalendarIcon size={14} aria-hidden="true" />
                        <span>{cert.date}</span>
                      </div>

                      {cert.certificateUrl && (
                        <div className="cert-detail-action">
                          <a
                            href={cert.certificateUrl}
                            target="_blank"
                            rel="noopener"
                            className="btn btn-primary btn-sm"
                          >
                            <AwardIcon size={16} />
                            <span>View Certificate</span>
                            <ExternalLinkIcon size={14} />
                          </a>
                        </div>
                      )}
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
