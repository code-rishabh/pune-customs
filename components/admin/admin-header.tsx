import { Button } from "@/components/ui/button"
import { Shield, LogOut } from "lucide-react"

interface AdminHeaderProps {
  userName?: string
  onLogout: () => void
}

export default function AdminHeader({ userName, onLogout }: AdminHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold">Pune Customs Admin</h1>
              <p className="text-sm text-muted-foreground">
                Welcome, {userName}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}