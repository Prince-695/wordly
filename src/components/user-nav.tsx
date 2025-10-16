"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { ChevronDown, User, PenSquare, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "sonner";

interface UserNavProps {
  mobile?: boolean;
}

export function UserNav({ mobile = false }: UserNavProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className={`h-10 ${mobile ? 'w-full' : 'w-24'} bg-muted animate-pulse rounded`} />
    );
  }

  if (!session) {
    if (mobile) {
      return (
        <div className="flex flex-col gap-2">
          <Button variant="outline" asChild className="w-full justify-center h-10 text-sm">
            <Link href="/auth/signin" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Sign In
            </Link>
          </Button>
          <Button asChild className="w-full h-10 text-sm">
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/signup">Sign Up</Link>
        </Button>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    toast.success("Signed out successfully");
  };

  // Mobile Layout
  if (mobile) {
    return (
      <div className="flex flex-col">
        {/* User Info */}
        <div className="  gap-3 px-3 py-2.5 bg-muted/30 rounded-md mb-3">
          <p className="text-xs text-muted-foreground">Signed in as</p>
          <p className="text-md font-medium">{session.user?.name}</p>
        </div>
        
        {/* Menu Items */}
        <div className="flex flex-col gap-1">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/80 transition-colors"
          >
            <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            href="/admin/posts/new" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/80 transition-colors"
          >
            <PenSquare className="h-4 w-4 flex-shrink-0" />
            <span>Create Post</span>
          </Link>
          
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-left"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 ml-2">
          <User className="h-4 w-4" />
          <span>{session.user?.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 ml-2 mt-2">
        <DropdownMenuItem asChild>
          <Link href="/admin" className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/admin/posts/new" className="cursor-pointer">
            <PenSquare className="mr-2 h-4 w-4" />
            Create Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
