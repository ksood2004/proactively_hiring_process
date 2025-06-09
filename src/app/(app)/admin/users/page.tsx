"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, ShieldCheck, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock user data
const mockUsers = [
  { id: "user-A", name: "Alice Smith", email: "alice@example.com", role: "Admin", lastActive: "2 hours ago", avatar: "https://placehold.co/40x40.png?text=AS" },
  { id: "user-B", name: "Bob Johnson", email: "bob@example.com", role: "Editor", lastActive: "1 day ago", avatar: "https://placehold.co/40x40.png?text=BJ" },
  { id: "user-C", name: "Charlie Brown", email: "charlie@example.com", role: "Viewer", lastActive: "5 minutes ago", avatar: "https://placehold.co/40x40.png?text=CB" },
  { id: "user-D", name: "Diana Prince", email: "diana@example.com", role: "Filler", lastActive: "Online", avatar: "https://placehold.co/40x40.png?text=DP" },
];


export default function AdminUsersPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline flex items-center"><ShieldCheck className="mr-3 h-8 w-8 text-primary"/> Admin - User Management</h1>
        <Button><Users className="mr-2 h-4 w-4"/> Invite New User</Button>
      </div>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-headline">All Users</CardTitle>
          <CardDescription>Manage user accounts, roles, and permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" title="Edit User">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" title="Delete User">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
