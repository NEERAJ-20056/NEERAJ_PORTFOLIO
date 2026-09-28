import React, { useState } from 'react';
import profilePhoto from '../assets/profile.png';
import profileOpt from '../assets/profile-opt.webp';

/**
 * ProfilePhoto: Displays the real profile photo from src/assets/profile.png
 * with an optimized WebP derivative for instant LCP performance.
 * Styled with object-fit: cover, object-position: top center,
 * explicit dimensions, and thin frame matching both light and dark themes.
 */
export default function InitialsAvatar({
  name = "Rampally Neeraj Chary",
  initials = "RNC",
  size = 170,
  className = ""
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`profile-avatar-container ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-label={`${name} profile photo`}
    >
      {!imgError ? (
        <picture>
          <source srcSet={profileOpt} type="image/webp" />
          <img
            src={profilePhoto}
            alt={name}
            className="profile-photo-img"
            width={size}
            height={size}
            loading="eager"
            fetchpriority="high"
            decoding="async"
            onError={(e) => {
              if (!e.currentTarget.dataset.retried) {
                e.currentTarget.dataset.retried = 'true';
                e.currentTarget.src = '/profile.png';
              } else {
                setImgError(true);
              }
            }}
          />
        </picture>
      ) : (
        <div className="profile-initials-fallback" role="img" aria-label={name}>
          <span className="profile-initials-text">{initials}</span>
          <span className="profile-initials-subtext">AIML</span>
        </div>
      )}
    </div>
  );
}
