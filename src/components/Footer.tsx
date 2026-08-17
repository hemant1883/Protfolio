import { ArrowUp, Heart, Shield } from 'lucide-react';
import { Profile } from '../types';

interface FooterProps {
  profile: Profile;
  isAdmin: boolean;
  onOpenAdmin: () => void;
}

export function Footer({ profile, isAdmin, onOpenAdmin }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer container">
      <div className="footer-left">
        <span className="copyright">
          © {new Date().getFullYear()} {profile.name || 'Hemant Singh Rana'}
        </span>
        <span className="footer-stack">
          Built with Spring Boot REST API Architecture & React 19
        </span>
      </div>

      <div className="footer-right">
        <button
          onClick={onOpenAdmin}
          className="footer-admin-btn"
          title="Open Admin CMS Portal"
        >
          <Shield size={13} /> {isAdmin ? 'CMS Logged In' : 'Admin Login'}
        </button>

        <button onClick={scrollToTop} className="back-to-top-btn" title="Back to top">
          Top <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
