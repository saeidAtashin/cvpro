import { MinimalistCVData } from "./types/minimalist-cv";

export const defaultMinimalistCVData: MinimalistCVData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
  },
  profilePhotoUrl: "",
  bio: {
    birthYear: "",
    maritalStatus: "",
    militaryStatus: "",
    languageSummary: "",
  },
  expertise: [],
  experience: [],
  skillCategories: [],
  projects: [],
};
