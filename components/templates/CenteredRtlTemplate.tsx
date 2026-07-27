"use client";

import React from "react";
import { CenteredRtlCVData } from "@/lib/types/centered-rtl-cv";
import {
  CENTERED_RTL_SECTION_LABELS,
  TemplateLocale,
} from "@/lib/templates/i18n/section-labels";

interface CenteredRtlTemplateProps {
  data: CenteredRtlCVData;
  locale?: TemplateLocale;
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gray-400" />
      <span className="text-[11px] font-semibold text-gray-800 px-2 whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-gray-400" />
    </div>
  );
}

export default function CenteredRtlTemplate({
  data,
  locale = "ar",
}: CenteredRtlTemplateProps) {
  const labels = CENTERED_RTL_SECTION_LABELS[locale];

  const education = data?.education?.length
    ? data.education
    : [
        {
          id: "e0",
          degree: "—",
          institution: "—",
          dateRange: "—",
        },
      ];
  const experience = data.experience.length
    ? data.experience
    : [
        {
          id: "x0",
          title: "—",
          company: "—",
          dateRange: "—",
        },
      ];
  const skills = data.skills.length ? data.skills : ["—"];

  const skillMid = Math.ceil(skills.length / 2);
  const skillsCol1 = skills.slice(0, skillMid);
  const skillsCol2 = skills.slice(skillMid);

  const eduPairs: (typeof education)[0][][] = [];
  for (let i = 0; i < education.length; i += 2) {
    eduPairs.push(education.slice(i, i + 2));
  }
  if (eduPairs.length === 0) eduPairs.push([education[0]]);

  const expPairs: (typeof experience)[0][][] = [];
  for (let i = 0; i < experience.length; i += 2) {
    expPairs.push(experience.slice(i, i + 2));
  }
  if (expPairs.length === 0) expPairs.push([experience[0]]);

  return (
    <div
      data-export-root
      dir="rtl"
      className="w-[595px] h-[842px] bg-white border-2 border-sky-200 box-border px-10 py-8 font-[var(--font-vazirmatn,sans-serif)] text-right text-gray-900"
    >
      <header className="text-center mb-4">
        <h1 className="text-[22px] font-bold mb-2">
          {data.fullName || "الاسم"}
        </h1>
        <div className="inline-block border border-gray-800 px-6 py-1 text-[11px] font-medium">
          {data.jobTitle || "المسمى الوظيفي"}
        </div>
      </header>

      <div className="flex flex-col items-center mb-6">
        {data.profilePhotoUrl ? (
          <img
            src={data.profilePhotoUrl}
            alt=""
            className="w-24 h-24 rounded-full object-cover border border-gray-300 mb-3"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-300 mb-3 flex items-center justify-center text-[10px] text-gray-400">
            Photo
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-[9px] text-gray-700">
          <span className="flex items-center gap-1">
            <span aria-hidden>📞</span>
            {data.phone || "+123-456-7890"}
          </span>
          <span className="flex items-center gap-1">
            <span aria-hidden>✉</span>
            {data.email || "email@example.com"}
          </span>
          <span className="flex items-center gap-1">
            <span aria-hidden>📍</span>
            {data.address || "Address"}
          </span>
        </div>
      </div>

      <SectionHeader title={labels.education} />
      {eduPairs.map((pair, rowIdx) => (
        <div key={rowIdx} className="grid grid-cols-2 gap-6 mb-3 text-[9px]">
          {pair.map((edu) => (
            <div key={edu.id} className="space-y-0.5">
              <div className="font-bold">{edu.degree}</div>
              <div className="text-gray-600">{edu.institution}</div>
              <div className="text-gray-500">{edu.dateRange}</div>
            </div>
          ))}
          {pair.length === 1 && <div />}
        </div>
      ))}

      <SectionHeader title={labels.experience} />
      {expPairs.map((pair, rowIdx) => (
        <div key={rowIdx} className="grid grid-cols-2 gap-6 mb-3 text-[9px]">
          {pair.map((exp) => (
            <div key={exp.id} className="space-y-0.5">
              <div className="font-bold">{exp.title}</div>
              <div className="text-gray-600">{exp.company}</div>
              <div className="text-gray-500">{exp.dateRange}</div>
            </div>
          ))}
          {pair.length === 1 && <div />}
        </div>
      ))}

      <SectionHeader title={labels.skills} />
      <div className="grid grid-cols-2 gap-6 text-[9px]">
        <ul className="list-disc list-inside space-y-1 pr-2">
          {skillsCol1.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
        <ul className="list-disc list-inside space-y-1 pr-2">
          {skillsCol2.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
