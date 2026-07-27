const A4_WIDTH = 595;
const A4_HEIGHT = 842;

export async function captureElementToCanvas(
  element: HTMLElement,
  backgroundColor = "#ffffff"
) {
  const html2canvasModule = await import("html2canvas");
  const html2canvasFn = html2canvasModule.default;

  return html2canvasFn(element, {
    scale: 2,
    backgroundColor,
    useCORS: true,
    logging: false,
    width: A4_WIDTH,
    height: A4_HEIGHT,
  });
}

export async function downloadElementAsPng(
  element: HTMLElement,
  filename: string,
  backgroundColor = "#ffffff"
) {
  const canvas = await captureElementToCanvas(element, backgroundColor);
  return new Promise<void>((resolve, reject) => {
    canvas.toBlob((blob: Blob | null) => {
      if (!blob) {
        reject(new Error("Failed to create PNG blob"));
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename.endsWith(".png") ? filename : `${filename}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      resolve();
    }, "image/png");
  });
}

export async function downloadElementAsPdf(
  element: HTMLElement,
  filename: string,
  backgroundColor = "#ffffff"
) {
  const canvas = await captureElementToCanvas(element, backgroundColor);
  const jsPDFModule = await import("jspdf");
  const jsPDF = jsPDFModule.jsPDF;

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [A4_WIDTH, A4_HEIGHT],
  });
  pdf.addImage(imgData, "PNG", 0, 0, A4_WIDTH, A4_HEIGHT);
  pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}

export function buildCvFilename(
  firstName: string,
  lastName: string,
  ext: "png" | "pdf"
): string {
  const base = [firstName, lastName].filter(Boolean).join("_") || "resume";
  return `${base}.${ext}`;
}
