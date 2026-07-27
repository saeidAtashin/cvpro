"use client";

import React, { useState, ChangeEvent } from "react";
import { MinimalistCVData } from "@/lib/types/minimalist-cv";
import MobilePreviewModal from "./MobilePreviewModal";
import MinimalistTemplate from "./MinimalistTemplate";

interface MinimalistFormWizardProps {
  data: MinimalistCVData;
  onChange: (data: MinimalistCVData) => void;
  onShowPreview: () => void;
}

const STEPS = [
  "personal",
  "contact",
  "bio",
  "expertise",
  "experience",
  "skills",
  "projects",
] as const;

type StepId = (typeof STEPS)[number];

const STEP_TITLES: Record<StepId, string> = {
  personal: "Personal & photo",
  contact: "Contact",
  bio: "Bio",
  expertise: "Expertise",
  experience: "Experience",
  skills: "Skills",
  projects: "Projects",
};

function readImageAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function MinimalistFormWizard({
  data,
  onChange,
  onShowPreview,
}: MinimalistFormWizardProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const step = STEPS[stepIndex];

  const inputClass =
    "w-full px-3 py-3 border border-gray-300 rounded-lg text-black text-base";
  const labelClass = "block text-sm font-medium text-gray-800 mb-1";

  const next = () => {
    if (stepIndex < STEPS.length - 1) setStepIndex(stepIndex + 1);
    else {
      setShowPreview(true);
      onShowPreview();
    }
  };
  const prev = () => stepIndex > 0 && setStepIndex(stepIndex - 1);

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
    onChange({ ...data, profilePhotoUrl: await readImageAsDataUrl(file) });
  };

  return (
    <div className="pb-24">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Step {stepIndex + 1} / {STEPS.length}
        </span>
        <button
          type="button"
          onClick={() => {
            setShowPreview(true);
            onShowPreview();
          }}
          className="text-sm text-blue-600 font-medium"
        >
          Preview
        </button>
      </div>
      <h2 className="text-xl font-bold text-black mb-4">{STEP_TITLES[step]}</h2>

      {step === "personal" && (
        <div className="space-y-3">
          <div>
            <label className={labelClass}>Photo</label>
            <input type="file" accept="image/*" onChange={onPhotoChange} />
          </div>
          <input
            className={inputClass}
            placeholder="First name"
            value={data.personalInfo.firstName}
            onChange={(e) => updatePersonal("firstName", e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Last name"
            value={data.personalInfo.lastName}
            onChange={(e) => updatePersonal("lastName", e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Job title"
            value={data.personalInfo.jobTitle}
            onChange={(e) => updatePersonal("jobTitle", e.target.value)}
          />
        </div>
      )}

      {step === "contact" && (
        <div className="space-y-3">
          <input
            className={inputClass}
            placeholder="Phone"
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonal("phone", e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Email"
            value={data.personalInfo.email}
            onChange={(e) => updatePersonal("email", e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Address"
            value={data.personalInfo.address}
            onChange={(e) => updatePersonal("address", e.target.value)}
          />
        </div>
      )}

      {step === "bio" && (
        <div className="space-y-3">
          <input
            className={inputClass}
            placeholder="Birth year"
            value={data.bio.birthYear}
            onChange={(e) => updateBio("birthYear", e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Marital status"
            value={data.bio.maritalStatus}
            onChange={(e) => updateBio("maritalStatus", e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Military status"
            value={data.bio.militaryStatus}
            onChange={(e) => updateBio("militaryStatus", e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Language"
            value={data.bio.languageSummary}
            onChange={(e) => updateBio("languageSummary", e.target.value)}
          />
        </div>
      )}

      {step === "expertise" && (
        <ExpertiseStep data={data} onChange={onChange} inputClass={inputClass} />
      )}

      {step === "experience" && (
        <ExperienceStep data={data} onChange={onChange} inputClass={inputClass} />
      )}

      {step === "skills" && (
        <SkillsStep data={data} onChange={onChange} inputClass={inputClass} />
      )}

      {step === "projects" && (
        <ProjectsStep data={data} onChange={onChange} inputClass={inputClass} />
      )}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex gap-3">
        <button
          type="button"
          onClick={prev}
          disabled={stepIndex === 0}
          className="flex-1 py-3 rounded-lg border text-black disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={next}
          className="flex-1 py-3 rounded-lg bg-gray-900 text-white"
        >
          {stepIndex === STEPS.length - 1 ? "Preview" : "Next"}
        </button>
      </div>

      {showPreview && (
        <MobilePreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          renderPreview={() => <MinimalistTemplate data={data} />}
        />
      )}
    </div>
  );
}

function ExpertiseStep({
  data,
  onChange,
  inputClass,
}: {
  data: MinimalistCVData;
  onChange: (d: MinimalistCVData) => void;
  inputClass: string;
}) {
  const items = data.expertise.length ? data.expertise : [""];
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <input
          key={i}
          className={inputClass}
          value={item}
          onChange={(e) => {
            const expertise = [...items];
            expertise[i] = e.target.value;
            onChange({ ...data, expertise });
          }}
        />
      ))}
      <button
        type="button"
        className="text-blue-600 text-sm"
        onClick={() => onChange({ ...data, expertise: [...items, ""] })}
      >
        + Add item
      </button>
    </div>
  );
}

function ExperienceStep({
  data,
  onChange,
  inputClass,
}: {
  data: MinimalistCVData;
  onChange: (d: MinimalistCVData) => void;
  inputClass: string;
}) {
  const list =
    data.experience.length > 0
      ? data.experience
      : [{ id: "new", company: "", dateRange: "" }];
  return (
    <div className="space-y-4">
      {list.map((exp) => (
        <div key={exp.id} className="space-y-2 border p-3 rounded-lg">
          <input
            className={inputClass}
            placeholder="Company"
            value={exp.company}
            onChange={(e) => {
              onChange({
                ...data,
                experience: list.map((x) =>
                  x.id === exp.id ? { ...x, company: e.target.value } : x
                ),
              });
            }}
          />
          <input
            className={inputClass}
            placeholder="Date range"
            value={exp.dateRange}
            onChange={(e) => {
              onChange({
                ...data,
                experience: list.map((x) =>
                  x.id === exp.id ? { ...x, dateRange: e.target.value } : x
                ),
              });
            }}
          />
        </div>
      ))}
      <button
        type="button"
        className="text-blue-600 text-sm"
        onClick={() =>
          onChange({
            ...data,
            experience: [
              ...data.experience,
              { id: Date.now().toString(), company: "", dateRange: "" },
            ],
          })
        }
      >
        + Add experience
      </button>
    </div>
  );
}

function SkillsStep({
  data,
  onChange,
  inputClass,
}: {
  data: MinimalistCVData;
  onChange: (d: MinimalistCVData) => void;
  inputClass: string;
}) {
  const cats =
    data.skillCategories.length > 0
      ? data.skillCategories
      : [{ id: "c0", title: "", items: [""] }];
  return (
    <div className="space-y-4">
      {cats.map((cat) => (
        <div key={cat.id} className="border p-3 rounded-lg space-y-2">
          <input
            className={inputClass}
            placeholder="Category"
            value={cat.title}
            onChange={(e) => {
              onChange({
                ...data,
                skillCategories: cats.map((c) =>
                  c.id === cat.id ? { ...c, title: e.target.value } : c
                ),
              });
            }}
          />
          {cat.items.map((item, idx) => (
            <input
              key={idx}
              className={inputClass}
              placeholder="Bullet"
              value={item}
              onChange={(e) => {
                onChange({
                  ...data,
                  skillCategories: cats.map((c) => {
                    if (c.id !== cat.id) return c;
                    const items = [...c.items];
                    items[idx] = e.target.value;
                    return { ...c, items };
                  }),
                });
              }}
            />
          ))}
        </div>
      ))}
      <button
        type="button"
        className="text-blue-600 text-sm"
        onClick={() =>
          onChange({
            ...data,
            skillCategories: [
              ...data.skillCategories,
              { id: Date.now().toString(), title: "", items: [""] },
            ],
          })
        }
      >
        + Add category
      </button>
    </div>
  );
}

function ProjectsStep({
  data,
  onChange,
  inputClass,
}: {
  data: MinimalistCVData;
  onChange: (d: MinimalistCVData) => void;
  inputClass: string;
}) {
  const list =
    data.projects.length > 0
      ? data.projects
      : [{ id: "p0", title: "", description: "" }];
  return (
    <div className="space-y-4">
      {list.map((p) => (
        <div key={p.id} className="border p-3 rounded-lg space-y-2">
          <input
            className={inputClass}
            placeholder="Title"
            value={p.title}
            onChange={(e) => {
              onChange({
                ...data,
                projects: list.map((x) =>
                  x.id === p.id ? { ...x, title: e.target.value } : x
                ),
              });
            }}
          />
          <input
            className={inputClass}
            placeholder="Demo URL"
            value={p.demoUrl || ""}
            onChange={(e) => {
              onChange({
                ...data,
                projects: list.map((x) =>
                  x.id === p.id ? { ...x, demoUrl: e.target.value } : x
                ),
              });
            }}
          />
          <textarea
            className={inputClass}
            rows={3}
            placeholder="Description"
            value={p.description}
            onChange={(e) => {
              onChange({
                ...data,
                projects: list.map((x) =>
                  x.id === p.id ? { ...x, description: e.target.value } : x
                ),
              });
            }}
          />
        </div>
      ))}
      <button
        type="button"
        className="text-blue-600 text-sm"
        onClick={() =>
          onChange({
            ...data,
            projects: [
              ...data.projects,
              { id: Date.now().toString(), title: "", description: "" },
            ],
          })
        }
      >
        + Add project
      </button>
    </div>
  );
}
