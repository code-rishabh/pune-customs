import { NextRequest } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export interface UploadResult {
  success: boolean
  path?: string
  filename?: string
  error?: string
}

export class FileUploader {
  private uploadDir: string
  private allowedTypes: { [key: string]: string[] }
  private maxFileSize: number // in bytes

  constructor(uploadDir = 'uploads') {
    this.uploadDir = join(process.cwd(), 'public', uploadDir)
    this.allowedTypes = {
      image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
      video: ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'],
      document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      any: []
    }
    this.maxFileSize = 50 * 1024 * 1024 // 50MB
  }

  async ensureDirectoryExists(subDir?: string): Promise<void> {
    const fullPath = subDir ? join(this.uploadDir, subDir) : this.uploadDir
    if (!existsSync(fullPath)) {
      await mkdir(fullPath, { recursive: true })
    }
  }

  generateFileName(originalName: string): string {
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const ext = originalName.split('.').pop()
    return `${timestamp}_${randomStr}.${ext}`
  }

  validateFile(file: File, type: 'image' | 'video' | 'document' | 'any' = 'any'): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > this.maxFileSize) {
      return { valid: false, error: `File size exceeds ${this.maxFileSize / (1024 * 1024)}MB limit` }
    }

    // Check file type
    if (type !== 'any' && this.allowedTypes[type].length > 0) {
      if (!this.allowedTypes[type].includes(file.type)) {
        return { valid: false, error: `Invalid file type. Allowed: ${this.allowedTypes[type].join(', ')}` }
      }
    }

    return { valid: true }
  }

  async uploadFile(
    file: File, 
    type: 'image' | 'video' | 'document' | 'any' = 'any',
    subDir?: string
  ): Promise<UploadResult> {
    try {
      // Validate file
      const validation = this.validateFile(file, type)
      if (!validation.valid) {
        return { success: false, error: validation.error }
      }

      // Ensure directory exists
      await this.ensureDirectoryExists(subDir)

      // Generate filename and path
      const filename = this.generateFileName(file.name)
      const uploadPath = subDir ? join(this.uploadDir, subDir, filename) : join(this.uploadDir, filename)
      const publicPath = subDir ? `/uploads/${subDir}/${filename}` : `/uploads/${filename}`

      // Convert File to buffer and save
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      await writeFile(uploadPath, buffer)

      return {
        success: true,
        path: publicPath,
        filename: filename
      }
    } catch (error) {
      console.error('File upload error:', error)
      return { success: false, error: 'Failed to upload file' }
    }
  }

  async uploadFromFormData(
    formData: FormData, 
    fieldName: string = 'file',
    type: 'image' | 'video' | 'document' | 'any' = 'any',
    subDir?: string
  ): Promise<UploadResult> {
    const file = formData.get(fieldName) as File
    
    if (!file) {
      return { success: false, error: 'No file found in form data' }
    }

    return this.uploadFile(file, type, subDir)
  }
}

// Default uploader instance
export const defaultUploader = new FileUploader()

// Utility functions for different media types
export const uploadImage = (file: File, subDir = 'images') => 
  defaultUploader.uploadFile(file, 'image', subDir)

export const uploadVideo = (file: File, subDir = 'videos') => 
  defaultUploader.uploadFile(file, 'video', subDir)

export const uploadDocument = (file: File, subDir = 'documents') => 
  defaultUploader.uploadFile(file, 'document', subDir)