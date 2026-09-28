import React from 'react';
import { profileData } from '../data/profile';
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-identity">
          <span className="footer-name">{profileData.name}</span>
          <p className="footer-title">{profileData.title}</p>
        </div>

        <div className="footer-social-links" aria-label="Social and contact links">
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener"
            className="footer-social-link"
            aria-label="GitHub profile"
          >
            <GithubIcon size={18} />
            <span>GitHub</span>
          </a>

          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener"
            className="footer-social-link"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon size={18} />
            <span>LinkedIn</span>
          </a>

          <a
            href={`mailto:${profileData.email}`}
            className="footer-social-link"
            aria-label="Send email"
          >
            <MailIcon size={18} />
            <span>Email</span>
          </a>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} {profileData.name}. All rights reserved.
          </p>
          <p className="footer-note">
            Built with React &amp; Modern CSS. Focused on clean code and practical engineering.
          </p>
        </div>
      </div>
    </footer>
  );
}
