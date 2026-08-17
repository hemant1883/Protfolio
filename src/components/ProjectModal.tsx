import { ArrowUpRight, CheckCircle2, ExternalLink, Github, X } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card project-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {project.imageUrl && (
          <div className="modal-cover-wrap">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="modal-cover-img"
              referrerPolicy="no-referrer"
            />
            <div className="modal-cover-overlay">
              <span className="modal-category-badge">{project.category}</span>
              {project.status && <span className="modal-status-badge">{project.status}</span>}
            </div>
          </div>
        )}

        <div className="modal-body-content">
          <h2 className="modal-project-title">{project.title}</h2>
          <p className="modal-project-date">{project.date}</p>

          <p className="modal-project-desc">{project.description}</p>

          {project.longDescription && (
            <div className="modal-section-block">
              <h3>System Architecture & Implementation</h3>
              <p>{project.longDescription}</p>
            </div>
          )}

          <div className="modal-section-block">
            <h3>Technology Stack</h3>
            <div className="modal-tag-list">
              {project.technologies.map((tech) => (
                <span key={tech} className="modal-tech-tag">
                  <CheckCircle2 size={12} /> {tech}
                </span>
              ))}
            </div>
          </div>

          {project.result && (
            <div className="modal-highlight-box">
              <span className="highlight-label">Key Achievement</span>
              <p className="highlight-value">{project.result}</p>
            </div>
          )}

          <div className="modal-action-footer">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="button primary"
              >
                <Github size={16} /> View on GitHub <ArrowUpRight size={16} />
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="button secondary"
              >
                <ExternalLink size={16} /> Live Preview
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
