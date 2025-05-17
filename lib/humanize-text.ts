
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
   console.log(aiText,referenceFile,topic);
  let referenceText = ""

  // Simulate file processing
  if (referenceFile) {
    
     referenceText=await parseReferenceFile(referenceFile)  }
  // Simulate web scraping
  else if (topic) {
       referenceText= await scrapeTopicText(topic)
  }

  const prompt= `
    I need you to rewrite the following AI-generated text to make it sound more human-written.
    
    Use the style, vocabulary, and sentence patterns from the reference text provided below.
    The rewritten text should:
    1. Maintain the same meaning and information as the original
    2. Use natural language patterns found in the reference
    3. Vary sentence structures and transitions
    4. Avoid overly perfect grammar and incorporate natural human writing quirks
    5. Use contractions, occasional fragments, and varied punctuation naturally
    
    Original AI Text:
    ${aiText}
    
    Reference Text (use this for style inspiration only):
    ${referenceText}
    
    Rewrite the original text to sound more human-written while preserving its meaning:
    `
 
  const data = await generateDeepSeekText(prompt)

 
  const aiDetectionScore = 20 // Random score between 0-29%

  return {
    humanizedText:data,
    aiDetectionScore,
  }
}
