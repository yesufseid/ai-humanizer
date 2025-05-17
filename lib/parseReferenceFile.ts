
import mammoth from "mammoth";
import * as pdfjsLib from 'pdfjs-dist';
// Set the workerSrc to the local file
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export async function parseReferenceFile(file: File): Promise<string> {
  console.log(file);
  
  const buffer:any = await file.arrayBuffer();
  const fileType = file.name.split(".").pop()?.toLowerCase();

  if (fileType === "txt") {
    return new TextDecoder().decode(buffer);
  }

  if (fileType === "pdf") {
    const loadingTask = pdfjsLib.getDocument({ data: buffer });
    const pdf = await loadingTask.promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(" ") + " ";
    }
    return text.trim();
  }

  if (fileType === "docx") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error("Unsupported file type. Only txt, pdf, and docx are supported.");
}
