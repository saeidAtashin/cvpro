"use client";

import React, { ChangeEvent } from "react";
import {
  MinimalistCVData,
  MinimalistExperience,
  MinimalistProject,
  MinimalistSkillCategory,
} from "@/lib/types/minimalist-cv";
import { TemplateSchema, SchemaField } from "@/lib/templates/schemas/types";
import { getValueByPath, setValueByPath } from "@/lib/templates/schema-utils";

interface SchemaDrivenFormProps {
  schema: TemplateSchema;
  data: unknown;
  onChange: (data: unknown) => void;
  dir?: "rtl" | "ltr";
}

function readImageAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm";
const labelClass = "block text-sm font-medium text-gray-800 mb-1";

export default function SchemaDrivenForm({
  schema,
  data,
  onChange,
  dir = "ltr",
}: SchemaDrivenFormProps) {
  const setPath = (path: string, value: unknown) => {
    onChange(setValueByPath(data, path, value));
  };

  const renderScalarField = (field: SchemaField) => {
    const value = String(getValueByPath(data, field.path) ?? "");
    if (field.type === "file") {
      return (
        <div key={field.id}>
          <label className={labelClass}>{field.label}</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e: ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setPath(field.path, await readImageAsDataUrl(file));
            }}
          />
        </div>
      );
    }
    if (field.type === "textarea") {
      return (
        <div key={field.id}>
          <label className={labelClass}>{field.label}</label>
          <textarea
            className={inputClass}
            rows={3}
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => setPath(field.path, e.target.value)}
          />
        </div>
      );
    }
    return (
      <div key={field.id}>
        <label className={labelClass}>{field.label}</label>
        <input
          className={inputClass}
          type={field.type === "email" ? "email" : "text"}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => setPath(field.path, e.target.value)}
        />
      </div>
    );
  };

  const renderStringList = (field: SchemaField) => {
    const list = (getValueByPath(data, field.path) as string[]) ?? [];
    const items = list.length ? list : [];
    return (
      <section key={field.id} className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">{field.label}</h2>
          <button
            type="button"
            onClick={() => setPath(field.path, [...items, ""])}
            className="text-sm text-blue-600"
          >
            + Add
          </button>
        </div>
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className={inputClass}
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                setPath(field.path, next);
              }}
            />
            <button
              type="button"
              onClick={() =>
                setPath(
                  field.path,
                  items.filter((_, idx) => idx !== i)
                )
              }
              className="text-red-600 text-sm px-2"
            >
              Remove
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <button
            type="button"
            onClick={() => setPath(field.path, [""])}
            className="text-sm text-gray-600"
          >
            Add first item
          </button>
        )}
      </section>
    );
  };

  const renderEducationList = (field: SchemaField) => {
    const list =
      (getValueByPath(data, field.path) as {
        id: string;
        degree: string;
        institution: string;
        dateRange: string;
      }[]) ?? [];
    const add = () => {
      setPath(field.path, [
        ...list,
        {
          id: Date.now().toString(),
          degree: "",
          institution: "",
          dateRange: "",
        },
      ]);
    };
    return (
      <section key={field.id} className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">{field.label}</h2>
          <button type="button" onClick={add} className="text-sm text-blue-600">
            + Add
          </button>
        </div>
        {list.map((edu) => (
          <div key={edu.id} className="border rounded p-3 mb-3 space-y-2">
            <input
              className={inputClass}
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                setPath(
                  field.path,
                  list.map((x) =>
                    x.id === edu.id ? { ...x, degree: e.target.value } : x
                  )
                )
              }
            />
            <input
              className={inputClass}
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) =>
                setPath(
                  field.path,
                  list.map((x) =>
                    x.id === edu.id
                      ? { ...x, institution: e.target.value }
                      : x
                  )
                )
              }
            />
            <input
              className={inputClass}
              placeholder="Dates"
              value={edu.dateRange}
              onChange={(e) =>
                setPath(
                  field.path,
                  list.map((x) =>
                    x.id === edu.id ? { ...x, dateRange: e.target.value } : x
                  )
                )
              }
            />
            <button
              type="button"
              onClick={() =>
                setPath(
                  field.path,
                  list.filter((x) => x.id !== edu.id)
                )
              }
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </section>
    );
  };

  const renderJobExperienceList = (field: SchemaField) => {
    const list =
      (getValueByPath(data, field.path) as {
        id: string;
        title: string;
        company: string;
        dateRange: string;
      }[]) ?? [];
    const add = () => {
      setPath(field.path, [
        ...list,
        {
          id: Date.now().toString(),
          title: "",
          company: "",
          dateRange: "",
        },
      ]);
    };
    return (
      <section key={field.id} className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">{field.label}</h2>
          <button type="button" onClick={add} className="text-sm text-blue-600">
            + Add
          </button>
        </div>
        {list.map((exp) => (
          <div key={exp.id} className="border rounded p-3 mb-3 space-y-2">
            <input
              className={inputClass}
              placeholder="Title"
              value={exp.title}
              onChange={(e) =>
                setPath(
                  field.path,
                  list.map((x) =>
                    x.id === exp.id ? { ...x, title: e.target.value } : x
                  )
                )
              }
            />
            <input
              className={inputClass}
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                setPath(
                  field.path,
                  list.map((x) =>
                    x.id === exp.id ? { ...x, company: e.target.value } : x
                  )
                )
              }
            />
            <input
              className={inputClass}
              placeholder="Dates"
              value={exp.dateRange}
              onChange={(e) =>
                setPath(
                  field.path,
                  list.map((x) =>
                    x.id === exp.id ? { ...x, dateRange: e.target.value } : x
                  )
                )
              }
            />
            <button
              type="button"
              onClick={() =>
                setPath(
                  field.path,
                  list.filter((x) => x.id !== exp.id)
                )
              }
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </section>
    );
  };

  const renderExperienceList = (field: SchemaField) => {
    const list = (getValueByPath(data, field.path) as MinimalistExperience[]) ?? [];
    const add = () => {
      const exp: MinimalistExperience = {
        id: Date.now().toString(),
        company: "",
        dateRange: "",
      };
      setPath(field.path, [...list, exp]);
    };
    return (
      <section key={field.id} className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">{field.label}</h2>
          <button type="button" onClick={add} className="text-sm text-blue-600">
            + Add
          </button>
        </div>
        {list.map((exp) => (
          <div key={exp.id} className="border rounded p-3 mb-3 space-y-2">
            <input
              className={inputClass}
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                setPath(
                  field.path,
                  list.map((x) =>
                    x.id === exp.id ? { ...x, company: e.target.value } : x
                  )
                )
              }
            />
            <input
              className={inputClass}
              placeholder="Date range"
              value={exp.dateRange}
              onChange={(e) =>
                setPath(
                  field.path,
                  list.map((x) =>
                    x.id === exp.id ? { ...x, dateRange: e.target.value } : x
                  )
                )
              }
            />
            <div>
              <label className={labelClass}>Company logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const logoUrl = await readImageAsDataUrl(file);
                  setPath(
                    field.path,
                    list.map((x) =>
                      x.id === exp.id ? { ...x, logoUrl } : x
                    )
                  );
                }}
              />
            </div>
            <button
              type="button"
              onClick={() =>
                setPath(
                  field.path,
                  list.filter((x) => x.id !== exp.id)
                )
              }
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </section>
    );
  };

  const renderSkillCategories = (field: SchemaField) => {
    const list =
      (getValueByPath(data, field.path) as MinimalistSkillCategory[]) ?? [];
    return (
      <section key={field.id} className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">{field.label}</h2>
          <button
            type="button"
            onClick={() =>
              setPath(field.path, [
                ...list,
                { id: Date.now().toString(), title: "", items: [""] },
              ])
            }
            className="text-sm text-blue-600"
          >
            + Add category
          </button>
        </div>
        {list.map((cat) => (
          <div key={cat.id} className="border rounded p-3 mb-3">
            <input
              className={`${inputClass} mb-2`}
              placeholder="Category title"
              value={cat.title}
              onChange={(e) =>
                setPath(
                  field.path,
                  list.map((c) =>
                    c.id === cat.id ? { ...c, title: e.target.value } : c
                  )
                )
              }
            />
            {cat.items.map((item, idx) => (
              <input
                key={idx}
                className={`${inputClass} mb-2`}
                placeholder="Skill bullet"
                value={item}
                onChange={(e) =>
                  setPath(
                    field.path,
                    list.map((c) => {
                      if (c.id !== cat.id) return c;
                      const items = [...c.items];
                      items[idx] = e.target.value;
                      return { ...c, items };
                    })
                  )
                }
              />
            ))}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setPath(
                    field.path,
                    list.map((c) =>
                      c.id === cat.id ? { ...c, items: [...c.items, ""] } : c
                    )
                  )
                }
                className="text-sm text-blue-600"
              >
                + Bullet
              </button>
              <button
                type="button"
                onClick={() =>
                  setPath(
                    field.path,
                    list.filter((c) => c.id !== cat.id)
                  )
                }
                className="text-sm text-red-600"
              >
                Remove category
              </button>
            </div>
          </div>
        ))}
      </section>
    );
  };

  const renderProjects = (field: SchemaField) => {
    const list = (getValueByPath(data, field.path) as MinimalistProject[]) ?? [];
    return (
      <section key={field.id} className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">{field.label}</h2>
          <button
            type="button"
            onClick={() =>
              setPath(field.path, [
                ...list,
                { id: Date.now().toString(), title: "", description: "" },
              ])
            }
            className="text-sm text-blue-600"
          >
            + Add
          </button>
        </div>
        {list.map((proj) => (
          <div key={proj.id} className="border rounded p-3 mb-3 space-y-2">
            {(
              [
                ["title", "Title", "text"],
                ["demoUrl", "Live demo URL", "text"],
                ["subtitle", "Subtitle / role", "text"],
              ] as const
            ).map(([key, label]) => (
              <input
                key={key}
                className={inputClass}
                placeholder={label}
                value={proj[key] ?? ""}
                onChange={(e) =>
                  setPath(
                    field.path,
                    list.map((p) =>
                      p.id === proj.id ? { ...p, [key]: e.target.value } : p
                    )
                  )
                }
              />
            ))}
            <textarea
              className={inputClass}
              rows={3}
              placeholder="Description"
              value={proj.description}
              onChange={(e) =>
                setPath(
                  field.path,
                  list.map((p) =>
                    p.id === proj.id
                      ? { ...p, description: e.target.value }
                      : p
                  )
                )
              }
            />
            <textarea
              className={inputClass}
              rows={2}
              placeholder="Tech stack"
              value={proj.techStack ?? ""}
              onChange={(e) =>
                setPath(
                  field.path,
                  list.map((p) =>
                    p.id === proj.id
                      ? { ...p, techStack: e.target.value }
                      : p
                  )
                )
              }
            />
            <button
              type="button"
              onClick={() =>
                setPath(
                  field.path,
                  list.filter((p) => p.id !== proj.id)
                )
              }
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </section>
    );
  };

  const COMPLEX_TYPES = [
    "stringList",
    "experienceList",
    "educationList",
    "jobExperienceList",
    "skillCategoryList",
    "projectList",
  ];

  const renderField = (field: SchemaField) => {
    switch (field.type) {
      case "stringList":
        return renderStringList(field);
      case "experienceList":
        return renderExperienceList(field);
      case "educationList":
        return renderEducationList(field);
      case "jobExperienceList":
        return renderJobExperienceList(field);
      case "skillCategoryList":
        return renderSkillCategories(field);
      case "projectList":
        return renderProjects(field);
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-8" dir={dir}>
      {schema.sections.map((section) => {
        const complexFields = section.fields.filter((f) =>
          COMPLEX_TYPES.includes(f.type)
        );
        const scalarFields = section.fields.filter(
          (f) => !complexFields.includes(f)
        );

        if (complexFields.length === 1 && scalarFields.length === 0) {
          return renderField(complexFields[0]);
        }

        return (
          <section
            key={section.id}
            className="bg-white rounded-lg border p-4"
          >
            <h2 className="text-xl font-bold text-black mb-4">{section.title}</h2>
            <div
              className={
                section.id === "bio"
                  ? "grid gap-3 grid-cols-2"
                  : section.id === "personal"
                    ? "grid gap-3"
                    : "grid gap-3"
              }
            >
              {scalarFields.map((field) => {
                if (
                  section.id === "personal" &&
                  (field.id === "firstName" || field.id === "lastName")
                ) {
                  return null;
                }
                return renderScalarField(field);
              })}
              {section.id === "personal" && (
                <div className="grid grid-cols-2 gap-3 col-span-full">
                  {scalarFields
                    .filter((f) => f.id === "firstName" || f.id === "lastName")
                    .map((field) => renderScalarField(field))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
