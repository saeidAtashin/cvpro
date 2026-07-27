import { TemplateSchema } from "./types";

export const CENTERED_RTL_SCHEMA: TemplateSchema = {
  id: "centeredRtl",
  sections: [
    {
      id: "personal",
      title: "Personal",
      titlesByLocale: { ar: "شخصي", fa: "اطلاعات شخصی", en: "Personal" },
      fields: [
        {
          id: "profilePhoto",
          label: "Profile photo",
          labelsByLocale: {
            ar: "الصورة",
            fa: "عکس",
            en: "Profile photo",
          },
          type: "file",
          path: "profilePhotoUrl",
        },
        {
          id: "fullName",
          label: "Full name",
          labelsByLocale: { ar: "الاسم", fa: "نام", en: "Full name" },
          type: "text",
          path: "fullName",
        },
        {
          id: "jobTitle",
          label: "Job title",
          labelsByLocale: {
            ar: "المسمى الوظيفي",
            fa: "عنوان شغلی",
            en: "Job title",
          },
          type: "text",
          path: "jobTitle",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      titlesByLocale: { ar: "التواصل", fa: "تماس", en: "Contact" },
      fields: [
        {
          id: "phone",
          label: "Phone",
          labelsByLocale: { ar: "الهاتف", fa: "تلفن", en: "Phone" },
          type: "text",
          path: "phone",
        },
        {
          id: "email",
          label: "Email",
          labelsByLocale: { ar: "البريد", fa: "ایمیل", en: "Email" },
          type: "email",
          path: "email",
        },
        {
          id: "address",
          label: "Address",
          labelsByLocale: { ar: "العنوان", fa: "آدرس", en: "Address" },
          type: "text",
          path: "address",
        },
      ],
    },
    {
      id: "education",
      title: "Education",
      titlesByLocale: { ar: "التعليم", fa: "تحصیلات", en: "Education" },
      fields: [
        {
          id: "education",
          label: "Education",
          labelsByLocale: { ar: "التعليم", fa: "تحصیلات", en: "Education" },
          type: "educationList",
          path: "education",
        },
      ],
    },
    {
      id: "experience",
      title: "Experience",
      titlesByLocale: {
        ar: "الخبرات المهنية",
        fa: "سوابق کاری",
        en: "Experience",
      },
      fields: [
        {
          id: "experience",
          label: "Experience",
          labelsByLocale: {
            ar: "الخبرات",
            fa: "سوابق",
            en: "Experience",
          },
          type: "jobExperienceList",
          path: "experience",
        },
      ],
    },
    {
      id: "skills",
      title: "Skills",
      titlesByLocale: { ar: "المهارات", fa: "مهارت‌ها", en: "Skills" },
      fields: [
        {
          id: "skills",
          label: "Skills",
          labelsByLocale: { ar: "المهارات", fa: "مهارت‌ها", en: "Skills" },
          type: "stringList",
          path: "skills",
        },
      ],
    },
  ],
};
