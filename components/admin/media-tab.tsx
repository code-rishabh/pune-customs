"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, Image as ImageIcon } from "lucide-react"
import { getSlidesClient } from "@/lib/slider"
import { trackWebsiteUpdate } from "@/lib/website-update"

interface MediaTabProps {
  slideForm: { image: string; title: string; description: string }
  setSlideForm: (value: { image: string; title: string; description: string }) => void
  slideList: Array<{ image: string; title: string; description: string }>
  setSlideList: (value: Array<{ image: string; title: string; description: string }>) => void
  uploadStatus: "idle" | "uploading" | "success" | "error"
  setUploadStatus: (value: "idle" | "uploading" | "success" | "error") => void
  addStatus: "idle" | "adding" | "success" | "error"
  setAddStatus: (value: "idle" | "adding" | "success" | "error") => void
}

export default function MediaTab({ 
  slideForm, 
  setSlideForm, 
  slideList, 
  setSlideList, 
  uploadStatus, 
  setUploadStatus, 
  addStatus, 
  setAddStatus 
}: MediaTabProps) {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadStatus("uploading")
    const fd = new FormData()
    fd.append("file", file)
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      if (res.ok) {
        const data = await res.json()
        if (data?.path) {
          const filename = data.name || data.path.split('/').pop() || 'uploaded-image'
          const title = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())
          setSlideForm((s) => ({ ...s, image: data.path, title }))
          setUploadStatus("success")
          setTimeout(() => setUploadStatus("idle"), 2000)
          await trackWebsiteUpdate(`Uploaded image: "${filename}"`, "Admin")
        }
      } else {
        setUploadStatus("error")
        setTimeout(() => setUploadStatus("idle"), 3000)
      }
    } catch {
      setUploadStatus("error")
      setTimeout(() => setUploadStatus("idle"), 3000)
    }
  }

  const handleAddSlide = async () => {
    const payload = { image: slideForm.image.trim(), title: slideForm.title.trim(), description: slideForm.description.trim() }
    if (!payload.image) return
    setAddStatus("adding")
    try {
      const res = await fetch("/api/slider", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      if (res.ok) {
        const data = await res.json()
        setSlideForm({ image: "", title: "", description: "" })
        if (Array.isArray(data.slides)) {
          setSlideList(data.slides)
          setAddStatus("success")
          setTimeout(() => setAddStatus("idle"), 2000)
          await trackWebsiteUpdate(`Added homepage slide: "${payload.title || 'Untitled'}"`, "Admin")
        }
      } else {
        setAddStatus("error")
        setTimeout(() => setAddStatus("idle"), 3000)
      }
    } catch (error) {
      setAddStatus("error")
      setTimeout(() => setAddStatus("idle"), 3000)
    }
  }

  const handleRefreshSlides = async () => { 
    const s = await getSlidesClient()
    setSlideList(s) 
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold">Media Management</h2>
          <p className="text-muted-foreground">Upload and manage photos, videos, and documents</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Photos</CardTitle>
            <CardDescription>Add photos to the gallery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" accept="image/*" multiple />
            <Input placeholder="Photo title" />
            <Textarea placeholder="Photo description" rows={3} />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="enforcement">Enforcement</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full">Upload Photos</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Videos</CardTitle>
            <CardDescription>Add videos to the media section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" accept="video/*" />
            <Input placeholder="Video title" />
            <Textarea placeholder="Video description" rows={3} />
            <Input placeholder="Duration (e.g., 5:30)" />
            <Button className="w-full">Upload Video</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>Add documents and reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" accept=".pdf,.doc,.docx" />
            <Input placeholder="Document title" />
            <Textarea placeholder="Document description" rows={3} />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="report">Report</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="statistics">Statistics</SelectItem>
                <SelectItem value="policy">Policy</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full">Upload Document</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" /> Homepage Slider
          </CardTitle>
          <CardDescription>Add and preview slides used on homepage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slide-image">Image URL or /public path</Label>
              <Input 
                id="slide-image" 
                placeholder="/example.jpg or https://..." 
                value={slideForm.image} 
                onChange={(e) => setSlideForm({ ...slideForm, image: e.target.value })} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slide-title">Title</Label>
              <Input 
                id="slide-title" 
                placeholder="Enter slide title" 
                value={slideForm.title} 
                onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slide-description">Description</Label>
              <Input 
                id="slide-description" 
                placeholder="Short description" 
                value={slideForm.description} 
                onChange={(e) => setSlideForm({ ...slideForm, description: e.target.value })} 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="slide-file">Or upload from your computer</Label>
            <Input 
              id="slide-file" 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload}
            />
            {uploadStatus === "uploading" && <p className="text-sm text-blue-600">Uploading...</p>}
            {uploadStatus === "success" && <p className="text-sm text-green-600">✓ Upload successful!</p>}
            {uploadStatus === "error" && <p className="text-sm text-red-600">✗ Upload failed. Try again.</p>}
          </div>
          <div className="flex gap-2">
            <Button 
              disabled={addStatus === "adding"}
              onClick={handleAddSlide}
            >
              {addStatus === "adding" ? "Adding..." : "Add Slide"}
            </Button>
            <Button variant="outline" onClick={handleRefreshSlides}>
              Refresh Slides
            </Button>
          </div>
          {addStatus === "success" && <p className="text-sm text-green-600">✓ Slide added successfully!</p>}
          {addStatus === "error" && <p className="text-sm text-red-600">✗ Failed to add slide. Try again.</p>}
          <div className="grid gap-2">
            {slideList.length === 0 ? (
              <p className="text-sm text-muted-foreground">No slides yet. Add the first one above or refresh.</p>
            ) : (
              slideList.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{s.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{s.image}</p>
                  </div>
                  <Badge variant="secondary">#{i + 1}</Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}