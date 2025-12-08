"use client";

import React, { useState } from "react";
import {
  CVData,
  PersonalInfo,
  Education,
  Experience,
  Skill,
  Language,
} from "@/lib/types";

interface CVEditorFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

export default function CVEditorForm({ data, onChange }: CVEditorFormProps) {
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

  const addAchievement = (expId: string) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (exp) {
      updateExperience(expId, "achievements", [
        ...(exp.achievements || []),
        "",
      ]);
    }
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (exp) {
      const achievements = [...(exp.achievements || [])];
      achievements[index] = value;
      updateExperience(expId, "achievements", achievements);
    }
  };

  const removeAchievement = (expId: string, index: number) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (exp) {
      const achievements = (exp.achievements || []).filter(
        (_, i) => i !== index
      );
      updateExperience(expId, "achievements", achievements);
    }
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

  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: "",
      level: "conversational",
    };
    onChange({ ...data, languages: [...data.languages, newLang] });
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    onChange({
      ...data,
      languages: data.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((lang) => lang.id !== id),
    });
  };

  const addCertification = () => {
    onChange({
      ...data,
      certifications: [...(data.certifications || []), ""],
    });
  };

  const updateCertification = (index: number, value: string) => {
    const certifications = [...(data.certifications || [])];
    certifications[index] = value;
    onChange({ ...data, certifications });
  };

  const removeCertification = (index: number) => {
    onChange({
      ...data,
      certifications: (data.certifications || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <section className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              value={data.personalInfo.firstName}
              onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              value={data.personalInfo.lastName}
              onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              value={data.personalInfo.address}
              onChange={(e) => updatePersonalInfo("address", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              value={data.personalInfo.city}
              onChange={(e) => updatePersonalInfo("city", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              value={data.personalInfo.country}
              onChange={(e) => updatePersonalInfo("country", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              LinkedIn (optional)
            </label>
            <input
              type="text"
              value={data.personalInfo.linkedin || ""}
              onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Website (optional)
            </label>
            <input
              type="text"
              value={data.personalInfo.website || ""}
              onChange={(e) => updatePersonalInfo("website", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Professional Summary</h2>
        <textarea
          value={data.summary}
          onChange={(e) => updateSummary(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          placeholder="Write a brief professional summary..."
        />
      </section>

      {/* Experience */}
      <section className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Professional Experience</h2>
          <button
            onClick={addExperience}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            + Add Experience
          </button>
        </div>
        {data.experience.map((exp) => (
          <div
            key={exp.id}
            className="mb-6 p-4 border border-gray-200 rounded-md"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">
                Experience #{data.experience.indexOf(exp) + 1}
              </h3>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) =>
                    updateExperience(exp.id, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(exp.id, "company", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) =>
                    updateExperience(exp.id, "location", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(exp.id, "startDate", e.target.value)
                  }
                  placeholder="e.g., Jan 2020"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateExperience(exp.id, "endDate", e.target.value)
                  }
                  placeholder="e.g., Present or Dec 2023"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={exp.description}
                onChange={(e) =>
                  updateExperience(exp.id, "description", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">
                  Achievements
                </label>
                <button
                  onClick={() => addAchievement(exp.id)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  + Add Achievement
                </button>
              </div>
              {exp.achievements?.map((achievement, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) =>
                      updateAchievement(exp.id, idx, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Achievement description"
                  />
                  <button
                    onClick={() => removeAchievement(exp.id, idx)}
                    className="text-red-600 hover:text-red-800 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Education</h2>
          <button
            onClick={addEducation}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            + Add Education
          </button>
        </div>
        {data.education.map((edu) => (
          <div
            key={edu.id}
            className="mb-6 p-4 border border-gray-200 rounded-md"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">
                Education #{data.education.indexOf(edu) + 1}
              </h3>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, "degree", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(edu.id, "institution", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) =>
                    updateEducation(edu.id, "location", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(edu.id, "startDate", e.target.value)
                  }
                  placeholder="e.g., 2018"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEducation(edu.id, "endDate", e.target.value)
                  }
                  placeholder="e.g., 2022"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Description (optional)
              </label>
              <textarea
                value={edu.description || ""}
                onChange={(e) =>
                  updateEducation(edu.id, "description", e.target.value)
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Skills</h2>
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            + Add Skill
          </button>
        </div>
        {data.skills.map((skill) => (
          <div key={skill.id} className="flex gap-4 mb-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Skill Name
              </label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
            <div className="w-48">
              <label className="block text-sm font-medium mb-1">Level</label>
              <select
                value={skill.level}
                onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-red-600 hover:text-red-800 px-2 py-2"
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      {/* Languages */}
      <section className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Languages</h2>
          <button
            onClick={addLanguage}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            + Add Language
          </button>
        </div>
        {data.languages.map((lang) => (
          <div key={lang.id} className="flex gap-4 mb-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Language</label>
              <input
                type="text"
                value={lang.name}
                onChange={(e) =>
                  updateLanguage(lang.id, "name", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
            <div className="w-48">
              <label className="block text-sm font-medium mb-1">Level</label>
              <select
                value={lang.level}
                onChange={(e) =>
                  updateLanguage(lang.id, "level", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                <option value="basic">Basic</option>
                <option value="conversational">Conversational</option>
                <option value="fluent">Fluent</option>
                <option value="native">Native</option>
              </select>
            </div>
            <button
              onClick={() => removeLanguage(lang.id)}
              className="text-red-600 hover:text-red-800 px-2 py-2"
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Certifications</h2>
          <button
            onClick={addCertification}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            + Add Certification
          </button>
        </div>
        {(data.certifications || []).map((cert, idx) => (
          <div key={idx} className="flex gap-2 mb-3">
            <input
              type="text"
              value={cert}
              onChange={(e) => updateCertification(idx, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Certification name"
            />
            <button
              onClick={() => removeCertification(idx)}
              className="text-red-600 hover:text-red-800 px-4"
            >
              Remove
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
