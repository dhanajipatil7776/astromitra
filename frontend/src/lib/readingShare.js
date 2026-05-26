import html2pdf from "html2pdf.js";

export async function downloadReadingPdf(reading) {
  const node = document.getElementById("reading-pdf-target");
  if (!node) return;

  const opt = {
    margin: 0.4,
    filename: `AstroMitra-${(reading.name || "reading").replace(/\s+/g, "-")}.pdf`,
    image: { type: "jpeg", quality: 0.95 },
    html2canvas: {
      scale: 2,
      backgroundColor: "#030305",
      useCORS: true,
      logging: false,
    },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] },
  };

  await html2pdf().set(opt).from(node).save();
}

export function buildShareUrl(reading) {
  if (!reading?.id) return window.location.origin;
  return `${window.location.origin}/reading/${reading.id}`;
}

export async function copyShareLink(reading) {
  const url = buildShareUrl(reading);
  try {
    await navigator.clipboard.writeText(url);
    return url;
  } catch {
    return url;
  }
}

export function buildWhatsAppShare(reading) {
  const url = buildShareUrl(reading);
  const text = encodeURIComponent(
    `My AstroMitra reading just dropped 🔮✨\n\n"${(reading?.overview || "").slice(0, 200)}…"\n\nGet yours instantly 👉 ${url}`
  );
  return `https://wa.me/?text=${text}`;
}
