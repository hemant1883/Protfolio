import { ArrowUp } from 'lucide-react';
import { Profile } from '../types';

interface FooterProps {
  profile: Profile;
}

export function Footer({ profile }: FooterProps) {
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
          Crafted with React, TypeScript & Tailwind CSS
        </span>
      </div>

      <div className="footer-right">
        <button onClick={scrollToTop} className="back-to-top-btn" title="Back to top">
          Top <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
