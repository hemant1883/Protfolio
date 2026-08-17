import { Award, Trophy, Code, ExternalLink, Calendar } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const getIcon = (iconName?: string) => {
    const name = iconName?.toLowerCase() || '';
    if (name.includes('trophy')) return <Trophy size={20} className="text-accent" />;
    if (name.includes('code')) return <Code size={20} className="text-accent" />;
    return <Award size={20} className="text-accent" />;
  };

  return (
    <section id="achievements" className="recognition container">
      <div className="section-header-row">
        <div>
          <p className="section-label">04 — Achievements</p>
          <h2>Honors, Hackathons & Industry Milestones.</h2>
        </div>
        <span className="muted">{achievements.length} Accolades</span>
      </div>

      <div className="recognition-grid">
        {achievements.map((item, idx) => (
          <div className="recognition-card" key={item.id || idx}>
            <div className="recognition-top">
              <div className="recognition-index">0{idx + 1}</div>
              <div className="recognition-icon-wrap">{getIcon(item.icon)}</div>
            </div>

            <span className="recognition-category">{item.category}</span>
            <h3 className="recognition-title">{item.title}</h3>
            {item.organization && <p className="recognition-org">{item.organization}</p>}
            <p className="recognition-desc">{item.description}</p>

            <div className="recognition-footer">
              {item.date && (
                <span className="recognition-date">
                  <Calendar size={12} /> {item.date}
                </span>
              )}
              {item.proofUrl && (
                <a
                  href={item.proofUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="recognition-link"
                >
                  Proof / Verification <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
