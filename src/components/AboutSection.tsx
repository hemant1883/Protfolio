import { GraduationCap, BookOpen, CheckCircle2 } from 'lucide-react';
import { About } from '../types';

interface AboutSectionProps {
  about: About;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="about-section container section-grid">
      <div className="section-intro">
        <p className="section-label">01 — About & Background</p>
        <h2>Engineering with clarity, curiosity, and intent.</h2>
        <p className="career-objective-pill">{about.careerObjective}</p>
      </div>

      <div className="about-copy">
        <p className="lead-text">{about.headline}</p>
        <p>{about.journey}</p>

        {about.education && about.education.length > 0 && (
          <div className="education-block">
            <h3 className="education-title">
              <GraduationCap size={18} /> Education & Academic Track
            </h3>
            <div className="education-list">
              {about.education.map((edu, idx) => (
                <div key={idx} className="education-card">
                  <div className="edu-header">
                    <div>
                      <h4 className="edu-degree">{edu.degree}</h4>
                      <p className="edu-inst">{edu.institution}</p>
                    </div>
                    <span className="edu-badge">{edu.grade}</span>
                  </div>
                  <p className="edu-duration">
                    <BookOpen size={13} /> {edu.duration}
                  </p>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="edu-tags">
                      {edu.highlights.map((h, hIdx) => (
                        <span key={hIdx} className="edu-tag">
                          <CheckCircle2 size={11} /> {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {about.quickFacts && about.quickFacts.length > 0 && (
          <div className="facts">
            {about.quickFacts.map((fact, idx) => (
              <div key={idx}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
