"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Upload, X } from "lucide-react"

interface FileUploadProps {
  onFileChange: (file: File | null) => void
}

export function FileUpload({ onFileChange }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    onFileChange(selectedFile)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      setFile(droppedFile)
      onFileChange(droppedFile)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    onFileChange(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    inputRef.current?.click()
  }

  return (
    <div className="w-full">
      <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden" accept=".txt,.pdf,.docx" />

      {!file ? (
        <div
          className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">Click to upload or drag and drop</p>
          <p className="text-xs text-muted-foreground mt-1">Supports .txt, .docx, and .pdf files</p>
        </div>
      ) : (
        <div className="flex items-center justify-between border rounded-md p-3">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            <span className="text-sm font-medium truncate max-w-[180px]">{file.name}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleRemoveFile} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
    </div>
  )
}
