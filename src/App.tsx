import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { SkillsSection } from './components/SkillsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { AdminModal } from './components/AdminModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { PortfolioData, Project } from './types';

export default function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Admin CMS state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminToken, setAdminToken] = useState<string>(() => {
    return localStorage.getItem('portfolio_admin_token') || '';
  });

  const isAdmin = Boolean(adminToken);

  // Fetch full portfolio data
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load portfolio data from backend:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle contact message
  const handleSendMessage = async (msg: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });
      if (res.ok) {
        // Refresh local data to show new message in admin if open
        fetchData();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error sending message:', err);
      return false;
    }
  };

  // Admin login handler
  const handleLoginSuccess = (token: string) => {
    setAdminToken(token);
    localStorage.setItem('portfolio_admin_token', token);
    setIsAdminOpen(false);
  };

  // Admin logout handler
  const handleLogoutAdmin = () => {
    setAdminToken('');
    localStorage.removeItem('portfolio_admin_token');
  };

  if (loading || !data) {
    return (
      <div className="site-loading-screen">
        <div className="loader-box">
          <div className="loader-brand">
            HS<span>.</span>
          </div>
          <p>Booting Spring Boot & Node.js Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <Navbar
        profile={data.profile}
        resume={data.resume}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isAdmin={isAdmin}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onLogoutAdmin={handleLogoutAdmin}
      />

      <main>
        <Hero profile={data.profile} resume={data.resume} />
        <AboutSection about={data.about} />
        <ProjectsSection
          projects={data.projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />
        <SkillsSection skills={data.skills} />
        <AchievementsSection achievements={data.achievements} />
        <CertificatesSection certificates={data.certificates} />
        <ContactSection
          profile={data.profile}
          onSendMessage={handleSendMessage}
        />
      </main>

      <Footer
        profile={data.profile}
        isAdmin={isAdmin}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Admin Login Modal */}
      <AdminModal
        isOpen={isAdminOpen && !isAdmin}
        onClose={() => setIsAdminOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Full Admin CMS Dashboard */}
      {isAdmin && (
        <AdminDashboard
          token={adminToken}
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          onLogout={handleLogoutAdmin}
          profile={data.profile}
          about={data.about}
          skills={data.skills}
          projects={data.projects}
          certificates={data.certificates}
          achievements={data.achievements}
          messages={data.messages}
          resume={data.resume}
          onRefreshData={fetchData}
        />
      )}
    </div>
  );
}
