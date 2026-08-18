import { useState, useEffect } from 'react';
import { ArrowUpRight, Code, FileText, Github, Linkedin, MapPin, Sparkles } from 'lucide-react';
import { Profile, ResumeData } from '../types';

interface HeroProps {
  profile: Profile;
  resume: ResumeData;
}

export function Hero({ profile, resume }: HeroProps) {
  const words = profile.typingWords || [
    'Full Stack Java Developer',
    'Spring Boot Microservices',
    'React & Modern Frontend',
    'Distributed Systems Engineer',
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const fallbackImages = [
    profile.profileImageUrl,
    '/uploads/profilePic.png',
    'https://raw.githubusercontent.com/hemant1883/Protfolio/main/uploads/profilePic.png',
    'https://raw.githubusercontent.com/hemant1883/portfolio/main/uploads/profilePic.png',
  ].filter(Boolean) as string[];

  const [imgSrcIndex, setImgSrcIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (imgSrcIndex + 1 < fallbackImages.length) {
      setImgSrcIndex((prev) => prev + 1);
    } else {
      setImgError(true);
    }
  };

  useEffect(() => {
    const currentWord = words[currentWordIndex % words.length];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => prev + 1);
      } else {
        setDisplayText(
          isDeleting
            ? currentWord.substring(0, displayText.length - 1)
            : currentWord.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, words]);

  return (
    <section className="hero container" id="top">
      <div className="hero-copy">
        <div className="hero-status-row">
          <span className="status-indicator">
            <span className="status-dot"></span>
            {profile.status || 'Available for SDE Roles'}
          </span>
          <span className="location-pill">
            <MapPin size={13} /> {profile.location || 'Dehradun, India'}
          </span>
        </div>

        <h1 className="hero-heading">
          Building systems that feel <em>simple.</em>
        </h1>

        <div className="typing-container">
          <span className="typing-label">Focus —</span>
          <span className="typing-text">{displayText}</span>
          <span className="typing-cursor">|</span>
        </div>

        <p className="hero-intro">
          {profile.heroBio ||
            "I'm Hemant Singh Rana — a Java and React developer focused on scalable APIs, thoughtful interfaces, and software that holds up under real-world complexity."}
        </p>

        <div className="hero-actions">
          <a className="button primary" href="#projects">
            Explore my work <ArrowUpRight size={17} />
          </a>

          {resume?.fileUrl && (
            <a
              className="button secondary"
              href={resume.fileUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FileText size={15} /> View Resume <ArrowUpRight size={14} />
            </a>
          )}

          <a className="text-link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>

        <div className="hero-socials">
          {profile.socialLinks?.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="hero-social-item"
              title={link.platform}
            >
              {link.platform.toLowerCase().includes('git') && <Github size={16} />}
              {link.platform.toLowerCase().includes('link') && <Linkedin size={16} />}
              {link.platform.toLowerCase().includes('code') && <Code size={16} />}
              <span>{link.platform}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="hero-mark-wrapper">
        <div
          className={`hero-mark ${!imgError && fallbackImages[imgSrcIndex] ? 'hero-mark-photo' : ''}`}
          aria-label={profile.name ? `${profile.name} profile photo` : 'Hemant Singh Rana monogram'}
        >
          {!imgError && fallbackImages[imgSrcIndex] ? (
            <img
              src={fallbackImages[imgSrcIndex]}
              alt={profile.name || 'Hemant Singh Rana'}
              className="hero-profile-img"
              onError={handleImageError}
              referrerPolicy="no-referrer"
            />
          ) : (
            <>
              <span>H</span>
              <span>S</span>
            </>
          )}
          <small className="hero-mark-tag">01 / 06</small>
        </div>
        <div className="hero-stat-badge">
          <Sparkles size={16} className="text-accent" />
          <div>
            <strong>7.5 CGPA</strong>
            <span>B.Tech CSE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
