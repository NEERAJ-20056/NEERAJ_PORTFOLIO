import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { profileData } from '../data/profile';
import { MailIcon, LinkedinIcon, GithubIcon, PhoneIcon, ArrowRightIcon } from '../components/Icons';

export default function Contact() {
  return (
    <section id="contact" className="section contact-section" aria-label="Let's Connect">
      <div className="container centered-section-container">
        <div className="contact-box">
          <SectionHeading title="Let's Connect" />

          <div className="contact-methods-grid">
            <a
              href={`tel:${profileData.phone}`}
              className="contact-card"
              aria-label={`Call mobile ${profileData.phone}`}
            >
              <div className="contact-card-icon">
                <PhoneIcon size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">Mobile</span>
                <span className="contact-card-value">{profileData.phone}</span>
              </div>
              <span className="contact-card-arrow" aria-hidden="true">
                <ArrowRightIcon size={16} />
              </span>
            </a>

            <a
              href={`mailto:${profileData.email}`}
              className="contact-card"
              aria-label={`Send email to ${profileData.email}`}
            >
              <div className="contact-card-icon">
                <MailIcon size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">Email</span>
                <span className="contact-card-value">{profileData.email}</span>
              </div>
              <span className="contact-card-arrow" aria-hidden="true">
                <ArrowRightIcon size={16} />
              </span>
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener"
              className="contact-card"
              aria-label="Connect on LinkedIn"
            >
              <div className="contact-card-icon">
                <LinkedinIcon size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">LinkedIn</span>
                <span className="contact-card-value">LinkedIn Profile</span>
              </div>
              <span className="contact-card-arrow" aria-hidden="true">
                <ArrowRightIcon size={16} />
              </span>
            </a>

            <a
              href={profileData.github}
              target="_blank"
              rel="noopener"
              className="contact-card"
              aria-label="Explore GitHub profile"
            >
              <div className="contact-card-icon">
                <GithubIcon size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">GitHub</span>
                <span className="contact-card-value">GitHub Profile</span>
              </div>
              <span className="contact-card-arrow" aria-hidden="true">
                <ArrowRightIcon size={16} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
