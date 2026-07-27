"use client";

import React from "react";
import { MinimalistCVData } from "@/lib/types/minimalist-cv";

const NAVY = "#1e2a4a";
const MUTED = "#6b7280";

export interface MinimalistTemplateProps {
  data: MinimalistCVData;
  completedField?: string;
  nextFieldToEdit?: string;
  onSectionClick?: (fieldId: string) => void;
  isZooming?: boolean;
  zoomTarget?: string;
}

export default function MinimalistTemplate({
  data,
  completedField,
  nextFieldToEdit,
  onSectionClick,
  isZooming,
  zoomTarget,
}: MinimalistTemplateProps) {
  const { personalInfo, bio, expertise, experience, skillCategories, projects } =
    data;
  const fullName =
    [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join(" ") ||
    "Your Name";

  const isNextField = (fieldId: string) => nextFieldToEdit === fieldId;
  const isCompleted = (fieldId: string) => completedField === fieldId;
  const isZoomTarget = (fieldId: string) => isZooming && zoomTarget === fieldId;

  const sectionClass = (fieldId: string) => {
    const base = "transition-all duration-500 rounded-md";
    if (isCompleted(fieldId)) {
      return `${base} ring-2 ring-green-400 ring-offset-1`;
    }
    if (isNextField(fieldId)) {
      return `${base} ring-2 ring-blue-400 ring-offset-1 cursor-pointer`;
    }
    if (isZoomTarget(fieldId)) {
      return `${base} ring-2 ring-blue-600 scale-[1.02]`;
    }
    return base;
  };

  const handleClick = (fieldId: string) => {
    if (isNextField(fieldId) && onSectionClick) {
      onSectionClick(fieldId);
    }
  };

  return (
    <div
      className="w-[595px] h-[842px] relative flex overflow-hidden bg-white font-[var(--font-poppins,sans-serif)] text-[10px] leading-snug"
      data-export-root
    >
      {/* Sidebar */}
      <aside
        className="w-[208px] shrink-0 flex flex-col text-white px-4 py-5 gap-4"
        style={{ backgroundColor: NAVY }}
      >
        <div
          data-field-id="profilePhoto"
          className={`flex justify-center ${sectionClass("profilePhoto")}`}
          onClick={() => handleClick("profilePhoto")}
        >
          {data.profilePhotoUrl ? (
            <img
              src={data.profilePhotoUrl}
              alt=""
              className="w-24 h-24 rounded-full object-cover border-2 border-white/30"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-[8px] text-white/60">
              Photo
            </div>
          )}
        </div>

        <SidebarBlock title="Contact">
          <div
            data-field-id="contact"
            className={sectionClass("contact")}
            onClick={() => handleClick("contact")}
          >
            <SidebarLine label="Phone" value={personalInfo.phone || "—"} />
            <SidebarLine label="Email" value={personalInfo.email || "—"} />
            <SidebarLine label="Address" value={personalInfo.address || "—"} />
          </div>
        </SidebarBlock>

        <SidebarBlock title="BIO">
          <div
            data-field-id="bio"
            className={sectionClass("bio")}
            onClick={() => handleClick("bio")}
          >
            <SidebarLine label="Birth" value={bio.birthYear || "—"} />
            <SidebarLine
              label="Marital status"
              value={bio.maritalStatus || "—"}
            />
            <SidebarLine
              label="Military Status"
              value={bio.militaryStatus || "—"}
            />
            <SidebarLine
              label="Language"
              value={bio.languageSummary || "—"}
            />
          </div>
        </SidebarBlock>

        <SidebarBlock title="Expertise">
          <ul
            data-field-id="expertise"
            className={`list-disc pl-4 space-y-1 text-[9px] ${sectionClass("expertise")}`}
            onClick={() => handleClick("expertise")}
          >
            {(expertise.length ? expertise : ["Add expertise items"]).map(
              (item, i) => (
                <li key={i}>{item || "—"}</li>
              )
            )}
          </ul>
        </SidebarBlock>

        <SidebarBlock title="work experience">
          <div
            data-field-id="experience"
            className={`space-y-3 ${sectionClass("experience")}`}
            onClick={() => handleClick("experience")}
          >
            {(experience.length
              ? experience
              : [{ id: "placeholder", company: "Company", dateRange: "Dates" }]
            ).map((exp) => (
              <div key={exp.id} className="flex gap-2 items-start">
                {exp.logoUrl ? (
                  <img
                    src={exp.logoUrl}
                    alt=""
                    className="w-8 h-8 rounded object-contain bg-white/10 shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded bg-white/10 shrink-0" />
                )}
                <div>
                  <div className="font-semibold text-[9px]">
                    {exp.company || "Company"}
                  </div>
                  <div className="text-[8px] text-white/80">
                    {exp.dateRange || "Date range"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SidebarBlock>
      </aside>

      {/* Main column */}
      <main className="flex-1 px-6 py-6 flex flex-col gap-4 overflow-hidden">
        <header
          data-field-id="personalInfo"
          className={sectionClass("personalInfo")}
          onClick={() => handleClick("personalInfo")}
        >
          <h1
            className="text-[28px] font-bold leading-tight"
            style={{ color: NAVY }}
          >
            {fullName}
          </h1>
          <p
            className="text-[11px] tracking-[0.2em] uppercase mt-1"
            style={{ color: MUTED }}
          >
            {personalInfo.jobTitle || "Job Title"}
          </p>
        </header>

        <section>
          <SectionTitle title="Skills" />
          <div
            data-field-id="skillCategories"
            className={`space-y-3 mt-2 ${sectionClass("skillCategories")}`}
            onClick={() => handleClick("skillCategories")}
          >
            {(skillCategories.length
              ? skillCategories
              : [{ id: "s0", title: "Category", items: ["Skill item"] }]
            ).map((cat) => (
              <div key={cat.id}>
                <h3
                  className="font-bold text-[11px] pb-1 border-b border-gray-300"
                  style={{ color: NAVY }}
                >
                  {cat.title || "Category"}
                </h3>
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[9px] text-gray-800">
                  {(cat.items.length ? cat.items : ["—"]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="flex-1 min-h-0">
          <SectionTitle title="Projects" />
          <div
            data-field-id="projects"
            className={`grid grid-cols-2 gap-4 mt-2 ${sectionClass("projects")}`}
            onClick={() => handleClick("projects")}
          >
            {(projects.length
              ? projects
              : [
                  {
                    id: "p0",
                    title: "Project",
                    description: "Description",
                  },
                ]
            ).map((proj) => (
              <article key={proj.id} className="text-[9px]">
                <div className="flex items-center gap-1 flex-wrap">
                  <h3
                    className="font-bold text-[10px]"
                    style={{ color: NAVY }}
                  >
                    {proj.title || "Project"}
                  </h3>
                  {proj.demoUrl ? (
                    <a
                      href={proj.demoUrl}
                      className="text-[8px] underline text-gray-600"
                      onClick={(e) => e.preventDefault()}
                    >
                      Live Demo ↗
                    </a>
                  ) : null}
                </div>
                {proj.subtitle ? (
                  <p className="font-semibold text-gray-700 mt-0.5">
                    {proj.subtitle}
                  </p>
                ) : null}
                <p className="text-gray-700 mt-1 leading-relaxed">
                  {proj.description || "Project description"}
                </p>
                {proj.techStack ? (
                  <p className="mt-2 text-[8px] text-gray-600">
                    <span className="font-semibold">Tech Stack: </span>
                    {proj.techStack}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function SidebarBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-[11px] font-bold uppercase tracking-wide mb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

function SidebarLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-1.5">
      <div className="text-[8px] text-white/70">{label}</div>
      <div className="text-[9px] font-medium break-words">{value}</div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2
      className="text-[13px] font-bold pb-1 border-b-2 border-gray-800"
      style={{ color: "#1e2a4a" }}
    >
      {title}
    </h2>
  );
}
