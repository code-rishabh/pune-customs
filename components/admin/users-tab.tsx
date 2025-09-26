"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Loader2, Trash2, UserPlus, Edit } from "lucide-react"
import { toast } from "sonner"

interface AdminUser {
  _id: string
  username: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

interface UsersTabProps {
  adminUsers: AdminUser[]
  loadingUsers: boolean
  currentUserId?: string
  onRefresh: () => void
}

export default function UsersTab({ adminUsers, loadingUsers, currentUserId, onRefresh }: UsersTabProps) {
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [showAddUser, setShowAddUser] = useState(false)
  const [userForm, setUserForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "admin"
  })

  const createUser = async () => {
    try {
      const response = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm)
      })
      const data = await response.json()
      if (response.ok) {
        toast.success('User created successfully')
        setUserForm({ username: "", name: "", email: "", password: "", role: "admin" })
        setShowAddUser(false)
        onRefresh()
      } else {
        toast.error(data.error || 'Failed to create user')
      }
    } catch (error) {
      toast.error('Failed to create user')
    }
  }

  const updateUser = async () => {
    if (!editingUser) return
    try {
      const response = await fetch(`/api/admin/users/${editingUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role,
          password: userForm.password
        })
      })
      const data = await response.json()
      if (response.ok) {
        toast.success('User updated successfully')
        setEditingUser(null)
        setUserForm({ username: "", name: "", email: "", password: "", role: "admin" })
        onRefresh()
      } else {
        toast.error(data.error || 'Failed to update user')
      }
    } catch (error) {
      toast.error('Failed to update user')
    }
  }

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      const response = await fetch(`/api/admin/users?id=${userId}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (response.ok) {
        toast.success('User deleted successfully')
        onRefresh()
      } else {
        toast.error(data.error || 'Failed to delete user')
      }
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage admin users and their permissions</p>
        </div>
        <Button onClick={() => setShowAddUser(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Add User Form */}
      {showAddUser && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Admin User</CardTitle>
            <CardDescription>Create a new administrator account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-username">Username</Label>
                <Input
                  id="new-username"
                  placeholder="Enter username"
                  value={userForm.username}
                  onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-name">Full Name</Label>
                <Input
                  id="new-name"
                  placeholder="Enter full name"
                  value={userForm.name}
                  onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-email">Email</Label>
                <Input
                  id="new-email"
                  type="email"
                  placeholder="Enter email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter password"
                  value={userForm.password}
                  onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-role">Role</Label>
              <Select value={userForm.role} onValueChange={(value) => setUserForm({...userForm, role: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={createUser}>Create User</Button>
              <Button variant="outline" onClick={() => {
                setShowAddUser(false)
                setUserForm({ username: "", name: "", email: "", password: "", role: "admin" })
              }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit User Form */}
      {editingUser && (
        <Card>
          <CardHeader>
            <CardTitle>Edit User</CardTitle>
            <CardDescription>Update user information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select value={editingUser.role} onValueChange={(value) => setEditingUser({...editingUser, role: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-password">New Password (optional)</Label>
                <Input
                  id="edit-password"
                  type="password"
                  placeholder="Leave blank to keep current password"
                  value={userForm.password}
                  onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={updateUser}>Update User</Button>
              <Button variant="outline" onClick={() => {
                setEditingUser(null)
                setUserForm({ username: "", name: "", email: "", password: "", role: "admin" })
              }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>List of users with admin access</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingUsers ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading users...
            </div>
          ) : (
            <div className="space-y-4">
              {adminUsers.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No admin users found. Create the first one above.
                </p>
              ) : (
                adminUsers.map((user) => (
                  <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role === 'admin' ? 'default' : user.role === 'editor' ? 'secondary' : 'outline'}>
                        {user.role}
                      </Badge>
                      {user._id === currentUserId && (
                        <Badge variant="outline">You</Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingUser(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {user._id !== currentUserId && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteUser(user._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}