import { useState, FormEvent } from 'react';
import { ArrowUpRight, Check, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Profile } from '../types';

interface ContactSectionProps {
  profile: Profile;
  onSendMessage: (data: { name: string; email: string; subject: string; message: string }) => Promise<boolean>;
}

export function ContactSection({ profile, onSendMessage }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please provide your name, email, and message.' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const ok = await onSendMessage(formData);
      if (ok) {
        setStatus({
          type: 'success',
          message: 'Message delivered directly to Hemant! Thank you for reaching out.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: 'Failed to send message. Please try again or email directly.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Network error. Please email directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section container">
      <div className="section-header-row">
        <div>
          <p className="section-label">05 — Contact & Collaboration</p>
          <h2>Have a problem worth solving?</h2>
        </div>
      </div>

      <p className="contact-subhead">
        Let&apos;s make something useful, considered, and built to last. Open for full-time Software Development Engineer (SDE) roles, internships, and engineering inquiries.
      </p>

      <div className="contact-layout">
        {/* Contact Form */}
        <div className="contact-form-card">
          <h3 className="form-card-title">Send a Direct Message</h3>

          {status.type === 'success' && (
            <div className="form-feedback success">
              <Check size={16} /> {status.message}
            </div>
          )}

          {status.type === 'error' && (
            <div className="form-feedback error">{status.message}</div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="contact-name">Your Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">Your Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                placeholder="e.g. SDE Opportunity / System Architecture Discussion"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Describe your project, team opening, or idea..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </div>

            <button type="submit" className="button primary form-submit-btn" disabled={loading}>
              <Send size={15} /> {loading ? 'Sending Message...' : 'Transmit Message'}
            </button>
          </form>
        </div>

        {/* Direct Contact Cards */}
        <div className="contact-info-cards">
          <a className="contact-email-card" href={`mailto:${profile.email}`}>
            <span className="email-label">Direct Email</span>
            <strong className="email-val">{profile.email}</strong>
            <div className="email-action">
              <span>Write Email</span> <ArrowUpRight size={18} />
            </div>
          </a>

          <div className="contact-meta-cards">
            {profile.phone && (
              <div className="info-badge">
                <Phone size={16} />
                <div>
                  <span className="badge-label">Phone / WhatsApp</span>
                  <span className="badge-val">{profile.phone}</span>
                </div>
              </div>
            )}

            <div className="info-badge">
              <MapPin size={16} />
              <div>
                <span className="badge-label">Location</span>
                <span className="badge-val">{profile.location || 'Dehradun, India'}</span>
              </div>
            </div>
          </div>

          <div className="socials-box">
            <span className="socials-header">Professional Networks</span>
            <div className="socials-grid">
              <a
                href="https://linkedin.com/in/hemant-singh"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/hemant1883"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://leetcode.com/iamhemant1289"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <Mail size={16} /> LeetCode
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
