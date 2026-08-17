import { useState } from 'react';
import { Coffee, Server, Shield, Layers, Globe, Palette, Database, HardDrive, GitBranch, Box, Send, Terminal, Container, Cpu, Code } from 'lucide-react';
import { Skill } from '../types';

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Helper icon resolver
  const getSkillIcon = (iconName: string, category: string) => {
    const name = iconName?.toLowerCase() || '';
    if (name.includes('coffee') || name.includes('java')) return <Coffee size={18} />;
    if (name.includes('server') || name.includes('spring')) return <Server size={18} />;
    if (name.includes('shield') || name.includes('security')) return <Shield size={18} />;
    if (name.includes('harddrive') || name.includes('jpa') || name.includes('hibernate')) return <HardDrive size={18} />;
    if (name.includes('layers') || name.includes('api')) return <Layers size={18} />;
    if (name.includes('globe') || name.includes('react')) return <Globe size={18} />;
    if (name.includes('palette') || name.includes('tailwind') || name.includes('css')) return <Palette size={18} />;
    if (name.includes('database') || name.includes('sql') || name.includes('mysql')) return <Database size={18} />;
    if (name.includes('git') || name.includes('branch')) return <GitBranch size={18} />;
    if (name.includes('box') || name.includes('maven')) return <Box size={18} />;
    if (name.includes('send') || name.includes('postman')) return <Send size={18} />;
    if (name.includes('terminal')) return <Terminal size={18} />;
    if (name.includes('container') || name.includes('docker')) return <Container size={18} />;
    if (name.includes('cpu')) return <Cpu size={18} />;
    if (category === 'Frontend') return <Globe size={18} />;
    if (category === 'Backend') return <Server size={18} />;
    if (category === 'Database') return <Database size={18} />;
    return <Code size={18} />;
  };

  const categories = ['All', 'Backend', 'Frontend', 'Database', 'Tools', 'Programming'];

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  // Grouped skills
  const groupedSkills: { [key: string]: Skill[] } = {};
  skills.forEach((s) => {
    const cat = s.category || 'Other';
    if (!groupedSkills[cat]) groupedSkills[cat] = [];
    groupedSkills[cat].push(s);
  });

  return (
    <section id="skills" className="skills-section container section-grid">
      <div className="section-intro">
        <p className="section-label">03 — Technical Arsenal</p>
        <h2>Tools I use to make things work.</h2>
        <p className="muted skill-note">
          From relational domain modeling and high-throughput Spring Boot REST microservices to responsive React component architecture, I build across the entire engineering surface.
        </p>

        <div className="skills-filter-list">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`skill-category-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-content-panel">
        {activeCategory === 'All' ? (
          <div className="skill-groups">
            {Object.entries(groupedSkills).map(([group, groupItems]) => (
              <div className="skill-group-card" key={group}>
                <div className="skill-group-header">
                  <h3>{group}</h3>
                  <span className="skill-count">{groupItems.length} technologies</span>
                </div>
                <div className="skill-grid">
                  {groupItems.map((skill) => (
                    <div className="skill-item" key={skill.id || skill.name}>
                      <div className="skill-item-top">
                        <div className="skill-icon-wrapper">
                          {getSkillIcon(skill.icon, skill.category)}
                          <span className="skill-name">{skill.name}</span>
                        </div>
                        <span className="skill-level-badge">{skill.experienceLevel || `${skill.level}%`}</span>
                      </div>
                      <div className="skill-progress-track">
                        <div
                          className="skill-progress-bar"
                          style={{ width: `${skill.level || 85}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="skill-grid single-category-grid">
            {filteredSkills.map((skill) => (
              <div className="skill-item" key={skill.id || skill.name}>
                <div className="skill-item-top">
                  <div className="skill-icon-wrapper">
                    {getSkillIcon(skill.icon, skill.category)}
                    <span className="skill-name">{skill.name}</span>
                  </div>
                  <span className="skill-level-badge">{skill.experienceLevel || `${skill.level}%`}</span>
                </div>
                <div className="skill-progress-track">
                  <div
                    className="skill-progress-bar"
                    style={{ width: `${skill.level || 85}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
