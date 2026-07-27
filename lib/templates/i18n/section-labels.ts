export type TemplateLocale = "ar" | "fa" | "en";

export type CenteredRtlSectionKey = "education" | "experience" | "skills";

export const CENTERED_RTL_SECTION_LABELS: Record<
  TemplateLocale,
  Record<CenteredRtlSectionKey, string>
> = {
  ar: {
    education: "التعليم",
    experience: "الخبرات المهنية",
    skills: "المهارات",
  },
  fa: {
    education: "تحصیلات",
    experience: "سوابق کاری",
    skills: "مهارت‌ها",
  },
  en: {
    education: "Education",
    experience: "Experience",
    skills: "Skills",
  },
};
