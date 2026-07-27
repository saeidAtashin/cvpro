export interface CenteredRtlEducation {
  id: string;
  degree: string;
  institution: string;
  dateRange: string;
}

export interface CenteredRtlExperience {
  id: string;
  title: string;
  company: string;
  dateRange: string;
}

export interface CenteredRtlCVData {
  fullName: string;
  jobTitle: string;
  profilePhotoUrl: string;
  phone: string;
  email: string;
  address: string;
  education: CenteredRtlEducation[];
  experience: CenteredRtlExperience[];
  skills: string[];
}
