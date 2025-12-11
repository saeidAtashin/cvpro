"use client";

import React, { useState, useEffect, useRef } from "react";
import { CVData } from "@/lib/types";
import CVEditorForm from "@/components/cv_editor/CVEditorForm";
import Header from "../components/Header";

export default function TemplateEditorPage() {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
    },
    education: [],
    experience: [],
    skills: [],
    certifications: [],
    languages: [],
    summary: "",
  });
  const [svgContent, setSvgContent] = useState<string>("");
  const [editedSvg, setEditedSvg] = useState<string>("");
  const svgRef = useRef<HTMLDivElement>(null);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("templateCvData");
    if (saved) {
      try {
        setCvData(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading saved template data:", error);
      }
    }
  }, []);

  // Load SVG template
  useEffect(() => {
    fetch("/Template01.svg")
      .then((res) => res.text())
      .then((text) => {
        setSvgContent(text);
        setEditedSvg(text);
      })
      .catch((error) => {
        console.error("Error loading SVG template:", error);
      });
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("templateCvData", JSON.stringify(cvData));
  }, [cvData]);

  // Update SVG when CV data changes
  useEffect(() => {
    if (svgContent) {
      updateSvgWithData(svgContent, cvData);
    }
  }, [cvData, svgContent]);

  const updateSvgWithData = (svg: string, data: CVData) => {
    try {
      // Create a temporary DOM to parse and modify SVG
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svg, "image/svg+xml");

      // Check for parsing errors
      const parserError = svgDoc.querySelector("parsererror");
      if (parserError) {
        console.error("SVG parsing error:", parserError.textContent);
        setEditedSvg(svg);
        return;
      }

      const svgElement = svgDoc.documentElement;

      // Get SVG dimensions
      const svgWidth =
        svgElement.getAttribute("width") ||
        svgElement.getAttribute("viewBox")?.split(" ")[2] ||
        "500";
      const svgHeight =
        svgElement.getAttribute("height") ||
        svgElement.getAttribute("viewBox")?.split(" ")[3] ||
        "700";
      const widthNum = parseFloat(svgWidth);
      const heightNum = parseFloat(svgHeight);

      // Remove existing text overlays if any
      const existingTexts = svgElement.querySelectorAll(
        "text[data-editable='true']"
      );
      existingTexts.forEach((el) => el.remove());

      // Create a group for all editable text
      const namespace = "http://www.w3.org/2000/svg";
      let textGroup = svgElement.querySelector("g[data-editable-group='true']");
      if (!textGroup) {
        textGroup = svgDoc.createElementNS(namespace, "g");
        textGroup.setAttribute("data-editable-group", "true");
        svgElement.appendChild(textGroup);
      } else {
        // Clear existing content
        textGroup.innerHTML = "";
      }

      // Calculate positions (centered horizontally, spaced vertically)
      const leftMargin = widthNum * 0.1; // 10% from left
      let currentY = heightNum * 0.15; // Start at 15% from top

      // Name
      if (data.personalInfo.firstName || data.personalInfo.lastName) {
        const nameText = svgDoc.createElementNS(namespace, "text");
        nameText.setAttribute("x", leftMargin.toString());
        nameText.setAttribute("y", currentY.toString());
        nameText.setAttribute("font-size", "28");
        nameText.setAttribute("font-weight", "bold");
        nameText.setAttribute("fill", "#000000");
        nameText.setAttribute("font-family", "Arial, sans-serif");
        nameText.setAttribute("data-editable", "true");
        nameText.setAttribute("data-field", "name");
        nameText.textContent =
          `${data.personalInfo.firstName} ${data.personalInfo.lastName}`.trim();
        textGroup.appendChild(nameText);
        currentY += 40;
      }

      // Contact info in a row
      const contactInfo: string[] = [];
      if (data.personalInfo.email) contactInfo.push(data.personalInfo.email);
      if (data.personalInfo.phone) contactInfo.push(data.personalInfo.phone);

      if (contactInfo.length > 0) {
        const contactText = svgDoc.createElementNS(namespace, "text");
        contactText.setAttribute("x", leftMargin.toString());
        contactText.setAttribute("y", currentY.toString());
        contactText.setAttribute("font-size", "12");
        contactText.setAttribute("fill", "#333333");
        contactText.setAttribute("font-family", "Arial, sans-serif");
        contactText.setAttribute("data-editable", "true");
        contactText.textContent = contactInfo.join(" | ");
        textGroup.appendChild(contactText);
        currentY += 25;
      }

      // Address
      if (
        data.personalInfo.address ||
        data.personalInfo.city ||
        data.personalInfo.country
      ) {
        const addressParts = [
          data.personalInfo.address,
          data.personalInfo.city,
          data.personalInfo.country,
        ].filter(Boolean);

        if (addressParts.length > 0) {
          const addressText = svgDoc.createElementNS(namespace, "text");
          addressText.setAttribute("x", leftMargin.toString());
          addressText.setAttribute("y", currentY.toString());
          addressText.setAttribute("font-size", "12");
          addressText.setAttribute("fill", "#333333");
          addressText.setAttribute("font-family", "Arial, sans-serif");
          addressText.setAttribute("data-editable", "true");
          addressText.textContent = addressParts.join(", ");
          textGroup.appendChild(addressText);
          currentY += 30;
        }
      }

      // Experience
      if (data.experience.length > 0) {
        currentY += 20;
        const expTitle = svgDoc.createElementNS(namespace, "text");
        expTitle.setAttribute("x", leftMargin.toString());
        expTitle.setAttribute("y", currentY.toString());
        expTitle.setAttribute("font-size", "16");
        expTitle.setAttribute("font-weight", "bold");
        expTitle.setAttribute("fill", "#000000");
        expTitle.setAttribute("font-family", "Arial, sans-serif");
        expTitle.textContent = "Professional Experience";
        textGroup.appendChild(expTitle);
        currentY += 25;
      }

      data.experience.forEach((exp) => {
        // Job Title
        if (exp.title) {
          const titleText = svgDoc.createElementNS(namespace, "text");
          titleText.setAttribute("x", leftMargin.toString());
          titleText.setAttribute("y", currentY.toString());
          titleText.setAttribute("font-size", "14");
          titleText.setAttribute("font-weight", "bold");
          titleText.setAttribute("fill", "#000000");
          titleText.setAttribute("font-family", "Arial, sans-serif");
          titleText.setAttribute("data-editable", "true");
          titleText.textContent = exp.title;
          textGroup.appendChild(titleText);
          currentY += 20;
        }

        // Company and dates
        if (exp.company || exp.startDate || exp.endDate) {
          const companyText = svgDoc.createElementNS(namespace, "text");
          companyText.setAttribute("x", leftMargin.toString());
          companyText.setAttribute("y", currentY.toString());
          companyText.setAttribute("font-size", "12");
          companyText.setAttribute("fill", "#666666");
          companyText.setAttribute("font-family", "Arial, sans-serif");
          companyText.setAttribute("data-editable", "true");
          const companyParts = [
            exp.company,
            `${exp.startDate} - ${exp.endDate}`,
          ].filter(Boolean);
          companyText.textContent = companyParts.join(" | ");
          textGroup.appendChild(companyText);
          currentY += 20;
        }

        // Description
        if (exp.description) {
          const descText = svgDoc.createElementNS(namespace, "text");
          descText.setAttribute("x", leftMargin.toString());
          descText.setAttribute("y", currentY.toString());
          descText.setAttribute("font-size", "11");
          descText.setAttribute("fill", "#000000");
          descText.setAttribute("font-family", "Arial, sans-serif");
          descText.setAttribute("data-editable", "true");

          const maxWidth = widthNum * 0.8;
          const words = exp.description.split(" ");
          const lines: string[] = [];
          let currentLine = "";
          words.forEach((word) => {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            if (testLine.length * 6 > maxWidth && currentLine) {
              lines.push(currentLine.trim());
              currentLine = word + " ";
            } else {
              currentLine = testLine + " ";
            }
          });
          if (currentLine.trim()) lines.push(currentLine.trim());

          lines.forEach((line, index) => {
            const tspan = svgDoc.createElementNS(namespace, "tspan");
            tspan.setAttribute("x", leftMargin.toString());
            tspan.setAttribute("dy", index === 0 ? "0" : "14");
            tspan.textContent = line;
            descText.appendChild(tspan);
          });
          textGroup.appendChild(descText);
          currentY += lines.length * 14 + 15;
        }
      });

      // Education
      if (data.education.length > 0) {
        currentY += 20;
        const eduTitle = svgDoc.createElementNS(namespace, "text");
        eduTitle.setAttribute("x", leftMargin.toString());
        eduTitle.setAttribute("y", currentY.toString());
        eduTitle.setAttribute("font-size", "16");
        eduTitle.setAttribute("font-weight", "bold");
        eduTitle.setAttribute("fill", "#000000");
        eduTitle.setAttribute("font-family", "Arial, sans-serif");
        eduTitle.textContent = "Education";
        textGroup.appendChild(eduTitle);
        currentY += 25;
      }

      data.education.forEach((edu) => {
        if (edu.degree || edu.institution) {
          const eduText = svgDoc.createElementNS(namespace, "text");
          eduText.setAttribute("x", leftMargin.toString());
          eduText.setAttribute("y", currentY.toString());
          eduText.setAttribute("font-size", "13");
          eduText.setAttribute("font-weight", "bold");
          eduText.setAttribute("fill", "#000000");
          eduText.setAttribute("font-family", "Arial, sans-serif");
          eduText.setAttribute("data-editable", "true");
          eduText.textContent = `${edu.degree}${
            edu.degree && edu.institution ? " - " : ""
          }${edu.institution}`;
          textGroup.appendChild(eduText);
          currentY += 18;
        }

        if (edu.startDate || edu.endDate) {
          const dateText = svgDoc.createElementNS(namespace, "text");
          dateText.setAttribute("x", leftMargin.toString());
          dateText.setAttribute("y", currentY.toString());
          dateText.setAttribute("font-size", "11");
          dateText.setAttribute("fill", "#666666");
          dateText.setAttribute("font-family", "Arial, sans-serif");
          dateText.setAttribute("data-editable", "true");
          dateText.textContent = `${edu.startDate}${
            edu.startDate && edu.endDate ? " - " : ""
          }${edu.endDate}`;
          textGroup.appendChild(dateText);
          currentY += 20;
        }
      });

      // Skills
      if (data.skills.length > 0) {
        currentY += 20;
        const skillsTitle = svgDoc.createElementNS(namespace, "text");
        skillsTitle.setAttribute("x", leftMargin.toString());
        skillsTitle.setAttribute("y", currentY.toString());
        skillsTitle.setAttribute("font-size", "16");
        skillsTitle.setAttribute("font-weight", "bold");
        skillsTitle.setAttribute("fill", "#000000");
        skillsTitle.setAttribute("font-family", "Arial, sans-serif");
        skillsTitle.textContent = "Skills";
        textGroup.appendChild(skillsTitle);
        currentY += 20;

        const skillsText = svgDoc.createElementNS(namespace, "text");
        skillsText.setAttribute("x", leftMargin.toString());
        skillsText.setAttribute("y", currentY.toString());
        skillsText.setAttribute("font-size", "12");
        skillsText.setAttribute("fill", "#000000");
        skillsText.setAttribute("font-family", "Arial, sans-serif");
        skillsText.setAttribute("data-editable", "true");
        skillsText.textContent = data.skills.map((s) => s.name).join(", ");
        textGroup.appendChild(skillsText);
      }

      // Convert back to string
      const serializer = new XMLSerializer();
      const updatedSvgString = serializer.serializeToString(svgElement);
      setEditedSvg(updatedSvgString);
    } catch (error) {
      console.error("Error updating SVG:", error);
      setEditedSvg(svg);
    }
  };

  const handleDataChange = (newData: CVData) => {
    setCvData(newData);
  };

  const handleDownload = () => {
    if (!editedSvg) return;

    const blob = new Blob([editedSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${cvData.personalInfo.firstName || "resume"}_${
      cvData.personalInfo.lastName || "template"
    }.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = async () => {
    if (!editedSvg) {
      alert("لطفا ابتدا SVG را بارگذاری کنید");
      return;
    }

    try {
      // Convert SVG to canvas then to PNG
      const svgData = editedSvg;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      // Set canvas size (A4 at 300 DPI)
      canvas.width = 2480; // A4 width at 300 DPI
      canvas.height = 3508; // A4 height at 300 DPI

      return new Promise<void>((resolve, reject) => {
        img.onload = () => {
          if (ctx) {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Calculate scaling to fit
            const scale = Math.min(
              canvas.width / img.width,
              canvas.height / img.height
            );
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `${cvData.personalInfo.firstName || "resume"}_${
                  cvData.personalInfo.lastName || "template"
                }.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                resolve();
              } else {
                reject(new Error("Failed to create blob"));
              }
            }, "image/png");
          }
        };

        img.onerror = (error) => {
          console.error("Image load error:", error);
          reject(new Error("Failed to load SVG image"));
        };

        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);
        img.src = url;

        // Clean up URL after loading
        img.onload = (function (originalOnload: EventListener | null) {
          return function (this: GlobalEventHandlers, ev: Event) {
            URL.revokeObjectURL(url);
            if (originalOnload) {
              (originalOnload as EventListener).call(this, ev);
            }
          };
        })(img.onload);
      });
    } catch (error) {
      console.error("Error converting to PNG:", error);
      alert("خطا در تبدیل به PNG. لطفا به صورت SVG دانلود کنید.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-12">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">
              Template Editor
            </h1>
            <p className="text-gray-600">
              ویرایش و دانلود رزومه با استفاده از Template01
            </p>
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              دانلود SVG
            </button>
            <button
              type="button"
              onClick={handleDownloadPNG}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              دانلود PNG
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Form */}
          <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
            <CVEditorForm data={cvData} onChange={handleDataChange} />
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-6rem)]">
            <div className="bg-white rounded-lg border border-gray-200 p-4 h-full">
              <h2 className="text-xl text-black font-bold mb-4">Preview</h2>
              <div className="h-[calc(100%-3rem)] border border-gray-300 rounded-md overflow-auto bg-gray-100 flex items-center justify-center p-4">
                <div
                  ref={svgRef}
                  className="max-w-full"
                  dangerouslySetInnerHTML={{ __html: editedSvg || svgContent }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
