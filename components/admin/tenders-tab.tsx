import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload } from "lucide-react"

export default function TendersTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold">Manage Tenders</h2>
          <p className="text-muted-foreground">Create and manage tender notifications</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Tender
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Tender</CardTitle>
          <CardDescription>Add a new tender notification for publication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tender-title">Tender Title</Label>
              <Input id="tender-title" placeholder="Enter tender title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tender-no">Tender Number</Label>
              <Input id="tender-no" placeholder="PC/2024/TENDER/XXX" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tender-description">Description</Label>
            <Textarea id="tender-description" placeholder="Enter tender description" rows={4} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estimated-value">Estimated Value (₹)</Label>
              <Input id="estimated-value" placeholder="0.00" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-date">Last Date for Submission</Label>
              <Input id="last-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="opening-date">Opening Date</Label>
              <Input id="opening-date" type="date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tender-file">Tender Document</Label>
            <Input id="tender-file" type="file" accept=".pdf,.doc,.docx" />
          </div>
          <div className="flex gap-2">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Publish Tender
            </Button>
            <Button variant="outline">Save as Draft</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}