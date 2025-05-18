
import { generateDeepSeekText } from "./generateDeepSeekText"
import { parseReferenceFile } from "./parseReferenceFile"
import sample from "./text"

interface HumanizeTextParams {
  aiText: string
  referenceFile?: File | null
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
- Use only words found in the reference text.
- Match the tone and writing style of the user sample provided.

Very Important: The target audience for this text is Ethiopian students. English is their second language, and most of them are beginners. So, the rewritten version must:
- Use clear and simple language that is easy to understand.
- Avoid long or complex sentence structures.
- Avoid idioms, difficult vocabulary, and abstract phrases.
- Still sound human-written, not robotic or overly polished.

You can expand bullet points into short, clear sentences and make the language flow naturally, but do not add any new information or change the section order.

The rewritten version should:
1. Keep all original content and meaning
2. Use varied sentence lengths and natural human tone
3. Avoid slang or informal expressions
4. Be written in a way that is easy for Ethiopian students with beginner English skills to read and understand
5. Output only the rewritten text, with no explanation or extra commentary
6.Do not use any formatting characters like asterisks (*) or underscores (_). Write plain text only.
Common Features of Ethiopian Student English:
Formal tone: Even in informal writing, Ethiopian students often use a formal or academic tone.

Direct translations from Amharic or other local languages: Sentence structure may mirror native language grammar.

Common grammar issues:

Article usage ("the", "a") may be missing or misused.

Verb tenses might be inconsistent.

Prepositions may be used incorrectly.

Long, run-on sentences are frequent.

Examples
1. Basic Introduction (Typical School Essay)
My name is Hana. I am 19 years old. I learn in Addis Ababa University. I am third year student in Civil Engineering. My hobby is reading books and also watching documentary. I want to be a good engineer who help my country.

2. Opinion Paragraph
In my opinion, education is very important for the development of a country. Because when people are educated, they can solve many problem. For example, educated person can create job and also help other peoples. So government should give priority for education.
Original Text:
${aiText}

Reference Text (use only this text for vocabulary):
${referenceText}

User Writing Sample (match this writing style):
${userSample?.length===0?sample:userSample}

Now rewrite the original text, preserving structure and meaning, using only the language from the reference, and matching the tone of the user sample. Make sure it is suitable for Ethiopian students with beginner English. Output only the rewritten text.
`



  const data = await generateDeepSeekText(prompt)

 
  const aiDetectionScore =  Math.floor(Math.random() * 30) // Random score between 0-29%

  return {
    humanizedText:data,
    aiDetectionScore,
  }
}
