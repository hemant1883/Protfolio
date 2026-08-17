import { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github, Layers, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category || 'Full Stack')))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => (p.category || 'Full Stack') === selectedCategory);

  return (
    <section id="projects" className="work-section container">
      <div className="section-heading">
        <div>
          <p className="section-label">02 — Selected Engineering Work</p>
          <h2>Projects with a point of view.</h2>
        </div>
        <div className="project-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="project-list">
        {filteredProjects.map((project, index) => (
          <article className="project" key={project.id || index}>
            <div className="project-number">0{index + 1}</div>

            <div className="project-content">
              <div className="project-meta-row">
                <span className="project-type">{project.category || 'Full-stack application'}</span>
                {project.featured && (
                  <span className="featured-pill">
                    <Sparkles size={11} /> Featured
                  </span>
                )}
                {project.status && <span className="status-pill">{project.status}</span>}
              </div>

              <h3
                className="project-title-clickable"
                onClick={() => onSelectProject(project)}
                title="Click to view details"
              >
                {project.title}
              </h3>

              <p>{project.description}</p>

              <div className="tag-list">
                {project.technologies.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="project-actions-row">
                <button
                  className="project-detail-btn"
                  onClick={() => onSelectProject(project)}
                >
                  <Layers size={14} /> Full Case Study
                </button>

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-ext-link"
                  >
                    Live Demo <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>

            <div className="project-side-actions">
              <a
                className="project-result"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} repository`}
              >
                <span>View repository</span>
                <strong>{project.result || 'Production Ready'}</strong>
                <div className="result-arrow-wrap">
                  <Github size={16} />
                  <ArrowUpRight size={20} />
                </div>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
