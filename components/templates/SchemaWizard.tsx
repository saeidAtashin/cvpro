"use client";

import React, { useState, ChangeEvent } from "react";
import { TemplateSchema, SchemaField } from "@/lib/templates/schemas/types";
import { getValueByPath, setValueByPath } from "@/lib/templates/schema-utils";
import MobilePreviewModal from "./MobilePreviewModal";

interface SchemaWizardProps {
  schema: TemplateSchema;
  data: unknown;
  onChange: (data: unknown) => void;
  onShowPreview: () => void;
  renderPreview: () => React.ReactNode;
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
  "w-full px-3 py-3 border border-gray-300 rounded-lg text-black text-base";
const labelClass = "block text-sm font-medium text-gray-800 mb-1";

export default function SchemaWizard({
  schema,
  data,
  onChange,
  onShowPreview,
  renderPreview,
  dir = "ltr",
}: SchemaWizardProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const section = schema.sections[stepIndex];

  const setPath = (path: string, value: unknown) => {
    onChange(setValueByPath(data, path, value));
  };

  const next = () => {
    if (stepIndex < schema.sections.length - 1) setStepIndex(stepIndex + 1);
    else {
      setShowPreview(true);
      onShowPreview();
    }
  };
  const prev = () => stepIndex > 0 && setStepIndex(stepIndex - 1);

  const openPreview = () => {
    setShowPreview(true);
    onShowPreview();
  };

  const renderStepFields = (fields: SchemaField[]) => {
    return fields.map((field) => {
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
      if (field.type === "stringList") {
        const items = (getValueByPath(data, field.path) as string[]) ?? [];
        const list = items.length ? items : [""];
        return (
          <div key={field.id} className="space-y-2">
            {list.map((item, i) => (
              <input
                key={i}
                className={inputClass}
                value={item}
                onChange={(e) => {
                  const nextList = [...list];
                  nextList[i] = e.target.value;
                  setPath(field.path, nextList);
                }}
              />
            ))}
            <button
              type="button"
              className="text-blue-600 text-sm"
              onClick={() => setPath(field.path, [...list, ""])}
            >
              + Add item
            </button>
          </div>
        );
      }
      if (field.type === "educationList") {
        const list =
          (getValueByPath(data, field.path) as {
            id: string;
            degree: string;
            institution: string;
            dateRange: string;
          }[]) ?? [];
        const display = list.length
          ? list
          : [
              {
                id: "new",
                degree: "",
                institution: "",
                dateRange: "",
              },
            ];
        return (
          <div key={field.id} className="space-y-4">
            {display.map((edu) => (
              <div key={edu.id} className="space-y-2 border p-3 rounded-lg">
                <input
                  className={inputClass}
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    setPath(
                      field.path,
                      display.map((x) =>
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
                      display.map((x) =>
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
                      display.map((x) =>
                        x.id === edu.id
                          ? { ...x, dateRange: e.target.value }
                          : x
                      )
                    )
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 text-sm"
              onClick={() =>
                setPath(field.path, [
                  ...list,
                  {
                    id: Date.now().toString(),
                    degree: "",
                    institution: "",
                    dateRange: "",
                  },
                ])
              }
            >
              + Add education
            </button>
          </div>
        );
      }
      if (field.type === "jobExperienceList") {
        const list =
          (getValueByPath(data, field.path) as {
            id: string;
            title: string;
            company: string;
            dateRange: string;
          }[]) ?? [];
        const display = list.length
          ? list
          : [{ id: "new", title: "", company: "", dateRange: "" }];
        return (
          <div key={field.id} className="space-y-4">
            {display.map((exp) => (
              <div key={exp.id} className="space-y-2 border p-3 rounded-lg">
                <input
                  className={inputClass}
                  placeholder="Title"
                  value={exp.title}
                  onChange={(e) =>
                    setPath(
                      field.path,
                      display.map((x) =>
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
                      display.map((x) =>
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
                      display.map((x) =>
                        x.id === exp.id
                          ? { ...x, dateRange: e.target.value }
                          : x
                      )
                    )
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 text-sm"
              onClick={() =>
                setPath(field.path, [
                  ...list,
                  {
                    id: Date.now().toString(),
                    title: "",
                    company: "",
                    dateRange: "",
                  },
                ])
              }
            >
              + Add experience
            </button>
          </div>
        );
      }
      if (field.type === "experienceList") {
        const list =
          (getValueByPath(data, field.path) as {
            id: string;
            company: string;
            dateRange: string;
          }[]) ?? [];
        const display = list.length
          ? list
          : [{ id: "new", company: "", dateRange: "" }];
        return (
          <div key={field.id} className="space-y-4">
            {display.map((exp) => (
              <div key={exp.id} className="space-y-2 border p-3 rounded-lg">
                <input
                  className={inputClass}
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    setPath(
                      field.path,
                      display.map((x) =>
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
                      display.map((x) =>
                        x.id === exp.id
                          ? { ...x, dateRange: e.target.value }
                          : x
                      )
                    )
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 text-sm"
              onClick={() =>
                setPath(field.path, [
                  ...list,
                  { id: Date.now().toString(), company: "", dateRange: "" },
                ])
              }
            >
              + Add experience
            </button>
          </div>
        );
      }
      if (field.type === "skillCategoryList") {
        const list =
          (getValueByPath(data, field.path) as {
            id: string;
            title: string;
            items: string[];
          }[]) ?? [];
        const display = list.length
          ? list
          : [{ id: "c0", title: "", items: [""] }];
        return (
          <div key={field.id} className="space-y-4">
            {display.map((cat) => (
              <div key={cat.id} className="border p-3 rounded-lg space-y-2">
                <input
                  className={inputClass}
                  placeholder="Category"
                  value={cat.title}
                  onChange={(e) =>
                    setPath(
                      field.path,
                      display.map((c) =>
                        c.id === cat.id ? { ...c, title: e.target.value } : c
                      )
                    )
                  }
                />
                {cat.items.map((item, idx) => (
                  <input
                    key={idx}
                    className={inputClass}
                    placeholder="Bullet"
                    value={item}
                    onChange={(e) =>
                      setPath(
                        field.path,
                        display.map((c) => {
                          if (c.id !== cat.id) return c;
                          const items = [...c.items];
                          items[idx] = e.target.value;
                          return { ...c, items };
                        })
                      )
                    }
                  />
                ))}
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 text-sm"
              onClick={() =>
                setPath(field.path, [
                  ...list,
                  { id: Date.now().toString(), title: "", items: [""] },
                ])
              }
            >
              + Add category
            </button>
          </div>
        );
      }
      if (field.type === "projectList") {
        const list =
          (getValueByPath(data, field.path) as {
            id: string;
            title: string;
            description: string;
            demoUrl?: string;
          }[]) ?? [];
        const display = list.length
          ? list
          : [{ id: "p0", title: "", description: "" }];
        return (
          <div key={field.id} className="space-y-4">
            {display.map((p) => (
              <div key={p.id} className="border p-3 rounded-lg space-y-2">
                <input
                  className={inputClass}
                  placeholder="Title"
                  value={p.title}
                  onChange={(e) =>
                    setPath(
                      field.path,
                      display.map((x) =>
                        x.id === p.id ? { ...x, title: e.target.value } : x
                      )
                    )
                  }
                />
                <input
                  className={inputClass}
                  placeholder="Demo URL"
                  value={p.demoUrl ?? ""}
                  onChange={(e) =>
                    setPath(
                      field.path,
                      display.map((x) =>
                        x.id === p.id ? { ...x, demoUrl: e.target.value } : x
                      )
                    )
                  }
                />
                <textarea
                  className={inputClass}
                  rows={3}
                  placeholder="Description"
                  value={p.description}
                  onChange={(e) =>
                    setPath(
                      field.path,
                      display.map((x) =>
                        x.id === p.id
                          ? { ...x, description: e.target.value }
                          : x
                      )
                    )
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 text-sm"
              onClick={() =>
                setPath(field.path, [
                  ...list,
                  { id: Date.now().toString(), title: "", description: "" },
                ])
              }
            >
              + Add project
            </button>
          </div>
        );
      }

      const value = String(getValueByPath(data, field.path) ?? "");
      return (
        <input
          key={field.id}
          className={inputClass}
          type={field.type === "email" ? "email" : "text"}
          placeholder={field.label}
          value={value}
          onChange={(e) => setPath(field.path, e.target.value)}
        />
      );
    });
  };

  return (
    <div className="pb-24" dir={dir}>
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Step {stepIndex + 1} / {schema.sections.length}
        </span>
        <button
          type="button"
          onClick={openPreview}
          className="text-sm text-blue-600 font-medium"
        >
          Preview
        </button>
      </div>
      <h2 className="text-xl font-bold text-black mb-4">{section.title}</h2>
      <div className="space-y-3">{renderStepFields(section.fields)}</div>

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
          {stepIndex === schema.sections.length - 1 ? "Preview" : "Next"}
        </button>
      </div>

      {showPreview && (
        <MobilePreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          renderPreview={renderPreview}
        />
      )}
    </div>
  );
}
