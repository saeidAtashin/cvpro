"use client";

import Header from "./components/Header";
import Link from "next/link";

export default function Home() {
  // Generate more items for desktop view (starting from 2 since first is the CV template)
  const items = Array.from({ length: 7 }, (_, i) => ({
    id: i + 2,
    price: 15,
  }));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-md md:max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-12 relative">
        {/* Title - Fixed Left on Larger Mobile */}
        <h2 className="text-2xl sm:text-left sm:pl-0 md:text-3xl lg:text-4xl font-bold text-black mb-6 md:mb-8 text-center sm:text-left">
          Recent Drops
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {/* First Item - CV Template Preview */}
          <Link
            href="/template02-editor"
            className="flex flex-col group cursor-pointer transition-transform hover:scale-105"
          >
            {/* PDF Preview - Portrait Orientation */}
            <div className="w-full aspect-[2/3] bg-stone-300 rounded-lg md:rounded-xl mb-3 md:mb-4 overflow-hidden relative">
              <div
                className="absolute inset-0"
                style={{
                  transform: "scale(0.707)",
                  transformOrigin: "top left",
                  width: "141.42%",
                  height: "141.42%",
                }}
              >
                <div className="w-[595px] h-[842px] relative bg-stone-300 overflow-hidden">
                  {/* Footer bar */}
                  <div className="w-[595px] h-6 left-0 top-[818px] absolute bg-stone-500" />

                  {/* Right Column */}
                  <div className="w-72 left-[306px] top-[302px] absolute inline-flex flex-col justify-start items-start gap-6">
                    {/* Work Experience */}
                    <div className="self-stretch flex flex-col justify-start items-end gap-2">
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
                        {/* Preview Work Experience Items */}
                        <div
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
                                Senior Developer
                              </div>
                              <div className="w-3 h-0 origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
                              <div className="flex justify-start items-start gap-1">
                                <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                  2020
                                </div>
                                <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                  -
                                </div>
                                <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                  2024
                                </div>
                              </div>
                            </div>
                            <div className="self-stretch inline-flex justify-start items-center gap-1">
                              <div className="flex-1 justify-start text-neutral-500 text-[8px] font-normal font-[var(--font-poppins)]">
                                Tech Company / New York, USA
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch justify-start text-zinc-600 text-[8px] font-normal font-[var(--font-poppins)]">
                            Led development of web applications using modern
                            frameworks and technologies.
                          </div>
                        </div>
                        <div
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
                                Junior Developer
                              </div>
                              <div className="w-3 h-0 origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
                              <div className="flex justify-start items-start gap-1">
                                <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                  2018
                                </div>
                                <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                  -
                                </div>
                                <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                  2020
                                </div>
                              </div>
                            </div>
                            <div className="self-stretch inline-flex justify-start items-center gap-1">
                              <div className="flex-1 justify-start text-neutral-500 text-[8px] font-normal font-[var(--font-poppins)]">
                                Startup Inc / San Francisco, USA
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch justify-start text-zinc-600 text-[8px] font-normal font-[var(--font-poppins)]">
                            Developed and maintained frontend applications with
                            React and TypeScript.
                          </div>
                        </div>
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
                        {/* Preview Interests */}
                        <div className="w-72 flex flex-col justify-start items-start">
                          <div className="self-stretch pr-12 flex flex-col justify-start items-start gap-[5px]">
                            <div className="self-stretch justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                              - Photography
                            </div>
                          </div>
                        </div>
                        <div className="w-72 flex flex-col justify-start items-start">
                          <div className="self-stretch pr-12 flex flex-col justify-start items-start gap-[5px]">
                            <div className="self-stretch justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                              - Reading
                            </div>
                          </div>
                        </div>
                        <div className="w-72 flex flex-col justify-start items-start">
                          <div className="self-stretch pr-12 flex flex-col justify-start items-start gap-[5px]">
                            <div className="self-stretch justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                              - Traveling
                            </div>
                          </div>
                        </div>
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
                              John Doe
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch justify-start text-zinc-600 text-[8px] font-normal font-[var(--font-poppins)]">
                          Senior Manager at Tech Corp
                          <br />
                          Email: john.doe@example.com
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
                            www.example.com
                          </div>
                        </div>
                        <div className="self-stretch inline-flex justify-start items-center">
                          <div className="w-20 h-3 relative">
                            <div className="w-20 left-0 top-0 absolute justify-start text-stone-500 text-[8px] font-semibold font-[var(--font-poppins)]">
                              LINKED IN
                            </div>
                          </div>
                          <div className="text-justify justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                            www.linkedin.com/in/example
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="self-stretch pr-6 flex flex-col justify-start items-start gap-2">
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
                        {/* Preview Skills */}
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="w-32 justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                            JavaScript
                          </div>
                          <div
                            data-rating="5 star"
                            className="flex justify-start items-center gap-0.5"
                          >
                            ★★★★★
                          </div>
                        </div>
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="w-32 justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                            React
                          </div>
                          <div
                            data-rating="5 star"
                            className="flex justify-start items-center gap-0.5"
                          >
                            ★★★★★
                          </div>
                        </div>
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="w-32 justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                            TypeScript
                          </div>
                          <div
                            data-rating="4 star"
                            className="flex justify-start items-center gap-0.5"
                          >
                            ★★★★☆
                          </div>
                        </div>
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="w-32 justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                            Node.js
                          </div>
                          <div
                            data-rating="4 star"
                            className="flex justify-start items-center gap-0.5"
                          >
                            ★★★★☆
                          </div>
                        </div>
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="w-32 justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                            Python
                          </div>
                          <div
                            data-rating="3 star"
                            className="flex justify-start items-center gap-0.5"
                          >
                            ★★★☆☆
                          </div>
                        </div>
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="w-32 justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                            CSS
                          </div>
                          <div
                            data-rating="5 star"
                            className="flex justify-start items-center gap-0.5"
                          >
                            ★★★★★
                          </div>
                        </div>
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="w-32 justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                            HTML
                          </div>
                          <div
                            data-rating="5 star"
                            className="flex justify-start items-center gap-0.5"
                          >
                            ★★★★★
                          </div>
                        </div>
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="w-32 justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                            Git
                          </div>
                          <div
                            data-rating="4 star"
                            className="flex justify-start items-center gap-0.5"
                          >
                            ★★★★☆
                          </div>
                        </div>
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="w-32 justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                            Docker
                          </div>
                          <div
                            data-rating="3 star"
                            className="flex justify-start items-center gap-0.5"
                          >
                            ★★★☆☆
                          </div>
                        </div>
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
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
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
                        Experienced software developer with a passion for
                        creating innovative web applications. Skilled in modern
                        JavaScript frameworks and committed to writing clean,
                        maintainable code. Strong problem-solving abilities and
                        collaborative team player.
                      </div>
                    </div>

                    {/* Education */}
                    <div className="self-stretch flex flex-col justify-start items-end gap-2">
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
                        {/* Preview Education Items */}
                        <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                          <div className="self-stretch inline-flex justify-start items-center gap-2">
                            <div className="flex justify-start items-center gap-1">
                              <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                Bachelor
                              </div>
                              <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                /
                              </div>
                              <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                Computer Science
                              </div>
                            </div>
                            <div className="w-3 h-0 origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-neutral-500" />
                            <div className="flex justify-start items-start gap-1">
                              <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                2014
                              </div>
                              <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                -
                              </div>
                              <div className="justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                2018
                              </div>
                            </div>
                          </div>
                          <div className="w-28 inline-flex justify-between items-center">
                            <div className="justify-start text-neutral-500 text-[8px] font-normal font-[var(--font-poppins)]">
                              University Name
                            </div>
                            <div className="justify-start text-neutral-500 text-[8px] font-normal font-[var(--font-poppins)]">
                              /
                            </div>
                            <div className="justify-start text-neutral-500 text-[8px] font-normal font-[var(--font-poppins)]">
                              City, Country
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Left Column - Top */}
                  <div className="w-72 left-0 top-[48px] absolute inline-flex flex-col justify-start items-start gap-6">
                    {/* Name and Position */}
                    <div className="self-stretch pl-12 flex flex-col justify-start items-start gap-1">
                      <div className="self-stretch flex flex-col justify-start items-start">
                        <div className="self-stretch justify-start text-zinc-600 text-2xl font-bold font-[var(--font-passion-one)] uppercase">
                          John
                        </div>
                        <div className="self-stretch justify-start text-zinc-600 text-2xl font-bold font-[var(--font-passion-one)] uppercase">
                          Doe
                        </div>
                      </div>
                      <div className="self-stretch justify-start text-neutral-500 text-base font-light font-[var(--font-poppins)] uppercase">
                        DESIRED POSITION
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
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
                            +1 234 567 8900
                          </div>
                        </div>
                        <div className="self-stretch inline-flex justify-start items-center">
                          <div className="w-20 h-3 relative">
                            <div className="w-20 left-0 top-0 absolute justify-start text-stone-500 text-[8px] font-semibold font-[var(--font-poppins)]">
                              MAIL
                            </div>
                          </div>
                          <div className="text-justify justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                            john.doe@example.com
                          </div>
                        </div>
                        <div className="self-stretch inline-flex justify-start items-start">
                          <div className="w-20 h-3 relative">
                            <div className="w-20 left-0 top-0 absolute justify-start text-stone-500 text-[8px] font-semibold font-[var(--font-poppins)]">
                              LOCATION
                            </div>
                          </div>
                          <div className="w-32 inline-flex flex-col justify-start items-start">
                            <div className="self-stretch justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                              123 Main Street
                            </div>
                            <div className="self-stretch inline-flex justify-start items-center gap-2">
                              <div className="w-9 text-justify justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                10001
                              </div>
                              <div className="flex-1 text-justify justify-start text-zinc-600 text-[8px] font-semibold font-[var(--font-poppins)]">
                                New York
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Label */}
            <p className="text-black font-medium mb-2 md:mb-3 text-sm md:text-base">
              CV Template
            </p>

            {/* Edit Button */}
            <div className="w-full bg-gray-800 text-white py-2 md:py-2.5 px-4 rounded-lg md:rounded-xl font-medium hover:bg-gray-700 active:bg-gray-900 transition-all text-sm md:text-base shadow-sm hover:shadow-md text-center">
              Edit Online
            </div>
          </Link>

          {/* Other Items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col group cursor-pointer transition-transform hover:scale-105"
            >
              {/* Placeholder Image - Portrait Orientation (taller, narrower) */}
              <div className="w-full aspect-[2/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg md:rounded-xl mb-3 md:mb-4 overflow-hidden">
                <div className="w-full h-full bg-gray-200 group-hover:bg-gray-300 transition-colors"></div>
              </div>

              {/* Price */}
              <p className="text-black font-medium mb-2 md:mb-3 text-sm md:text-base">
                Price: ${item.price}
              </p>

              {/* Create Button */}
              <button className="w-full bg-gray-800 text-white py-2 md:py-2.5 px-4 rounded-lg md:rounded-xl font-medium hover:bg-gray-700 active:bg-gray-900 transition-all text-sm md:text-base shadow-sm hover:shadow-md">
                Create
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
