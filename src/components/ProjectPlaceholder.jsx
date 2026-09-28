import React, { useState } from 'react';

/**
 * ProjectPlaceholder: Neutral CSS-generated visual for projects.
 * Supports real image rendering if an image file exists.
 * Does NOT display internal file paths, fake screenshots, or fake charts.
 */
export default function ProjectPlaceholder({ title, image }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const hasCustomImage = image && !imgFailed;

  return (
    <div className="project-media-wrapper" aria-hidden="true">
      {hasCustomImage && (
        <img
          src={image}
          alt={title}
          className={`project-custom-img ${imgLoaded ? 'is-loaded' : 'is-loading'}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgFailed(true)}
        />
      )}

      {(!hasCustomImage || !imgLoaded) && (
        <div className="project-placeholder-visual">
          <div className="placeholder-pattern" />
          <div className="placeholder-content">
            <span className="placeholder-badge">Project</span>
            <div className="placeholder-title">{title}</div>
          </div>
        </div>
      )}
    </div>
  );
}
