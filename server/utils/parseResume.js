// server/utils/parseResume.js
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

/** Convert Node Buffer -> ArrayBuffer for mammoth */
function bufferToArrayBuffer(buffer) {
  const ab = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buffer.length; ++i) view[i] = buffer[i];
  return ab;
}

export async function parseResumeBuffer(buffer, filename = "") {
  const ext = (filename.split(".").pop() || "").toLowerCase();

  if (ext === "txt") {
    return buffer.toString("utf8").trim();
  }

  if (ext === "pdf") {
    const data = await pdfParse(buffer);
    return (data?.text || "").trim();
  }

  if (ext === "docx") {
    const arrayBuffer = bufferToArrayBuffer(buffer);
    const result = await mammoth.extractRawText({ arrayBuffer });
    return (result.value || "").trim();
  }

  throw new Error("Unsupported file type. Supported: .txt, .pdf, .docx");
}
