"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, FilePlus2, ListChecks, BarChart3, Settings, LogOut, ChevronDown, ChevronUp, Users, ShieldCheck } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from '@/components/ui/scroll-area';

const AppLogo = () => (
  <Link href="/dashboard" className="flex items-center gap-2 px-2">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-8 w-8 text-sidebar-primary">
      <rect width="256" height="256" fill="none"></rect>
      <path d="M88,134.9,175.2,200A16,16,0,0,0,200,185.1V60a16,16,0,0,0-16-16H64A16,16,0,0,0,48,60V188a16,16,0,0,0,24.8,13.1Z"
        fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
      <polyline points="88 134.9 88 48 176 48" fill="none" stroke="currentColor" strokeLinecap="round"
        strokeLinejoin="round" strokeWidth="16"></polyline>
    </svg>
    <h1 className="text-xl font-bold font-headline text-sidebar-foreground group-data-[collapsible=icon]:hidden">
      FormFlow
    </h1>
  </Link>
);


export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [openSubMenus, setOpenSubMenus] = React.useState<Record<string, boolean>>({});

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const toggleSubMenu = (key: string) => {
    setOpenSubMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LayoutDashboard className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // This should ideally be handled by middleware or route protection higher up.
    // For now, redirect if not logged in.
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null; 
  }
  

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="h-16 flex items-center justify-between p-2">
          <AppLogo />
        </SidebarHeader>
        <ScrollArea className="h-[calc(100vh-8rem)]"> {/* Adjust height based on header/footer */}
          <SidebarContent>
            <SidebarMenu className="space-y-1 p-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard')} tooltip="Dashboard">
                  <Link href="/dashboard"><LayoutDashboard /> <span>Dashboard</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => toggleSubMenu('forms')} isActive={isActive('/forms')} tooltip="Forms">
                  <FilePlus2 /> <span>Forms</span>
                  {openSubMenus['forms'] ? <ChevronUp className="ml-auto h-4 w-4" /> : <ChevronDown className="ml-auto h-4 w-4" />}
                </SidebarMenuButton>
                {openSubMenus['forms'] && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={pathname === '/forms/create'}>
                        <Link href="/forms/create">Create New</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                       <SidebarMenuSubButton asChild isActive={pathname === '/forms/my-forms'}>
                        <Link href="/forms/my-forms">My Forms</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/responses')} tooltip="Responses">
                  <Link href="/responses"><ListChecks /> <span>Responses</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/analytics')} tooltip="Analytics">
                  <Link href="/analytics"><BarChart3 /> <span>Analytics</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               {user.isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => toggleSubMenu('admin')} isActive={isActive('/admin')} tooltip="Admin">
                    <ShieldCheck /> <span>Admin</span>
                    {openSubMenus['admin'] ? <ChevronUp className="ml-auto h-4 w-4" /> : <ChevronDown className="ml-auto h-4 w-4" />}
                  </SidebarMenuButton>
                  {openSubMenus['admin'] && (
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === '/admin/users'}>
                          <Link href="/admin/users">Manage Users</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === '/admin/settings'}>
                          <Link href="/admin/settings">System Settings</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarContent>
        </ScrollArea>
        <SidebarFooter className="p-2 border-t border-sidebar-border">
          <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/settings')} tooltip="Settings">
                  <Link href="/settings"><Settings /> <span>Settings</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} tooltip="Log Out">
                <LogOut /> <span>Log Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/90 px-4 backdrop-blur sm:px-8">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <div className="flex-1 text-center md:text-left">
            {/* Breadcrumbs or Page Title could go here */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || "User"} />
                  <AvatarFallback>{(user.displayName || user.email || "U")[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
