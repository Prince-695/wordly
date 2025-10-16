"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, PenSquare, Home, BookOpen } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import { ThemeToggle } from "~/components/theme-toggle";
import { UserNav } from "~/components/user-nav";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/blog", label: "Blog", icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <PenSquare className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">
            Wordly
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-md font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="relative">
              <Menu className={`h-5 w-5 transition-all ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
              {/* <X className={`h-5 w-5 absolute transition-all ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} /> */}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] p-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="px-6 py-5 border-b">
                <SheetTitle className="text-lg font-semibold">
                  Menu
                </SheetTitle>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto py-4">
                {/* Navigation Links */}
                <div className="px-3 mb-6">
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/80 transition-colors"
                      >
                        <link.icon className="h-4 w-4 flex-shrink-0" />
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="px-6 mb-4">
                  <div className="h-px bg-border" />
                </div>

                {/* User Section */}
                <div className="px-3 mb-6">
                  <div className="mb-2 px-3">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Account
                    </span>
                  </div>
                  <div onClick={() => setIsOpen(false)}>
                    <UserNav mobile />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t px-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
