import React, { useState, useRef, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import { projectsData } from '../data/projects';
import { GithubIcon, ExternalLinkIcon } from '../components/Icons';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef(null);
  const lastActiveTriggerRef = useRef(null);
  const closingTimeoutRef = useRef(null);

  const openProjectModal = (project, triggerElement) => {
    if (closingTimeoutRef.current) clearTimeout(closingTimeoutRef.current);
    lastActiveTriggerRef.current = triggerElement;
    setIsClosing(false);
    setActiveProject(project);
  };

  const closeProjectModal = () => {
    if (!dialogRef.current || !activeProject) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      if (dialogRef.current.open) dialogRef.current.close();
      setActiveProject(null);
      setIsClosing(false);
      document.body.style.overflow = '';
      if (lastActiveTriggerRef.current) lastActiveTriggerRef.current.focus();
      return;
    }

    setIsClosing(true);
    closingTimeoutRef.current = setTimeout(() => {
      if (dialogRef.current?.open) {
        dialogRef.current.close();
      }
      setActiveProject(null);
      setIsClosing(false);
      document.body.style.overflow = '';
      if (lastActiveTriggerRef.current) {
        lastActiveTriggerRef.current.focus();
      }
    }, 180);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeProject) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = '';
    }

    const handleCancel = (e) => {
      e.preventDefault();
      closeProjectModal();
    };

    const handleBackdropClick = (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeProjectModal();
      }
    };

    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('click', handleBackdropClick);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('click', handleBackdropClick);
      document.body.style.overflow = '';
      if (closingTimeoutRef.current) clearTimeout(closingTimeoutRef.current);
    };
  }, [activeProject]);

  return (
    <section id="projects" className="section projects-section" aria-label="Featured Projects">
      <div className="container centered-section-container">
        <SectionHeading title="Featured Projects" />

        <div className="projects-trigger-list" role="list">
          {projectsData.map((project) => (
            <button
              key={project.id}
              type="button"
              className="project-name-trigger-btn"
              onClick={(e) => openProjectModal(project, e.currentTarget)}
              aria-haspopup="dialog"
              aria-expanded={activeProject?.id === project.id}
            >
              <span className="project-trigger-title">{project.title}</span>
              <span className="project-trigger-action">View Details &rarr;</span>
            </button>
          ))}
        </div>

        {/* Native HTML <dialog> Modal with smooth scale & backdrop animation */}
        <dialog
          ref={dialogRef}
          className={`project-native-modal ${isClosing ? 'is-closing' : ''}`}
          aria-labelledby="modal-project-title"
        >
          {activeProject && (
            <div className="modal-inner-container">
              <header className="modal-header">
                <h3 id="modal-project-title" className="modal-title">
                  {activeProject.title}
                </h3>
                <button
                  type="button"
                  className="modal-close-icon-btn"
                  onClick={closeProjectModal}
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </header>

              <div className="modal-scrollable-body">
                <div className="modal-section">
                  <h4 className="modal-section-title">Overview</h4>
                  <p className="modal-overview-text">{activeProject.overview}</p>
                </div>

                <div className="modal-section">
                  <h4 className="modal-section-title">Key Approach</h4>
                  <p className="modal-approach-text">{activeProject.keyApproach}</p>
                </div>

                <div className="modal-section">
                  <h4 className="modal-section-title">Technologies</h4>
                  <div className="skills-pill-row">
                    {activeProject.technologies.map((tech, idx) => (
                      <span key={idx} className="skill-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {activeProject.githubUrl && (
                  <div className="modal-actions-row">
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener"
                      className="btn btn-primary btn-sm"
                    >
                      <GithubIcon size={16} />
                      <span>View on GitHub</span>
                      <ExternalLinkIcon size={14} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </dialog>
      </div>
    </section>
  );
}
