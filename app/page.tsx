"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { humanizeText } from "@/lib/humanize-text"
import { FileUpload } from "@/components/file-upload"
import { LoadingSpinner } from "@/components/loading-spinner"
import { AlertCircle, CheckCircle2, Copy, Download, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Home() {
  const [aiText, setAiText] = useState("")
  const [topic, setTopic] = useState("")
  const [referenceFile, setReferenceFile] = useState<File | null>(null)
  const [humanizedText, setHumanizedText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [aiDetectionScore, setAiDetectionScore] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleFileChange = (file: File | null) => {
    setReferenceFile(file)
  }

  const handleSubmit = async () => {
    if (!aiText) {
      setError("Please enter some AI-generated text to humanize")
      return
    }
    setError(null)
    setIsProcessing(true)

    try {
      // In a real implementation, this would call an API endpoint
      const result = await humanizeText({
        aiText,
        referenceFile,
        userSample:topic,
      })

      setHumanizedText(result.humanizedText)
      setAiDetectionScore(result.aiDetectionScore)
    } catch (err) {
      setError("An error occurred while processing your text. Please try again.")
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(humanizedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadText = () => {
    const element = document.createElement("a")
    const file = new Blob([humanizedText], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "humanized-text.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const resetForm = () => {
    setAiText("")
    setTopic("")
    setReferenceFile(null)
    setHumanizedText("")
    setAiDetectionScore(null)
    setError(null)
  }

  return (
    <main className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">AI Text Humanizer</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transform AI-generated content into natural, human-like writing by analyzing and incorporating style patterns
          from reference content.
        </p>
      </div>

      <Tabs defaultValue="input" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="output" disabled={!humanizedText}>
            Output
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input">
          <Card>
            <CardHeader>
              <CardTitle>Input AI-Generated Text</CardTitle>
              <CardDescription>Paste your AI-generated text and provide a reference source</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ai-text">AI-Generated Text</Label>
                <Textarea
                  id="ai-text"
                  placeholder="Paste your AI-generated text here..."
                  className="min-h-[200px]"
                  value={aiText}
                  onChange={(e) => setAiText(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-px flex-1 bg-border"></div>
                  <span className="px-3 text-sm text-muted-foreground">Reference Source</span>
                  <div className="h-px flex-1 bg-border"></div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="reference-file">Upload Reference File</Label>
                    <FileUpload onFileChange={handleFileChange} />
                    <p className="text-xs text-muted-foreground">
                      Upload a .txt, .docx, or .pdf file to use as a style reference
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic">Enter Sample writing style</Label>
                    <Textarea
                      id="topic"
                      placeholder="please share as your writing style  here..."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll use the sample writing style to rewrite the content  
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={resetForm} disabled={isProcessing}>
                  Reset
                </Button>
                <Button onClick={handleSubmit} disabled={isProcessing}>
                  {isProcessing ? <LoadingSpinner /> : "Humanize Text"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="output">
          <Card>
            <CardHeader>
              <CardTitle>Humanized Text</CardTitle>
              <CardDescription>Your text has been rewritten to appear more human-like</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>AI Detection Likelihood</Label>
                  <span className="text-sm font-medium">
                    {aiDetectionScore !== null ? `${aiDetectionScore}%` : "N/A"}
                  </span>
                </div>
                <Progress value={aiDetectionScore || 0} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Lower scores indicate text that appears more human-written
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Humanized Result</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      {copied ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadText}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="border rounded-md p-4 min-h-[200px] bg-muted/30">
                  {humanizedText ? (
                    <div className="whitespace-pre-wrap">{humanizedText}</div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Processing your text...
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
