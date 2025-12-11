"use client";

import React, { useState, useEffect } from "react";
import { CVData, PersonalInfo, Education, Experience, Skill } from "@/lib/types";
import Template02 from "./Template02";
import MobilePreviewModal from "./MobilePreviewModal";

interface FormWizardProps {
  data: CVData;
  onChange: (data: CVData) => void;
  onShowPreview: () => void;
}

type Step = {
  id: string;
  title: string;
  fields: string[];
  component: React.ReactNode;
};

export default function FormWizard({
  data,
  onChange,
  onShowPreview,
}: FormWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedInputs, setCompletedInputs] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Count completed inputs
  useEffect(() => {
    let count = 0;
    
    // Personal Info
    if (data.personalInfo.firstName) count++;
    if (data.personalInfo.lastName) count++;
    if (data.personalInfo.email) count++;
    if (data.personalInfo.phone) count++;
    if (data.personalInfo.address) count++;
    if (data.personalInfo.city) count++;
    if (data.personalInfo.country) count++;
    
    // Summary
    if (data.summary) count++;
    
    // Education
    data.education.forEach((edu) => {
      if (edu.degree) count++;
      if (edu.institution) count++;
      if (edu.startDate) count++;
      if (edu.endDate) count++;
    });
    
    // Experience
    data.experience.forEach((exp) => {
      if (exp.title) count++;
      if (exp.company) count++;
      if (exp.startDate) count++;
      if (exp.endDate) count++;
      if (exp.description) count++;
    });
    
    // Skills
    data.skills.forEach((skill) => {
      if (skill.name) count++;
    });
    
    setCompletedInputs(count);
  }, [data]);

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const updateSummary = (value: string) => {
    onChange({ ...data, summary: value });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      achievements: [],
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string | string[]
  ) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "intermediate",
    };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onChange({
      ...data,
      skills: data.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    });
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((skill) => skill.id !== id),
    });
  };

  // Create all field components - grouped by 3
  const allFields: Array<{
    id: string;
    title: string;
    component: React.ReactNode;
  }> = [
    {
      id: "firstName",
      title: "نام",
      component: (
        <div>
          <label className="block text-sm font-medium mb-1">نام</label>
          <input
            type="text"
            value={data.personalInfo.firstName}
            onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
      ),
    },
    {
      id: "lastName",
      title: "نام خانوادگی",
      component: (
        <div>
          <label className="block text-sm font-medium mb-1">نام خانوادگی</label>
          <input
            type="text"
            value={data.personalInfo.lastName}
            onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
      ),
    },
    {
      id: "email",
      title: "ایمیل",
      component: (
        <div>
          <label className="block text-sm font-medium mb-1">ایمیل</label>
          <input
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => updatePersonalInfo("email", e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
      ),
    },
    {
      id: "phone",
      title: "تلفن",
      component: (
        <div>
          <label className="block text-sm font-medium mb-1">تلفن</label>
          <input
            type="tel"
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
      ),
    },
    {
      id: "address",
      title: "آدرس",
      component: (
        <div>
          <label className="block text-sm font-medium mb-1">آدرس</label>
          <input
            type="text"
            value={data.personalInfo.address}
            onChange={(e) => updatePersonalInfo("address", e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
      ),
    },
    {
      id: "city",
      title: "شهر",
      component: (
        <div>
          <label className="block text-sm font-medium mb-1">شهر</label>
          <input
            type="text"
            value={data.personalInfo.city}
            onChange={(e) => updatePersonalInfo("city", e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
      ),
    },
    {
      id: "country",
      title: "کشور",
      component: (
        <div>
          <label className="block text-sm font-medium mb-1">کشور</label>
          <input
            type="text"
            value={data.personalInfo.country}
            onChange={(e) => updatePersonalInfo("country", e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
      ),
    },
    {
      id: "summary",
      title: "خلاصه حرفه‌ای",
      component: (
        <div>
          <label className="block text-sm font-medium mb-1">خلاصه حرفه‌ای</label>
          <textarea
            value={data.summary}
            onChange={(e) => updateSummary(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="خلاصه حرفه‌ای خود را بنویسید..."
          />
        </div>
      ),
    },
  ];

  // Group fields into steps of 3
  const steps: Step[] = [];
  for (let i = 0; i < allFields.length; i += 3) {
    const fieldsGroup = allFields.slice(i, i + 3);
    steps.push({
      id: `step-${i / 3 + 1}`,
      title: `مرحله ${i / 3 + 1}`,
      fields: fieldsGroup.map((f) => f.id),
      component: (
        <div className="space-y-4">
          <div className="space-y-3">
            {fieldsGroup.map((field) => (
              <div key={field.id}>{field.component}</div>
            ))}
          </div>
        </div>
      ),
    });
  }

  // Add education, experience, and skills as separate steps
  steps.push({
    id: "education",
    title: "تحصیلات",
    fields: ["education"],
    component: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">تحصیلات</h2>
            <button
              onClick={addEducation}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              + افزودن
            </button>
          </div>
          {data.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border border-gray-200 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">تحصیلات #{index + 1}</h3>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  حذف
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">مدرک</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">موسسه</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">تاریخ شروع</label>
                    <input
                      type="text"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      placeholder="مثال: 2018"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">تاریخ پایان</label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      placeholder="مثال: 2022"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    });

  steps.push({
    id: "experience",
    title: "تجربه کاری",
    fields: ["experience"],
    component: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">تجربه کاری</h2>
            <button
              onClick={addExperience}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              + افزودن
            </button>
          </div>
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border border-gray-200 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">تجربه #{index + 1}</h3>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  حذف
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">عنوان شغل</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">شرکت</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">تاریخ شروع</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      placeholder="مثال: Jan 2020"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">تاریخ پایان</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      placeholder="مثال: Present"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">توضیحات</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    });

  steps.push({
    id: "skills",
    title: "مهارت‌ها",
    fields: ["skills"],
    component: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">مهارت‌ها</h2>
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              + افزودن
            </button>
          </div>
          {data.skills.map((skill, index) => (
            <div key={skill.id} className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">نام مهارت</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium mb-1">سطح</label>
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  <option value="beginner">مبتدی</option>
                  <option value="intermediate">متوسط</option>
                  <option value="advanced">پیشرفته</option>
                  <option value="expert">متخصص</option>
                </select>
              </div>
              <button
                onClick={() => removeSkill(skill.id)}
                className="text-red-600 hover:text-red-800 px-2 py-2"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      ),
    });

  return (
    <>
      {/* Step Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            مرحله {currentStep + 1} از {steps.length}
          </span>
          <span className="text-sm text-gray-600">
            {completedInputs} فیلد تکمیل شده
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gray-800 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 min-h-[400px]">
        {steps[currentStep].component}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          قبلی
        </button>
        <button
          onClick={() => {
            if (currentStep < steps.length - 1) {
              // Show preview before moving to next step
              if (isMobile) {
                setShowPreview(true);
                setTimeout(() => {
                  setShowPreview(false);
                  setCurrentStep(currentStep + 1);
                }, 3000);
              } else {
                setCurrentStep(currentStep + 1);
              }
            }
          }}
          disabled={currentStep === steps.length - 1}
          className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          بعدی
        </button>
      </div>

      {/* Auto Preview Modal (Mobile) */}
      {isMobile && showPreview && (
        <MobilePreviewModal
          data={data}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}

