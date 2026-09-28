import React from 'react';
import ActionLink from './ActionLink';
import { CalendarIcon, ExternalLinkIcon, AwardIcon } from './Icons';

export default function CertificationCard({ cert }) {
  const { name, organization, date, certificateUrl, image } = cert;

  return (
    <article className="cert-card">
      <div className="cert-card-header">
        <div className="cert-badge-row">
          <span className="cert-org-badge">{organization}</span>
          <AwardIcon size={18} className="cert-icon" />
        </div>
        <h3 className="cert-name">{name}</h3>
      </div>

      <div className="cert-meta">
        <div className="cert-date">
          <CalendarIcon size={14} className="cert-meta-icon" />
          <span>{date}</span>
        </div>
      </div>

      {image && (
        <div className="cert-image-container">
          <img
            src={image}
            alt={`${name} by ${organization}`}
            className="cert-img"
            loading="lazy"
          />
        </div>
      )}

      <div className="cert-actions">
        <ActionLink
          href={certificateUrl}
          label="View Certificate"
          icon={<ExternalLinkIcon size={14} />}
          variant="secondary"
          className="btn-sm cert-btn"
        />
      </div>
    </article>
  );
}
