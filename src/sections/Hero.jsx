import React from 'react';
import { profileData } from '../data/profile';
import InitialsAvatar from '../components/InitialsAvatar';
import { GithubIcon, LinkedinIcon, DownloadIcon, ExternalLinkIcon } from '../components/Icons';

export default function Hero() {
  return (
    <section id="home" className="section hero-section" aria-label="Hero Overview">
      <div className="container hero-container">
        <div className="hero-visual hero-animate-visual">
          <InitialsAvatar
            name={profileData.name}
            initials="RNC"
            size={170}
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-name hero-animate-name">{profileData.name}</h1>
          <p className="hero-title hero-animate-title">{profileData.title}</p>

          <p className="hero-description hero-animate-desc">{profileData.heroDescription}</p>

          <div className="hero-cta-group hero-animate-cta">
            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener"
              className="btn btn-primary hero-btn"
            >
              <span>View Resume</span>
              <ExternalLinkIcon size={15} />
            </a>

            <a
              href={profileData.resumeUrl}
              download={profileData.resumeDownloadName}
              className="btn btn-secondary hero-btn"
            >
              <DownloadIcon size={16} />
              <span>Download Resume</span>
            </a>
          </div>

          <div className="hero-social-row hero-animate-social" aria-label="Direct profile links">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener"
              className="hero-icon-link"
              aria-label="GitHub profile"
            >
              <GithubIcon size={20} />
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener"
              className="hero-icon-link"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
