"use client";

import React, { ChangeEvent } from "react";
import {
  MinimalistCVData,
  MinimalistExperience,
  MinimalistProject,
  MinimalistSkillCategory,
} from "@/lib/types/minimalist-cv";

interface MinimalistEditorFormProps {
  data: MinimalistCVData;
  onChange: (data: MinimalistCVData) => void;
}

function readImageAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function MinimalistEditorForm({
  data,
  onChange,
}: MinimalistEditorFormProps) {
  const updatePersonal = (
    field: keyof MinimalistCVData["personalInfo"],
    value: string
  ) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const updateBio = (field: keyof MinimalistCVData["bio"], value: string) => {
    onChange({ ...data, bio: { ...data.bio, [field]: value } });
  };

  const onPhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await readImageAsDataUrl(file);
    onChange({ ...data, profilePhotoUrl: url });
  };

  const setExpertise = (index: number, value: string) => {
    const expertise = [...data.expertise];
    expertise[index] = value;
    onChange({ ...data, expertise });
  };

  const addExpertise = () =>
    onChange({ ...data, expertise: [...data.expertise, ""] });

  const removeExpertise = (index: number) =>
    onChange({
      ...data,
      expertise: data.expertise.filter((_, i) => i !== index),
    });

  const addExperience = () => {
    const exp: MinimalistExperience = {
      id: Date.now().toString(),
      company: "",
      dateRange: "",
    };
    onChange({ ...data, experience: [...data.experience, exp] });
  };

  const updateExperience = (
    id: string,
    field: keyof MinimalistExperience,
    value: string
  ) => {
    onChange({
      ...data,
      experience: data.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  const onExpLogo = async (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const logoUrl = await readImageAsDataUrl(file);
    updateExperience(id, "logoUrl", logoUrl);
  };

  const removeExperience = (id: string) =>
    onChange({
      ...data,
      experience: data.experience.filter((e) => e.id !== id),
    });

  const addSkillCategory = () => {
    const cat: MinimalistSkillCategory = {
      id: Date.now().toString(),
      title: "",
      items: [""],
    };
    onChange({ ...data, skillCategories: [...data.skillCategories, cat] });
  };

  const updateCategoryTitle = (id: string, title: string) => {
    onChange({
      ...data,
      skillCategories: data.skillCategories.map((c) =>
        c.id === id ? { ...c, title } : c
      ),
    });
  };

  const updateCategoryItem = (
    catId: string,
    itemIndex: number,
    value: string
  ) => {
    onChange({
      ...data,
      skillCategories: data.skillCategories.map((c) => {
        if (c.id !== catId) return c;
        const items = [...c.items];
        items[itemIndex] = value;
        return { ...c, items };
      }),
    });
  };

  const addCategoryItem = (catId: string) => {
    onChange({
      ...data,
      skillCategories: data.skillCategories.map((c) =>
        c.id === catId ? { ...c, items: [...c.items, ""] } : c
      ),
    });
  };

  const removeCategory = (id: string) =>
    onChange({
      ...data,
      skillCategories: data.skillCategories.filter((c) => c.id !== id),
    });

  const addProject = () => {
    const p: MinimalistProject = {
      id: Date.now().toString(),
      title: "",
      description: "",
    };
    onChange({ ...data, projects: [...data.projects, p] });
  };

  const updateProject = (
    id: string,
    field: keyof MinimalistProject,
    value: string
  ) => {
    onChange({
      ...data,
      projects: data.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  const removeProject = (id: string) =>
    onChange({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm";
  const labelClass = "block text-sm font-medium text-gray-800 mb-1";

  return (
    <div className="space-y-8 pb-8">
      <section className="bg-white rounded-lg border p-4">
        <h2 className="text-xl font-bold text-black mb-4">Personal & photo</h2>
        <div className="grid gap-3">
          <div>
            <label className={labelClass}>Profile photo</label>
            <input type="file" accept="image/*" onChange={onPhotoChange} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>First name</label>
              <input
                className={inputClass}
                value={data.personalInfo.firstName}
                onChange={(e) => updatePersonal("firstName", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Last name</label>
              <input
                className={inputClass}
                value={data.personalInfo.lastName}
                onChange={(e) => updatePersonal("lastName", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Job title</label>
            <input
              className={inputClass}
              value={data.personalInfo.jobTitle}
              onChange={(e) => updatePersonal("jobTitle", e.target.value)}
              placeholder="FRONT-END DEVELOPER"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg border p-4">
        <h2 className="text-xl font-bold text-black mb-4">Contact</h2>
        <div className="grid gap-3">
          <div>
            <label className={labelClass}>Phone</label>
            <input
              className={inputClass}
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonal("phone", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              className={inputClass}
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonal("email", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input
              className={inputClass}
              value={data.personalInfo.address}
              onChange={(e) => updatePersonal("address", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg border p-4">
        <h2 className="text-xl font-bold text-black mb-4">Bio</h2>
        <div className="grid gap-3 grid-cols-2">
          <div>
            <label className={labelClass}>Birth year</label>
            <input
              className={inputClass}
              value={data.bio.birthYear}
              onChange={(e) => updateBio("birthYear", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Marital status</label>
            <input
              className={inputClass}
              value={data.bio.maritalStatus}
              onChange={(e) => updateBio("maritalStatus", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Military status</label>
            <input
              className={inputClass}
              value={data.bio.militaryStatus}
              onChange={(e) => updateBio("militaryStatus", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Language</label>
            <input
              className={inputClass}
              value={data.bio.languageSummary}
              onChange={(e) => updateBio("languageSummary", e.target.value)}
              placeholder="English 80%"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Expertise</h2>
          <button
            type="button"
            onClick={addExpertise}
            className="text-sm text-blue-600"
          >
            + Add
          </button>
        </div>
        {data.expertise.map((item, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className={inputClass}
              value={item}
              onChange={(e) => setExpertise(i, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeExpertise(i)}
              className="text-red-600 text-sm px-2"
            >
              Remove
            </button>
          </div>
        ))}
        {data.expertise.length === 0 && (
          <button
            type="button"
            onClick={addExpertise}
            className="text-sm text-gray-600"
          >
            Add first expertise item
          </button>
        )}
      </section>

      <section className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Work experience</h2>
          <button
            type="button"
            onClick={addExperience}
            className="text-sm text-blue-600"
          >
            + Add
          </button>
        </div>
        {data.experience.map((exp) => (
          <div key={exp.id} className="border rounded p-3 mb-3 space-y-2">
            <input
              className={inputClass}
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                updateExperience(exp.id, "company", e.target.value)
              }
            />
            <input
              className={inputClass}
              placeholder="Date range"
              value={exp.dateRange}
              onChange={(e) =>
                updateExperience(exp.id, "dateRange", e.target.value)
              }
            />
            <div>
              <label className={labelClass}>Company logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onExpLogo(exp.id, e)}
              />
            </div>
            <button
              type="button"
              onClick={() => removeExperience(exp.id)}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Skill categories</h2>
          <button
            type="button"
            onClick={addSkillCategory}
            className="text-sm text-blue-600"
          >
            + Add category
          </button>
        </div>
        {data.skillCategories.map((cat) => (
          <div key={cat.id} className="border rounded p-3 mb-3">
            <input
              className={`${inputClass} mb-2`}
              placeholder="Category title"
              value={cat.title}
              onChange={(e) => updateCategoryTitle(cat.id, e.target.value)}
            />
            {cat.items.map((item, idx) => (
              <input
                key={idx}
                className={`${inputClass} mb-2`}
                placeholder="Skill bullet"
                value={item}
                onChange={(e) =>
                  updateCategoryItem(cat.id, idx, e.target.value)
                }
              />
            ))}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => addCategoryItem(cat.id)}
                className="text-sm text-blue-600"
              >
                + Bullet
              </button>
              <button
                type="button"
                onClick={() => removeCategory(cat.id)}
                className="text-sm text-red-600"
              >
                Remove category
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Projects</h2>
          <button
            type="button"
            onClick={addProject}
            className="text-sm text-blue-600"
          >
            + Add
          </button>
        </div>
        {data.projects.map((proj) => (
          <div key={proj.id} className="border rounded p-3 mb-3 space-y-2">
            <input
              className={inputClass}
              placeholder="Title"
              value={proj.title}
              onChange={(e) => updateProject(proj.id, "title", e.target.value)}
            />
            <input
              className={inputClass}
              placeholder="Live demo URL"
              value={proj.demoUrl || ""}
              onChange={(e) => updateProject(proj.id, "demoUrl", e.target.value)}
            />
            <input
              className={inputClass}
              placeholder="Subtitle / role"
              value={proj.subtitle || ""}
              onChange={(e) =>
                updateProject(proj.id, "subtitle", e.target.value)
              }
            />
            <textarea
              className={inputClass}
              rows={3}
              placeholder="Description"
              value={proj.description}
              onChange={(e) =>
                updateProject(proj.id, "description", e.target.value)
              }
            />
            <textarea
              className={inputClass}
              rows={2}
              placeholder="Tech stack"
              value={proj.techStack || ""}
              onChange={(e) =>
                updateProject(proj.id, "techStack", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeProject(proj.id)}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
