import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Upload } from "lucide-react"

export default function NoticesTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold">Manage Notices</h2>
          <p className="text-muted-foreground">Create and manage public notices and guidelines</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Notice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Notice</CardTitle>
          <CardDescription>Add a new notice or guideline for publication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="notice-title">Title</Label>
              <Input id="notice-title" placeholder="Enter notice title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notice-type">Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select notice type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notice">Public Notice</SelectItem>
                  <SelectItem value="guideline">Guideline</SelectItem>
                  <SelectItem value="circular">Circular</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notice-description">Description</Label>
            <Textarea id="notice-description" placeholder="Enter notice description" rows={4} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valid-until">Valid Until</Label>
              <Input id="valid-until" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notice-file">Attach Document</Label>
            <Input id="notice-file" type="file" accept=".pdf,.doc,.docx" />
          </div>
          <div className="flex gap-2">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Publish Notice
            </Button>
            <Button variant="outline">Save as Draft</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}