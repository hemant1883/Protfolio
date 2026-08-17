import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { SkillsSection } from './components/SkillsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PortfolioData, Project } from './types';
import { initialPortfolioData } from './initialPortfolioData';

export default function App() {
  const [data] = useState<PortfolioData>(initialPortfolioData);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Handle Send Message (opens mailto or gives instant success feedback)
  const handleSendMessage = async (msg: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    // Construct mailto link to open sender's email client as direct dispatch option
    const mailSubject = encodeURIComponent(msg.subject || `Portfolio Inquiry from ${msg.name}`);
    const mailBody = encodeURIComponent(
      `Name: ${msg.name}\nEmail: ${msg.email}\n\nMessage:\n${msg.message}`
    );
    const mailtoUrl = `mailto:${data.profile.email}?subject=${mailSubject}&body=${mailBody}`;

    // Try opening mailto client in background
    try {
      window.location.href = mailtoUrl;
    } catch {
      // ignore
    }

    return true;
  };

  return (
    <div className="site-wrapper">
      <Navbar
        profile={data.profile}
        resume={data.resume}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main id="top">
        <Hero profile={data.profile} resume={data.resume} />
        <AboutSection about={data.about} />
        <ProjectsSection
          projects={data.projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
        <SkillsSection skills={data.skills} />
        <AchievementsSection achievements={data.achievements} />
        <CertificatesSection certificates={data.certificates} />
        <ContactSection
          profile={data.profile}
          onSendMessage={handleSendMessage}
        />
      </main>

      <Footer profile={data.profile} />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
