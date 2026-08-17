import { Award, CheckCircle2, ExternalLink, Calendar } from 'lucide-react';
import { Certificate } from '../types';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="certificates-section container">
      <div className="section-header-row">
        <div>
          <p className="section-label">Certifications & Accreditations</p>
          <h2>Validated Industry Competencies.</h2>
        </div>
      </div>

      <div className="certificates-grid">
        {certificates.map((cert, idx) => (
          <div className="certificate-card" key={cert.id || idx}>
            <div className="cert-badge-row">
              <span className="cert-icon-box">
                <Award size={18} />
              </span>
              <span className="cert-org">{cert.organization}</span>
            </div>

            <h3 className="cert-title">{cert.title}</h3>

            {cert.description && <p className="cert-desc">{cert.description}</p>}

            <div className="cert-footer">
              <div className="cert-meta">
                <span className="cert-date">
                  <Calendar size={12} /> {cert.issueDate}
                </span>
                {cert.credentialId && (
                  <span className="cert-id">
                    <CheckCircle2 size={12} /> ID: {cert.credentialId}
                  </span>
                )}
              </div>

              {cert.certificateUrl && (
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-verify-btn"
                >
                  Verify <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
