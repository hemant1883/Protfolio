export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
}

export interface Profile {
  name: string;
  title: string;
  subTitle: string;
  email: string;
  phone: string;
  location: string;
  profileImageUrl: string;
  heroBio: string;
  status: string;
  typingWords: string[];
  socialLinks: SocialLink[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  grade: string;
  highlights: string[];
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface About {
  headline: string;
  careerObjective: string;
  journey: string;
  education: Education[];
  quickFacts: QuickFact[];
}

export interface Skill {
  id: number;
  name: string;
  category: 'Programming' | 'Backend' | 'Frontend' | 'Database' | 'Tools' | string;
  icon: string;
  level: number;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  imageUrl: string;
  screenshots?: string[];
  date: string;
  category: 'Full Stack' | 'Backend' | 'Frontend' | 'Mobile' | 'AI / Systems' | string;
  status: 'Completed' | 'In Progress' | 'Archived';
  featured: boolean;
  result?: string;
}

export interface Certificate {
  id: number;
  title: string;
  organization: string;
  issueDate: string;
  credentialId?: string;
  certificateUrl?: string;
  imageUrl?: string;
  description?: string;
}

export interface Achievement {
  id: number;
  title: string;
  category: string;
  organization?: string;
  date?: string;
  description: string;
  proofUrl?: string;
  icon?: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface ResumeData {
  fileUrl: string;
  fileName: string;
  lastUpdated: string;
  fileSize: string;
}

export interface GitHubLanguage {
  name: string;
  percentage: number;
  color: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  updatedAt: string;
}

export interface GitHubStats {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  languages: GitHubLanguage[];
  recentRepos: GitHubRepo[];
}

export interface PortfolioData {
  users: User[];
  profile: Profile;
  about: About;
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  achievements: Achievement[];
  messages: Message[];
  resume: ResumeData;
  githubStats: GitHubStats;
}
