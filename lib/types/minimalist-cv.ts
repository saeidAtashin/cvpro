export interface MinimalistPersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
}

export interface MinimalistBio {
  birthYear: string;
  maritalStatus: string;
  militaryStatus: string;
  languageSummary: string;
}

export interface MinimalistExperience {
  id: string;
  company: string;
  dateRange: string;
  logoUrl?: string;
}

export interface MinimalistSkillCategory {
  id: string;
  title: string;
  items: string[];
}

export interface MinimalistProject {
  id: string;
  title: string;
  demoUrl?: string;
  subtitle?: string;
  description: string;
  techStack?: string;
}

export interface MinimalistCVData {
  personalInfo: MinimalistPersonalInfo;
  profilePhotoUrl: string;
  bio: MinimalistBio;
  expertise: string[];
  experience: MinimalistExperience[];
  skillCategories: MinimalistSkillCategory[];
  projects: MinimalistProject[];
}
