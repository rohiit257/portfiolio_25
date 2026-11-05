"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ContentProvider } from "@/lib/content";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return <TooltipProvider><Toaster /><Sonner /><ContentProvider>{children}</ContentProvider></TooltipProvider>;
}
