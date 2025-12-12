"use client";

import React from "react";
import { CVData } from "@/lib/types";

interface Template02Props {
  data: CVData;
  completedField?: string;
  nextFieldToEdit?: string;
  onSectionClick?: (fieldId: string) => void;
  isZooming?: boolean;
  zoomTarget?: string;
  completionPercentage?: number;
}

export default function Template02({
  data,
  completedField,
  nextFieldToEdit,
  onSectionClick,
  isZooming,
  zoomTarget,
  completionPercentage,
}: Template02Props) {
  const isCompleted = (fieldId: string) => completedField === fieldId;
  const isNextField = (fieldId: string) => nextFieldToEdit === fieldId;
  const isZoomTarget = (fieldId: string) => isZooming && zoomTarget === fieldId;

  const getSectionClass = (fieldId: string) => {
    const baseClass = "transition-all duration-700 ease-out";
    if (isCompleted(fieldId)) {
      return `${baseClass} ring-4 ring-green-500 ring-offset-4 z-10 relative bg-green-50/30 rounded-lg p-2 -m-2`;
    }
    if (isNextField(fieldId)) {
      return `${baseClass} ring-2 ring-blue-400 ring-offset-2 scale-[1.02] z-5 relative bg-blue-50/20 rounded-md p-1 -m-1 cursor-pointer hover:ring-blue-500 hover:scale-[1.05]`;
    }
    if (isZoomTarget(fieldId)) {
      return `transition-all duration-800 ease-in-out ring-4 ring-blue-600 ring-offset-4 scale-150 z-50 relative bg-blue-100/50 rounded-lg p-4 -m-4 opacity-100`;
    }
    return baseClass;
  };

  const getFieldLabel = (fieldId: string): string => {
    const labels: Record<string, string> = {
      firstName: "نام",
      lastName: "نام خانوادگی",
      email: "ایمیل",
      phone: "تلفن",
      address: "آدرس",
      city: "شهر",
      country: "کشور",
      summary: "خلاصه حرفه‌ای",
      education: "تحصیلات",
      experience: "تجربه کاری",
      skills: "مهارت‌ها",
    };
    return labels[fieldId] || fieldId;
  };

  const handleClick = (fieldId: string) => {
    if (isNextField(fieldId) && onSectionClick) {
      onSectionClick(fieldId);
    }
  };
  const getSkillRating = (skillName: string): number => {
    const skill = data.skills.find((s) => s.name === skillName);
    if (!skill) return 0;
    const ratingMap: Record<string, number> = {
      beginner: 1,
      intermediate: 3,
      advanced: 4,
      expert: 5,
    };
    return ratingMap[skill.level] || 0;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        data-status={i < rating ? "checked" : "unchecked"}
        className="w-1.5 h-1.5 relative"
      >
        <div
          className={`w-1.5 h-1.5 left-0 top-0 absolute rounded-full border border-stone-500 ${
            i < rating ? "bg-stone-500" : ""
          }`}
        />
      </div>
    ));
  };

  return (
    <div className="w-[595px] h-[842px] relative bg-stone-300 overflow-hidden">
      {/* Click Me Indicator for Next Field */}
      {nextFieldToEdit && !isZooming && (
        <div
          className="absolute z-[100] pointer-events-none"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative">
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-xs font-bold animate-bounce flex items-center gap-2">
                  <span>👆</span>
                  <span>کلیک کنید - {getFieldLabel(nextFieldToEdit)}</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Footer bar */}
      <div className="w-[595px] h-6 left-0 top-[818px] absolute bg-stone-500" />

      {/* Right Column */}
      <div className="w-72 left-[306px] top-[302px] absolute inline-flex flex-col justify-start items-start gap-6">
        {/* Work Experience */}
        <div
          data-field-id="experience"
          onClick={() => handleClick("experience")}
          className={`self-stretch flex flex-col justify-start items-end gap-2 ${getSectionClass(
            "experience"
          )}`}
        >
          <div
            data-line-position="Right"
            className="self-stretch inline-flex justify-start items-center gap-2"
          >
            <div className="justify-start text-zinc-600 text-xs font-extrabold font-[var(--font-poppins)] capitalize">
              Work Experience
            </div>
            <div className="flex-1 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
            {data.experience.map((exp, index) => (
              <div
                key={exp.id || index}
                data-body-text="true"
                data-company-name-="true"
                data-job-position="true"
                data-seprator="true"
                data-year="true"
                className="w-60 flex flex-col justify-start items-start gap-1"
              >
                <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                      {exp.title || "Job Position"}
                    </div>
                    <div className="w-3 h-0 origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
                    <div className="flex justify-start items-start gap-1">
                      <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                        {exp.startDate || "yyyy"}
                      </div>
                      <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                        -
                      </div>
                      <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                        {exp.endDate || "yyyy"}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-center gap-1">
                    <div className="flex-1 justify-start text-neutral-500 text-[8px] font-normal font-[var(--font-poppins)]">
                      {exp.company || "Company name"} /{" "}
                      {exp.location || "Address"}
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-start text-zinc-600 text-[8px] font-normal font-[var(--font-poppins)]">
                  {exp.description ||
                    "Lorem ipsum dolor sit amet consectetur..."}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="self-stretch flex flex-col justify-start items-end gap-2">
          <div
            data-line-position="Right"
            className="self-stretch inline-flex justify-start items-center gap-2"
          >
            <div className="justify-start text-zinc-600 text-xs font-extrabold font-[var(--font-poppins)] capitalize">
              Interests
            </div>
            <div className="flex-1 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
          </div>
          <div className="self-stretch pr-12 flex flex-col justify-start items-start gap-1.5">
            {(data.certifications || []).slice(0, 3).map((interest, index) => (
              <div
                key={index}
                className="w-72 flex flex-col justify-start items-start"
              >
                <div className="self-stretch pr-12 flex flex-col justify-start items-start gap-[5px]">
                  <div className="self-stretch justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                    - {interest || `Interest ${index + 1}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* References */}
        <div className="self-stretch flex flex-col justify-start items-end gap-2">
          <div
            data-line-position="Right"
            className="self-stretch inline-flex justify-start items-center gap-2"
          >
            <div className="justify-start text-zinc-600 text-xs font-extrabold font-[var(--font-poppins)] capitalize">
              References
            </div>
            <div className="flex-1 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
          </div>
          <div
            data-body-text="true"
            data-company-name-="false"
            data-job-position="true"
            data-seprator="false"
            data-year="false"
            className="self-stretch pr-12 flex flex-col justify-start items-start gap-1"
          >
            <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                  {data.languages[0]?.name || "Option 1"}
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start text-zinc-600 text-[8px] font-normal font-[var(--font-poppins)]">
              {data.languages[0]?.level ||
                "Lorem ipsum dolor sit amet consectetur..."}
            </div>
          </div>
        </div>
      </div>

      {/* Left Column - Bottom */}
      <div className="w-72 left-0 top-[302px] absolute inline-flex flex-col justify-start items-start gap-6">
        {/* Profile Image and Links */}
        <div className="self-stretch pt-6 flex flex-col justify-start items-start gap-2">
          <div className="self-stretch pl-12 inline-flex justify-start items-center">
            <img
              data-aspect-ratio="4:3 | 3:4"
              data-orientation="Portrait"
              className="w-40 h-56 rounded-[96px] outline outline-4 outline-offset-[-4px] outline-zinc-600 inline-flex flex-col justify-start items-start object-cover"
              src="https://placehold.co/157x229"
              alt="Profile"
            />
          </div>
          <div className="self-stretch pl-12 flex flex-col justify-start items-start gap-0.5">
            <div className="inline-flex justify-start items-center">
              <div className="w-20 h-3 relative">
                <div className="w-20 left-0 top-0 absolute justify-start text-stone-500 text-[8px] font-semibold font-[var(--font-poppins)]">
                  WEBSITE
                </div>
              </div>
              <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                {data.personalInfo.website || "www.Example.com"}
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="w-20 h-3 relative">
                <div className="w-20 left-0 top-0 absolute justify-start text-stone-500 text-[8px] font-semibold font-[var(--font-poppins)]">
                  LINKED IN
                </div>
              </div>
              <div className="text-justify justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                {data.personalInfo.linkedin || "www.linkedin.com/in/Example"}
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div
          data-field-id="skills"
          onClick={() => handleClick("skills")}
          className={`self-stretch pr-6 flex flex-col justify-start items-start gap-2 ${getSectionClass(
            "skills"
          )}`}
        >
          <div
            data-line-position="Left"
            className="w-20 inline-flex justify-start items-center gap-2"
          >
            <div className="flex-1 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
            <div className="justify-start text-zinc-600 text-xs font-extrabold font-[var(--font-poppins)] capitalize">
              Skills
            </div>
          </div>
          <div className="self-stretch pl-12 flex flex-col justify-start items-start gap-1">
            {data.skills.slice(0, 9).map((skill, index) => {
              const rating = getSkillRating(skill.name);
              return (
                <div
                  key={skill.id || index}
                  className="self-stretch inline-flex justify-between items-center"
                >
                  <div className="w-32 justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                    {skill.name || `Skill ${index + 1}`}
                  </div>
                  <div
                    data-rating={`${rating} star`}
                    className="flex justify-start items-center gap-0.5"
                  >
                    {renderStars(rating)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="w-[595px] left-0 top-[254px] absolute inline-flex justify-start items-center">
        <div className="w-5 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
        <div className="px-7 flex justify-center items-center gap-2">
          <div className="justify-start text-neutral-500 text-base font-light font-[var(--font-poppins)] uppercase tracking-[7.68px]">
            Curriculum
            <br />
            vitae
          </div>
        </div>
        <div className="flex-1 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
      </div>

      {/* Right Column - Top */}
      <div className="w-72 left-[306px] top-[48px] absolute inline-flex flex-col justify-start items-start gap-6">
        {/* Profile */}
        <div
          data-field-id="summary"
          onClick={() => handleClick("summary")}
          className={`self-stretch flex flex-col justify-start items-start gap-2 ${getSectionClass(
            "summary"
          )}`}
        >
          <div
            data-line-position="Right"
            className="self-stretch inline-flex justify-start items-center gap-2"
          >
            <div className="justify-start text-zinc-600 text-xs font-extrabold font-[var(--font-poppins)] capitalize">
              Profile
            </div>
            <div className="flex-1 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
          </div>
          <div className="w-60 justify-start text-zinc-600 text-[8px] font-normal font-[var(--font-poppins)]">
            {data.summary ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus congue consectetur. Praesent tincidunt, risus nec consequat malesuada, purus justo auctor mi, vehicula sollicitudin enim eros sed massa. Pellentesque eu varius nunc. Duis lectus ante, sodales ac est nec, ullamcorper varius augue. Nam est velit, iaculis et cursus nec."}
          </div>
        </div>

        {/* Education */}
        <div
          data-field-id="education"
          onClick={() => handleClick("education")}
          className={`self-stretch flex flex-col justify-start items-end gap-2 ${getSectionClass(
            "education"
          )}`}
        >
          <div
            data-line-position="Right"
            className="self-stretch inline-flex justify-start items-center gap-2"
          >
            <div className="justify-start text-zinc-600 text-xs font-extrabold font-[var(--font-poppins)] capitalize">
              Education
            </div>
            <div className="flex-1 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
            {data.education.map((edu, index) => (
              <div
                key={edu.id || index}
                className="self-stretch flex flex-col justify-start items-start gap-0.5"
              >
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <div className="flex justify-start items-center gap-1">
                    <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                      {edu.degree || "Degree"}
                    </div>
                    <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                      /
                    </div>
                    <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                      {edu.description || "Major or Field of Study"}
                    </div>
                  </div>
                  <div className="w-3 h-0 origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
                  <div className="flex justify-start items-start gap-1">
                    <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                      {edu.startDate || "yyyy"}
                    </div>
                    <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                      -
                    </div>
                    <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                      {edu.endDate || "yyyy"}
                    </div>
                  </div>
                </div>
                <div className="w-28 inline-flex justify-between items-center">
                  <div className="justify-start text-neutral-500 text-[8px] font-normal font-[var(--font-poppins)]">
                    {edu.institution || "Institution name"}
                  </div>
                  <div className="justify-start text-neutral-500 text-[8px] font-normal font-[var(--font-poppins)]">
                    /
                  </div>
                  <div className="justify-start text-neutral-500 text-[8px] font-normal font-[var(--font-poppins)]">
                    {edu.location || "Address"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Left Column - Top */}
      <div className="w-72 left-0 top-[48px] absolute inline-flex flex-col justify-start items-start gap-6">
        {/* Name and Position */}
        <div
          data-field-id="firstName"
          onClick={() => handleClick("firstName")}
          className={`self-stretch pl-12 flex flex-col justify-start items-start gap-1 ${getSectionClass(
            "firstName"
          )}`}
        >
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch justify-start text-zinc-600 text-2xl font-bold font-[var(--font-passion-one)] uppercase">
              {data.personalInfo.firstName || "Name"}
            </div>
            <div
              data-field-id="lastName"
              onClick={() => handleClick("lastName")}
              className={`self-stretch justify-start text-zinc-600 text-2xl font-bold font-[var(--font-passion-one)] uppercase ${getSectionClass(
                "lastName"
              )}`}
            >
              {data.personalInfo.lastName || "Surname"}
            </div>
          </div>
          <div className="self-stretch justify-start text-neutral-500 text-base font-light font-[var(--font-poppins)] uppercase">
            DESIRED POSITION
          </div>
        </div>

        {/* Contact */}
        <div
          data-field-id="phone"
          onClick={() => handleClick("phone")}
          className={`self-stretch flex flex-col justify-start items-start gap-2 ${getSectionClass(
            "phone"
          )}`}
        >
          <div
            data-line-position="Left"
            className="w-24 inline-flex justify-start items-center gap-2"
          >
            <div className="flex-1 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
            <div className="justify-start text-zinc-600 text-xs font-extrabold font-[var(--font-poppins)] capitalize">
              contact
            </div>
          </div>
          <div className="self-stretch pl-12 flex flex-col justify-start items-start gap-0.5">
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="w-20 h-3 relative">
                <div className="w-20 left-0 top-0 absolute justify-start text-stone-500 text-[8px] font-semibold font-[var(--font-poppins)]">
                  TEL
                </div>
              </div>
              <div className="text-justify justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                {data.personalInfo.phone || "+31 6 12345678"}
              </div>
            </div>
            <div
              data-field-id="email"
              onClick={() => handleClick("email")}
              className={`self-stretch inline-flex justify-start items-center ${getSectionClass(
                "email"
              )}`}
            >
              <div className="w-20 h-3 relative">
                <div className="w-20 left-0 top-0 absolute justify-start text-stone-500 text-[8px] font-semibold font-[var(--font-poppins)]">
                  MAIL
                </div>
              </div>
              <div className="text-justify justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                {data.personalInfo.email || "Example@gmail.com"}
              </div>
            </div>
            <div
              data-field-id="address"
              onClick={() => handleClick("address")}
              className={`self-stretch inline-flex justify-start items-start ${getSectionClass(
                "address"
              )}`}
            >
              <div className="w-20 h-3 relative">
                <div className="w-20 left-0 top-0 absolute justify-start text-stone-500 text-[8px] font-semibold font-[var(--font-poppins)]">
                  LOCATION
                </div>
              </div>
              <div className="w-32 inline-flex flex-col justify-start items-start">
                <div className="self-stretch justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                  {data.personalInfo.address || "Example street 103"}
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <div
                    data-field-id="city"
                    onClick={() => handleClick("city")}
                    className={`w-9 text-justify justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)] ${getSectionClass(
                      "city"
                    )}`}
                  >
                    {data.personalInfo.city || "3044PE"}
                  </div>
                  <div
                    data-field-id="country"
                    onClick={() => handleClick("country")}
                    className={`flex-1 text-justify justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)] ${getSectionClass(
                      "country"
                    )}`}
                  >
                    {data.personalInfo.country || "Amsterdam"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
