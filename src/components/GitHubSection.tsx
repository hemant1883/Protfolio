import { useState } from 'react';
import { ArrowUpRight, Code, GitFork, Github, RefreshCw, Star } from 'lucide-react';
import { GitHubStats } from '../types';

interface GitHubSectionProps {
  githubStats: GitHubStats;
  onRefresh?: () => Promise<void>;
}

export function GitHubSection({ githubStats, onRefresh }: GitHubSectionProps) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <section id="github" className="github-section container">
      <div className="section-header-row">
        <div>
          <p className="section-label">05 — Open Source & Code Activity</p>
          <h2>Live GitHub Telemetry.</h2>
        </div>
        <div className="github-actions-top">
          {onRefresh && (
            <button
              className="refresh-btn"
              onClick={handleRefresh}
              disabled={refreshing}
              title="Sync latest GitHub data"
            >
              <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Syncing...' : 'Sync Activity'}
            </button>
          )}
          <a
            href={`https://github.com/${githubStats?.username || 'hemant1883'}`}
            target="_blank"
            rel="noreferrer"
            className="github-profile-link"
          >
            <Github size={15} /> @{githubStats?.username || 'hemant1883'}{' '}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <div className="github-stats-bento">
        <div className="stat-card">
          <span className="stat-label">Public Repositories</span>
          <strong className="stat-number">{githubStats?.publicRepos || 14}</strong>
          <span className="stat-sub">Active open source projects</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Total Stars Earned</span>
          <strong className="stat-number">{githubStats?.totalStars || 185}</strong>
          <span className="stat-sub">Community recognition</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Followers & Network</span>
          <strong className="stat-number">{githubStats?.followers || 8}</strong>
          <span className="stat-sub">{githubStats?.following || 12} following</span>
        </div>
      </div>

      {githubStats?.languages && githubStats.languages.length > 0 && (
        <div className="language-breakdown-card">
          <div className="lang-bar-track">
            {githubStats.languages.map((lang) => (
              <div
                key={lang.name}
                className="lang-bar-segment"
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color || '#b7f26c',
                }}
                title={`${lang.name}: ${lang.percentage}%`}
              ></div>
            ))}
          </div>

          <div className="lang-legend">
            {githubStats.languages.map((lang) => (
              <div key={lang.name} className="lang-legend-item">
                <span
                  className="lang-dot"
                  style={{ backgroundColor: lang.color || '#b7f26c' }}
                ></span>
                <span className="lang-name">{lang.name}</span>
                <span className="lang-pct">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {githubStats?.recentRepos && githubStats.recentRepos.length > 0 && (
        <div className="recent-repos-grid">
          {githubStats.recentRepos.map((repo) => (
            <a
              key={repo.id || repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="repo-card"
            >
              <div className="repo-card-top">
                <div className="repo-title-row">
                  <Code size={16} className="text-accent" />
                  <h4 className="repo-name">{repo.name}</h4>
                </div>
                <ArrowUpRight size={16} className="repo-arrow" />
              </div>

              <p className="repo-desc">{repo.description || 'Public GitHub repository.'}</p>

              <div className="repo-footer">
                <span className="repo-lang">
                  <span className="repo-lang-dot"></span>
                  {repo.language || 'Code'}
                </span>
                <div className="repo-metrics">
                  <span title="Stars">
                    <Star size={12} /> {repo.stars || 0}
                  </span>
                  <span title="Forks">
                    <GitFork size={12} /> {repo.forks || 0}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
