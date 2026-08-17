import { useState, FormEvent, ChangeEvent } from 'react';
import {
  Award,
  Check,
  CheckCircle2,
  FileCode,
  FileText,
  FolderGit2,
  Layers,
  LogOut,
  Mail,
  Plus,
  Save,
  Trash2,
  Upload,
  User,
  X,
} from 'lucide-react';
import {
  About,
  Achievement,
  Certificate,
  Message,
  Profile,
  Project,
  ResumeData,
  Skill,
} from '../types';

interface AdminDashboardProps {
  token: string;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  profile: Profile;
  about: About;
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  achievements: Achievement[];
  messages: Message[];
  resume: ResumeData;
  onRefreshData: () => Promise<void>;
}

type TabType =
  | 'projects'
  | 'skills'
  | 'certificates'
  | 'achievements'
  | 'messages'
  | 'profile'
  | 'resume';

export function AdminDashboard({
  token,
  isOpen,
  onClose,
  onLogout,
  profile,
  about,
  skills,
  projects,
  certificates,
  achievements,
  messages,
  resume,
  onRefreshData,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  // Form states
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [editingCert, setEditingCert] = useState<Partial<Certificate> | null>(null);
  const [editingAch, setEditingAch] = useState<Partial<Achievement> | null>(null);
  const [profileForm, setProfileForm] = useState<Profile>(profile);
  const [aboutForm, setAboutForm] = useState<About>(about);
  const [resumeForm, setResumeForm] = useState<ResumeData>(resume);
  const [techInput, setTechInput] = useState('');

  if (!isOpen) return null;

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // ================= PROJECT CRUD =================
  const handleSaveProject = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.description) {
      showToast('Project title and description are required', 'error');
      return;
    }

    const techArray = techInput
      ? techInput.split(',').map((t) => t.trim()).filter(Boolean)
      : editingProject.technologies || [];

    const payload = {
      ...editingProject,
      technologies: techArray.length > 0 ? techArray : ['Java', 'React'],
      category: editingProject.category || 'Full Stack',
      status: editingProject.status || 'Completed',
      imageUrl:
        editingProject.imageUrl ||
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    };

    try {
      const isNew = !editingProject.id;
      const url = isNew ? '/api/projects' : `/api/projects/${editingProject.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save project');
      await onRefreshData();
      setEditingProject(null);
      setTechInput('');
      showToast(`Project ${isNew ? 'created' : 'updated'} successfully`);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete project');
      await onRefreshData();
      showToast('Project deleted');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // ================= SKILL CRUD =================
  const handleSaveSkill = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name) {
      showToast('Skill name is required', 'error');
      return;
    }

    const payload = {
      ...editingSkill,
      category: editingSkill.category || 'Backend',
      level: Number(editingSkill.level) || 85,
      experienceLevel: editingSkill.experienceLevel || 'Advanced',
      icon: editingSkill.icon || 'Code',
    };

    try {
      const isNew = !editingSkill.id;
      const url = isNew ? '/api/skills' : `/api/skills/${editingSkill.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save skill');
      await onRefreshData();
      setEditingSkill(null);
      showToast(`Skill ${isNew ? 'added' : 'updated'} successfully`);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!confirm('Delete this skill?')) return;
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete skill');
      await onRefreshData();
      showToast('Skill deleted');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // ================= CERTIFICATE CRUD =================
  const handleSaveCert = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingCert?.title || !editingCert?.organization) {
      showToast('Title and organization are required', 'error');
      return;
    }

    try {
      const isNew = !editingCert.id;
      const url = isNew ? '/api/certificates' : `/api/certificates/${editingCert.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingCert),
      });

      if (!res.ok) throw new Error('Failed to save certificate');
      await onRefreshData();
      setEditingCert(null);
      showToast(`Certificate ${isNew ? 'created' : 'updated'} successfully`);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteCert = async (id: number) => {
    if (!confirm('Delete this certificate?')) return;
    try {
      const res = await fetch(`/api/certificates/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete certificate');
      await onRefreshData();
      showToast('Certificate deleted');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // ================= ACHIEVEMENTS CRUD =================
  const handleSaveAch = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingAch?.title) {
      showToast('Title is required', 'error');
      return;
    }

    try {
      const isNew = !editingAch.id;
      const url = isNew ? '/api/achievements' : `/api/achievements/${editingAch.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingAch),
      });

      if (!res.ok) throw new Error('Failed to save achievement');
      await onRefreshData();
      setEditingAch(null);
      showToast(`Achievement ${isNew ? 'created' : 'updated'} successfully`);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteAch = async (id: number) => {
    if (!confirm('Delete this achievement?')) return;
    try {
      const res = await fetch(`/api/achievements/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete achievement');
      await onRefreshData();
      showToast('Achievement deleted');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // ================= MESSAGES CRUD =================
  const handleMarkRead = async (id: number) => {
    try {
      const res = await fetch(`/api/messages/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to mark read');
      await onRefreshData();
      showToast('Message marked as read');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete message');
      await onRefreshData();
      showToast('Message deleted');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // ================= PROFILE & ABOUT UPDATE =================
  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileForm),
      });
      if (!res.ok) throw new Error('Failed to update profile');

      const aboutRes = await fetch('/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(aboutForm),
      });
      if (!aboutRes.ok) throw new Error('Failed to update about');

      await onRefreshData();
      showToast('Profile & About information saved');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // ================= RESUME UPDATE & UPLOAD =================
  const handleSaveResume = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/resume', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(resumeForm),
      });
      if (!res.ok) throw new Error('Failed to update resume');
      await onRefreshData();
      showToast('Resume metadata updated');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');

      setResumeForm((prev) => ({
        ...prev,
        fileUrl: json.fileUrl,
        fileName: json.fileName,
        fileSize: json.fileSize,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      }));
      showToast('File uploaded successfully! Click "Save Resume Settings" to confirm.');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="admin-overlay">
      <div className="admin-dashboard-container">
        {/* Header */}
        <div className="admin-dash-header">
          <div className="dash-title-group">
            <h2>Portfolio Management CMS</h2>
            <span className="dash-tag">Full CRUD Engine</span>
          </div>

          <div className="dash-header-actions">
            <button className="dash-btn logout" onClick={onLogout}>
              <LogOut size={15} /> Logout
            </button>
            <button className="dash-btn close" onClick={onClose}>
              <X size={18} /> Close CMS
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`form-feedback ${feedback.type}`}>
            {feedback.type === 'success' ? <Check size={16} /> : <X size={16} />}
            {feedback.message}
          </div>
        )}

        {/* CMS Navigation Tabs */}
        <div className="dash-tabs-nav">
          <button
            className={`dash-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <FolderGit2 size={16} /> Projects ({projects.length})
          </button>
          <button
            className={`dash-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <FileCode size={16} /> Skills ({skills.length})
          </button>
          <button
            className={`dash-tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            <Award size={16} /> Honors ({achievements.length})
          </button>
          <button
            className={`dash-tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
            onClick={() => setActiveTab('certificates')}
          >
            <Layers size={16} /> Certificates ({certificates.length})
          </button>
          <button
            className={`dash-tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <Mail size={16} /> Messages ({messages.length})
            {messages.filter((m) => !m.isRead).length > 0 && (
              <span className="unread-dot">
                {messages.filter((m) => !m.isRead).length}
              </span>
            )}
          </button>
          <button
            className={`dash-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={16} /> Profile & About
          </button>
          <button
            className={`dash-tab-btn ${activeTab === 'resume' ? 'active' : ''}`}
            onClick={() => setActiveTab('resume')}
          >
            <FileText size={16} /> Resume
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="dash-tab-body">
          {/* ================= PROJECTS TAB ================= */}
          {activeTab === 'projects' && (
            <div className="dash-pane">
              <div className="pane-header">
                <div>
                  <h3>Projects Management</h3>
                  <p>Add, modify or remove engineering portfolio projects.</p>
                </div>
                <button
                  className="button primary small-btn"
                  onClick={() => {
                    setEditingProject({
                      title: '',
                      description: '',
                      longDescription: '',
                      technologies: ['Java', 'Spring Boot', 'React', 'MySQL'],
                      githubUrl: 'https://github.com/hemant1883',
                      liveDemoUrl: '',
                      imageUrl:
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
                      date: '2026',
                      category: 'Full Stack',
                      status: 'Completed',
                      featured: true,
                      result: 'Optimized response time',
                    });
                    setTechInput('Java, Spring Boot, React, MySQL');
                  }}
                >
                  <Plus size={15} /> Add New Project
                </button>
              </div>

              {/* Project Edit / Create Form */}
              {editingProject && (
                <div className="crud-form-card">
                  <div className="form-card-top">
                    <h4>{editingProject.id ? 'Edit Project' : 'New Project'}</h4>
                    <button
                      className="close-icon-btn"
                      onClick={() => setEditingProject(null)}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="crud-grid-form">
                    <div className="form-field">
                      <label>Project Title *</label>
                      <input
                        type="text"
                        value={editingProject.title || ''}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label>Category</label>
                      <select
                        value={editingProject.category || 'Full Stack'}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, category: e.target.value })
                        }
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="Backend">Backend</option>
                        <option value="Frontend">Frontend</option>
                        <option value="AI / Systems">AI / Systems</option>
                      </select>
                    </div>

                    <div className="form-field full-width">
                      <label>Short Description *</label>
                      <input
                        type="text"
                        value={editingProject.description || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="form-field full-width">
                      <label>Long Architecture & Case Study Description</label>
                      <textarea
                        rows={3}
                        value={editingProject.longDescription || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            longDescription: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>

                    <div className="form-field">
                      <label>Technologies (Comma separated)</label>
                      <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        placeholder="Java, Spring Boot 3, React, MySQL, JWT"
                      />
                    </div>

                    <div className="form-field">
                      <label>Key Result / Metric Badge</label>
                      <input
                        type="text"
                        value={editingProject.result || ''}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, result: e.target.value })
                        }
                        placeholder="40% faster queries"
                      />
                    </div>

                    <div className="form-field">
                      <label>GitHub Repository URL</label>
                      <input
                        type="url"
                        value={editingProject.githubUrl || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            githubUrl: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-field">
                      <label>Live Demo URL (Optional)</label>
                      <input
                        type="url"
                        value={editingProject.liveDemoUrl || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            liveDemoUrl: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-field full-width">
                      <label>Image Cover URL</label>
                      <input
                        type="url"
                        value={editingProject.imageUrl || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            imageUrl: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-field-checkbox">
                      <label>
                        <input
                          type="checkbox"
                          checked={editingProject.featured || false}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              featured: e.target.checked,
                            })
                          }
                        />
                        Mark as Featured Project
                      </label>
                    </div>

                    <div className="form-submit-row">
                      <button
                        type="button"
                        className="button secondary"
                        onClick={() => setEditingProject(null)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="button primary">
                        <Save size={15} /> Save Project
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Projects List Table */}
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Tech Stack</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <strong>{p.title}</strong>
                          <div className="table-sub">{p.description}</div>
                        </td>
                        <td>
                          <span className="badge-pill">{p.category}</span>
                        </td>
                        <td>
                          <div className="mini-tags">
                            {p.technologies.slice(0, 3).map((t) => (
                              <span key={t}>{t}</span>
                            ))}
                            {p.technologies.length > 3 && (
                              <span>+{p.technologies.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td>{p.featured ? '⭐️ Yes' : 'No'}</td>
                        <td>
                          <div className="table-actions">
                            <button
                              className="action-btn edit"
                              onClick={() => {
                                setEditingProject(p);
                                setTechInput(p.technologies.join(', '));
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="action-btn delete"
                              onClick={() => handleDeleteProject(p.id)}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= SKILLS TAB ================= */}
          {activeTab === 'skills' && (
            <div className="dash-pane">
              <div className="pane-header">
                <div>
                  <h3>Skills & Toolkit Management</h3>
                  <p>Configure technologies, proficiency levels, and category groupings.</p>
                </div>
                <button
                  className="button primary small-btn"
                  onClick={() =>
                    setEditingSkill({
                      name: '',
                      category: 'Backend',
                      icon: 'Server',
                      level: 90,
                      experienceLevel: 'Expert',
                    })
                  }
                >
                  <Plus size={15} /> Add Technology
                </button>
              </div>

              {editingSkill && (
                <div className="crud-form-card">
                  <div className="form-card-top">
                    <h4>{editingSkill.id ? 'Edit Technology' : 'Add Technology'}</h4>
                    <button className="close-icon-btn" onClick={() => setEditingSkill(null)}>
                      <X size={16} />
                    </button>
                  </div>
                  <form onSubmit={handleSaveSkill} className="crud-grid-form">
                    <div className="form-field">
                      <label>Technology Name *</label>
                      <input
                        type="text"
                        value={editingSkill.name || ''}
                        onChange={(e) =>
                          setEditingSkill({ ...editingSkill, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Category</label>
                      <select
                        value={editingSkill.category || 'Backend'}
                        onChange={(e) =>
                          setEditingSkill({ ...editingSkill, category: e.target.value })
                        }
                      >
                        <option value="Backend">Backend</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Database">Database</option>
                        <option value="Tools">Tools</option>
                        <option value="Programming">Programming</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Proficiency (0 - 100%)</label>
                      <input
                        type="number"
                        min="10"
                        max="100"
                        value={editingSkill.level || 85}
                        onChange={(e) =>
                          setEditingSkill({
                            ...editingSkill,
                            level: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="form-field">
                      <label>Experience Tier</label>
                      <select
                        value={editingSkill.experienceLevel || 'Advanced'}
                        onChange={(e) =>
                          setEditingSkill({
                            ...editingSkill,
                            experienceLevel: e.target.value as any,
                          })
                        }
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                    <div className="form-submit-row full-width">
                      <button
                        type="button"
                        className="button secondary"
                        onClick={() => setEditingSkill(null)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="button primary">
                        <Save size={15} /> Save Skill
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Skill</th>
                      <th>Category</th>
                      <th>Proficiency</th>
                      <th>Tier</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((s) => (
                      <tr key={s.id}>
                        <td>
                          <strong>{s.name}</strong>
                        </td>
                        <td>
                          <span className="badge-pill">{s.category}</span>
                        </td>
                        <td>
                          <div className="table-bar-wrap">
                            <span>{s.level}%</span>
                            <div className="table-bar-track">
                              <div
                                className="table-bar-fill"
                                style={{ width: `${s.level}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td>{s.experienceLevel}</td>
                        <td>
                          <div className="table-actions">
                            <button
                              className="action-btn edit"
                              onClick={() => setEditingSkill(s)}
                            >
                              Edit
                            </button>
                            <button
                              className="action-btn delete"
                              onClick={() => handleDeleteSkill(s.id)}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= HONORS & ACHIEVEMENTS TAB ================= */}
          {activeTab === 'achievements' && (
            <div className="dash-pane">
              <div className="pane-header">
                <div>
                  <h3>Honors & Achievements</h3>
                  <p>Hackathon wins, competitive coding rankings, and accolades.</p>
                </div>
                <button
                  className="button primary small-btn"
                  onClick={() =>
                    setEditingAch({
                      title: '',
                      category: 'Hackathon',
                      organization: 'Smart India Hackathon',
                      date: '2026',
                      description: '',
                      icon: 'Trophy',
                    })
                  }
                >
                  <Plus size={15} /> Add Achievement
                </button>
              </div>

              {editingAch && (
                <div className="crud-form-card">
                  <div className="form-card-top">
                    <h4>{editingAch.id ? 'Edit Achievement' : 'New Achievement'}</h4>
                    <button className="close-icon-btn" onClick={() => setEditingAch(null)}>
                      <X size={16} />
                    </button>
                  </div>
                  <form onSubmit={handleSaveAch} className="crud-grid-form">
                    <div className="form-field full-width">
                      <label>Title *</label>
                      <input
                        type="text"
                        value={editingAch.title || ''}
                        onChange={(e) =>
                          setEditingAch({ ...editingAch, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Organization / Issuer</label>
                      <input
                        type="text"
                        value={editingAch.organization || ''}
                        onChange={(e) =>
                          setEditingAch({ ...editingAch, organization: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-field">
                      <label>Date / Year</label>
                      <input
                        type="text"
                        value={editingAch.date || ''}
                        onChange={(e) =>
                          setEditingAch({ ...editingAch, date: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-field full-width">
                      <label>Description</label>
                      <textarea
                        rows={2}
                        value={editingAch.description || ''}
                        onChange={(e) =>
                          setEditingAch({ ...editingAch, description: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div className="form-field full-width">
                      <label>Proof / Verification URL</label>
                      <input
                        type="url"
                        value={editingAch.proofUrl || ''}
                        onChange={(e) =>
                          setEditingAch({ ...editingAch, proofUrl: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-submit-row full-width">
                      <button
                        type="button"
                        className="button secondary"
                        onClick={() => setEditingAch(null)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="button primary">
                        <Save size={15} /> Save
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Organization</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {achievements.map((a) => (
                      <tr key={a.id}>
                        <td>
                          <strong>{a.title}</strong>
                          <div className="table-sub">{a.description}</div>
                        </td>
                        <td>{a.organization}</td>
                        <td>{a.date}</td>
                        <td>
                          <div className="table-actions">
                            <button
                              className="action-btn edit"
                              onClick={() => setEditingAch(a)}
                            >
                              Edit
                            </button>
                            <button
                              className="action-btn delete"
                              onClick={() => handleDeleteAch(a.id)}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= CERTIFICATES TAB ================= */}
          {activeTab === 'certificates' && (
            <div className="dash-pane">
              <div className="pane-header">
                <div>
                  <h3>Certifications Management</h3>
                  <p>Credentials and professional accreditations.</p>
                </div>
                <button
                  className="button primary small-btn"
                  onClick={() =>
                    setEditingCert({
                      title: '',
                      organization: '',
                      issueDate: '2026',
                      credentialId: '',
                      certificateUrl: '',
                      description: '',
                    })
                  }
                >
                  <Plus size={15} /> Add Certificate
                </button>
              </div>

              {editingCert && (
                <div className="crud-form-card">
                  <div className="form-card-top">
                    <h4>{editingCert.id ? 'Edit Certificate' : 'New Certificate'}</h4>
                    <button className="close-icon-btn" onClick={() => setEditingCert(null)}>
                      <X size={16} />
                    </button>
                  </div>
                  <form onSubmit={handleSaveCert} className="crud-grid-form">
                    <div className="form-field">
                      <label>Certificate Title *</label>
                      <input
                        type="text"
                        value={editingCert.title || ''}
                        onChange={(e) =>
                          setEditingCert({ ...editingCert, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Issuing Organization *</label>
                      <input
                        type="text"
                        value={editingCert.organization || ''}
                        onChange={(e) =>
                          setEditingCert({ ...editingCert, organization: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Issue Date</label>
                      <input
                        type="text"
                        value={editingCert.issueDate || ''}
                        onChange={(e) =>
                          setEditingCert({ ...editingCert, issueDate: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-field">
                      <label>Credential ID</label>
                      <input
                        type="text"
                        value={editingCert.credentialId || ''}
                        onChange={(e) =>
                          setEditingCert({ ...editingCert, credentialId: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-field full-width">
                      <label>Verification URL</label>
                      <input
                        type="url"
                        value={editingCert.certificateUrl || ''}
                        onChange={(e) =>
                          setEditingCert({
                            ...editingCert,
                            certificateUrl: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-submit-row full-width">
                      <button
                        type="button"
                        className="button secondary"
                        onClick={() => setEditingCert(null)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="button primary">
                        <Save size={15} /> Save Certificate
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Organization</th>
                      <th>Date</th>
                      <th>Credential ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <strong>{c.title}</strong>
                        </td>
                        <td>{c.organization}</td>
                        <td>{c.issueDate}</td>
                        <td>{c.credentialId || 'N/A'}</td>
                        <td>
                          <div className="table-actions">
                            <button
                              className="action-btn edit"
                              onClick={() => setEditingCert(c)}
                            >
                              Edit
                            </button>
                            <button
                              className="action-btn delete"
                              onClick={() => handleDeleteCert(c.id)}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= MESSAGES INBOX TAB ================= */}
          {activeTab === 'messages' && (
            <div className="dash-pane">
              <div className="pane-header">
                <div>
                  <h3>Contact Form Inquiries</h3>
                  <p>Direct transmissions received from recruiters and visitors.</p>
                </div>
              </div>

              {messages.length === 0 ? (
                <div className="empty-state">
                  <Mail size={36} className="muted" />
                  <p>No messages received yet.</p>
                </div>
              ) : (
                <div className="messages-list">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`message-item-card ${!m.isRead ? 'unread' : ''}`}
                    >
                      <div className="message-header-row">
                        <div className="message-sender-info">
                          <strong className="sender-name">{m.name}</strong>
                          <a href={`mailto:${m.email}`} className="sender-email">
                            {m.email}
                          </a>
                          {!m.isRead && <span className="new-badge">NEW</span>}
                        </div>
                        <div className="message-meta-actions">
                          <span className="message-timestamp">
                            {new Date(m.createdAt).toLocaleDateString()}
                          </span>
                          {!m.isRead && (
                            <button
                              className="mark-read-btn"
                              onClick={() => handleMarkRead(m.id)}
                            >
                              <CheckCircle2 size={14} /> Mark Read
                            </button>
                          )}
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteMessage(m.id)}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      {m.subject && <h4 className="message-subject">{m.subject}</h4>}
                      <p className="message-body">{m.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= PROFILE & ABOUT TAB ================= */}
          {activeTab === 'profile' && (
            <div className="dash-pane">
              <div className="pane-header">
                <div>
                  <h3>Profile & Biography Editor</h3>
                  <p>Update headline, personal background, and career objectives.</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="crud-grid-form">
                <div className="form-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Headline Title</label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Primary Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Location</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, location: e.target.value })
                    }
                  />
                </div>

                <div className="form-field">
                  <label>Status Badge</label>
                  <input
                    type="text"
                    value={profileForm.status}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, status: e.target.value })
                    }
                  />
                </div>

                <div className="form-field">
                  <label>Phone / Contact Number</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  />
                </div>

                <div className="form-field full-width">
                  <label>Hero Introduction Bio</label>
                  <textarea
                    rows={3}
                    value={profileForm.heroBio}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, heroBio: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="form-field full-width">
                  <label>About Career Objective</label>
                  <textarea
                    rows={2}
                    value={aboutForm.careerObjective}
                    onChange={(e) =>
                      setAboutForm({ ...aboutForm, careerObjective: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="form-field full-width">
                  <label>Engineering Journey Story</label>
                  <textarea
                    rows={3}
                    value={aboutForm.journey}
                    onChange={(e) => setAboutForm({ ...aboutForm, journey: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-submit-row full-width">
                  <button type="submit" className="button primary">
                    <Save size={15} /> Save All Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= RESUME TAB ================= */}
          {activeTab === 'resume' && (
            <div className="dash-pane">
              <div className="pane-header">
                <div>
                  <h3>Resume Settings & File Manager</h3>
                  <p>Update PDF download links and document metadata.</p>
                </div>
              </div>

              <div className="resume-manage-box">
                <div className="resume-current-info">
                  <FileText size={28} className="text-accent" />
                  <div>
                    <h4>{resumeForm.fileName || 'Hemant Singh (Resume).pdf'}</h4>
                    <p className="muted">
                      Last Updated: {resumeForm.lastUpdated} · Size: {resumeForm.fileSize}
                    </p>
                    <a
                      href={resumeForm.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="preview-resume-link"
                    >
                      Preview Current PDF File
                    </a>
                  </div>
                </div>

                <div className="upload-box-wrapper">
                  <label className="file-upload-dropzone">
                    <Upload size={24} className="text-accent" />
                    <span>Click or drop new PDF to upload</span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden-file-input"
                    />
                  </label>
                </div>

                <form onSubmit={handleSaveResume} className="crud-grid-form">
                  <div className="form-field">
                    <label>File Display Name</label>
                    <input
                      type="text"
                      value={resumeForm.fileName}
                      onChange={(e) =>
                        setResumeForm({ ...resumeForm, fileName: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label>File URL / Path</label>
                    <input
                      type="text"
                      value={resumeForm.fileUrl}
                      onChange={(e) =>
                        setResumeForm({ ...resumeForm, fileUrl: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label>Last Updated Tag</label>
                    <input
                      type="text"
                      value={resumeForm.lastUpdated}
                      onChange={(e) =>
                        setResumeForm({ ...resumeForm, lastUpdated: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label>File Size</label>
                    <input
                      type="text"
                      value={resumeForm.fileSize}
                      onChange={(e) =>
                        setResumeForm({ ...resumeForm, fileSize: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-submit-row full-width">
                    <button type="submit" className="button primary">
                      <Save size={15} /> Save Resume Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
