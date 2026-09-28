import React from 'react';
import ProjectPlaceholder from './ProjectPlaceholder';
import ActionLink from './ActionLink';
import { GithubIcon, ExternalLinkIcon } from './Icons';

export default function ProjectCard({ project }) {
  const {
    title,
    description,
    technologies = [],
    githubUrl,
    liveUrl,
    image
  } = project;

  return (
    <article className="project-card">
      <ProjectPlaceholder title={title} image={image} />

      <div className="project-card-body">
        <header className="project-header">
          <h3 className="project-title">{title}</h3>
          <p className="project-description">{description}</p>
        </header>

        <div className="project-tech-row" aria-label="Technologies used">
          <span className="project-tech-label">Technologies:</span>
          <span className="project-tech-text">
            {technologies.join(' · ')}
          </span>
        </div>

        <footer className="project-card-actions">
          <ActionLink
            href={githubUrl}
            label="View on GitHub"
            icon={<GithubIcon size={16} />}
            variant="secondary"
            className="btn-sm"
          />

          <ActionLink
            href={liveUrl}
            label="Live Demo"
            icon={<ExternalLinkIcon size={14} />}
            variant="primary"
            className="btn-sm"
            hideIfEmpty={true}
          />
        </footer>
      </div>
    </article>
  );
}
