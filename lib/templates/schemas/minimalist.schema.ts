import { TemplateSchema } from "./types";

export const MINIMALIST_SCHEMA: TemplateSchema = {
  id: "minimalist",
  sections: [
    {
      id: "personal",
      title: "Personal & photo",
      fields: [
        {
          id: "profilePhoto",
          label: "Profile photo",
          type: "file",
          path: "profilePhotoUrl",
        },
        {
          id: "firstName",
          label: "First name",
          type: "text",
          path: "personalInfo.firstName",
        },
        {
          id: "lastName",
          label: "Last name",
          type: "text",
          path: "personalInfo.lastName",
        },
        {
          id: "jobTitle",
          label: "Job title",
          type: "text",
          path: "personalInfo.jobTitle",
          placeholder: "FRONT-END DEVELOPER",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      fields: [
        {
          id: "phone",
          label: "Phone",
          type: "text",
          path: "personalInfo.phone",
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          path: "personalInfo.email",
        },
        {
          id: "address",
          label: "Address",
          type: "text",
          path: "personalInfo.address",
        },
      ],
    },
    {
      id: "bio",
      title: "Bio",
      fields: [
        {
          id: "birthYear",
          label: "Birth year",
          type: "text",
          path: "bio.birthYear",
        },
        {
          id: "maritalStatus",
          label: "Marital status",
          type: "text",
          path: "bio.maritalStatus",
        },
        {
          id: "militaryStatus",
          label: "Military status",
          type: "text",
          path: "bio.militaryStatus",
        },
        {
          id: "languageSummary",
          label: "Language",
          type: "text",
          path: "bio.languageSummary",
          placeholder: "English 80%",
        },
      ],
    },
    {
      id: "expertise",
      title: "Expertise",
      fields: [
        {
          id: "expertise",
          label: "Expertise items",
          type: "stringList",
          path: "expertise",
        },
      ],
    },
    {
      id: "experience",
      title: "Work experience",
      fields: [
        {
          id: "experience",
          label: "Experience",
          type: "experienceList",
          path: "experience",
        },
      ],
    },
    {
      id: "skillCategories",
      title: "Skill categories",
      fields: [
        {
          id: "skillCategories",
          label: "Categories",
          type: "skillCategoryList",
          path: "skillCategories",
        },
      ],
    },
    {
      id: "projects",
      title: "Projects",
      fields: [
        {
          id: "projects",
          label: "Projects",
          type: "projectList",
          path: "projects",
        },
      ],
    },
  ],
};
