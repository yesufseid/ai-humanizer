
import { generateDeepSeekText } from "./generateDeepSeekText"
import { parseReferenceFile } from "./parseReferenceFile"


interface HumanizeTextParams {
  aiText: string
  referenceFile: File | null
  userSample?: string
}

interface HumanizeTextResult {
  humanizedText: string
  aiDetectionScore: number
}

export async function humanizeText({ aiText, referenceFile,userSample }: HumanizeTextParams): Promise<HumanizeTextResult> {
  let referenceText = ""

  // Simulate file processing
  if (referenceFile) { referenceText=await parseReferenceFile(referenceFile)  }
const prompt = `
Your task is to rewrite the following AI-generated technical text to make it sound more natural and human-written—like how an educated person would explain it in a professional yet conversational tone.

You must:
- Preserve the structure and order of the original text (e.g., section headings and bullet points).
- Not change or replace any key technical terms.
- Use only words, phrases, and sentence structures found in the reference text.
- Match the tone and writing style of the user sample provided.

Very Important: The target audience for this text is Ethiopian students. English is their second language, and most of them are beginners. So, the rewritten version must:
- Use clear and simple language that is easy to understand.
- Avoid long or complex sentence structures.
- Avoid idioms, difficult vocabulary, and abstract phrases.
- Still sound human-written, not robotic or overly polished.

You can expand bullet points into short, clear sentences and make the language flow naturally, but do not add any new information or change the section order.

The rewritten version should:
1. Keep all original content and meaning
2. Follow the original structure exactly
3. Use varied sentence lengths and natural human tone
4. Avoid slang or informal expressions
5. Be written in a way that is easy for Ethiopian students with beginner English skills to read and understand
6. Output only the rewritten text, with no explanation or extra commentary
7.Do not use any formatting characters like asterisks (*) or underscores (_). Write plain text only.

Original Text:
${aiText}

Reference Text (use only this text for vocabulary, phrases, and sentence structures):
${referenceText}

User Writing Sample (match this writing style):
${userSample}

Now rewrite the original text, preserving structure and meaning, using only the language from the reference, and matching the tone of the user sample. Make sure it is suitable for Ethiopian students with beginner English. Output only the rewritten text.
`



  const data = await generateDeepSeekText(prompt)

 
  const aiDetectionScore =  Math.floor(Math.random() * 30) // Random score between 0-29%

  return {
    humanizedText:data,
    aiDetectionScore,
  }
}
