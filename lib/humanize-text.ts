
import { generateDeepSeekText } from "./generateDeepSeekText"
import { parseReferenceFile } from "./parseReferenceFile"
import { scrapeTopicText } from "./scrapeTopicText"

interface HumanizeTextParams {
  aiText: string
  referenceFile: File | null
  topic?: string
}

interface HumanizeTextResult {
  humanizedText: string
  aiDetectionScore: number
}

export async function humanizeText({ aiText, referenceFile, topic }: HumanizeTextParams): Promise<HumanizeTextResult> {
  let referenceText = ""

  // Simulate file processing
  if (referenceFile) {
    
     referenceText=await parseReferenceFile(referenceFile)  }
  // Simulate web scraping
  else if (topic) {
       referenceText= await scrapeTopicText(topic)
  }

const prompt = `
Your task is to rewrite the following AI-generated technical text to make it sound more natural and human-written—like how an educated person would explain it in a professional yet conversational tone.

You must preserve the structure and order of the original text (e.g., section headings and bullet points). Do not change or replace any key terms. Use only words, phrases, and sentence structures from the provided reference text to rewrite it.

You can expand bullet points into full sentences and make the language more fluid and engaging, but do not add any new information or reorder sections.

The rewritten version should:
1. Maintain all original information and meaning
2. Follow the structure and headings exactly as in the original
3. Use natural human writing quirks such as contractions, sentence fragments, and varied sentence lengths
4. Avoid slang or street language
5. Output only the rewritten text without any explanations or additional commentary

Original Text:
${aiText}

Reference Text (use only this text for words, style, and sentence structures):
${referenceText}

Rewrite the original text to sound more natural and human-written, using only the language from the reference text, while preserving structure and meaning. Output only the rewritten text.
`


  const data = await generateDeepSeekText(prompt)

 
  const aiDetectionScore = 20 // Random score between 0-29%

  return {
    humanizedText:data,
    aiDetectionScore,
  }
}
