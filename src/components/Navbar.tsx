import { ArrowUpRight, FileText, Menu, X } from 'lucide-react';
import { Profile, ResumeData } from '../types';

interface NavbarProps {
  profile: Profile;
  resume: ResumeData;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export function Navbar({ menuOpen, setMenuOpen, resume }: NavbarProps) {
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav-wrap">
      <nav className="nav container" aria-label="Primary navigation">
        <a className="brand" href="#top" onClick={closeMenu}>
          HS<span>.</span>
        </a>

        <button
          className="menu-button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#projects" onClick={closeMenu}>
            Work
          </a>
          <a href="#skills" onClick={closeMenu}>
            Toolkit
          </a>
          <a href="#achievements" onClick={closeMenu}>
            Achievements
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>

          {resume?.fileUrl && (
            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="nav-resume"
              onClick={closeMenu}
            >
              <FileText size={14} /> Resume
            </a>
          )}

          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Let&apos;s talk <ArrowUpRight size={16} />
          </a>
        </div>
      </nav>
    </header>
  );
}
