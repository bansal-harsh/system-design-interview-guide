"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenCheck, CheckCircle2, Menu } from "lucide-react";

import { LogoutButton } from "@/components/auth/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { AuthUser } from "@/lib/auth/types";
import { cn, formatModuleIndex } from "@/lib/utils";
import type { Module } from "@/lib/content/types";

type SidebarNavProps = {
  modules: Module[];
  user: AuthUser | null;
  completedSlugs: string[];
};

function SidebarContent({ modules, user, completedSlugs }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-sidebar-border px-5 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <BookOpenCheck className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">System Design</p>
            <p className="text-xs text-muted-foreground">Learning platform</p>
          </div>
        </Link>
        <ThemeToggle />
      </div>

      <div className="px-5 py-5">
        <Badge className="mb-3 w-fit">Progressive curriculum</Badge>
        <p className="text-sm leading-6 text-muted-foreground">
          Each module is deployable on its own and automatically discovered from the content folder.
        </p>
        <div className="mt-4 rounded-[1.25rem] border border-sidebar-border px-4 py-4">
          {user ? (
            <>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground">{completedSlugs.length} lessons completed</span>
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <p className="text-sm font-medium">Guest mode</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Sign in to store completed lessons on your account.
              </p>
              <Button asChild className="mt-3 w-full" size="sm">
                <Link
                  href={{
                    pathname: "/auth",
                    query: {
                      mode: "login",
                      next: "/learn"
                    }
                  }}
                >
                  Sign in
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 pb-4">
        <nav className="space-y-2">
          <Link
            href="/learn"
            className={cn(
              "flex items-center rounded-2xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              pathname === "/learn" && "bg-accent text-accent-foreground"
            )}
          >
            Course overview
          </Link>
          {modules.map((module) => {
            const isActive = pathname === `/learn/${module.slug}`;
            const isCompleted = completedSlugs.includes(module.slug);

            return (
              <Link
                key={module.id}
                href={`/learn/${module.slug}`}
                className={cn(
                  "group flex items-start gap-3 rounded-2xl px-3 py-3 hover:bg-accent",
                  isActive && "bg-accent"
                )}
              >
                <span className="mt-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                  {formatModuleIndex(module.order)}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 truncate text-sm font-medium text-foreground/90">
                    <span className={cn("truncate", isActive ? "text-foreground" : "text-foreground/80")}>{module.title}</span>
                    {isCompleted ? <CheckCircle2 className="size-4 shrink-0 text-primary" /> : null}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{module.description}</p>
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}

export function SidebarNav({ modules, user, completedSlugs }: SidebarNavProps) {
  return (
    <>
      <aside className="glass-panel fixed inset-y-4 left-4 hidden w-[300px] overflow-hidden rounded-[2rem] border border-sidebar-border lg:block">
        <SidebarContent modules={modules} user={user} completedSlugs={completedSlugs} />
      </aside>
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border/70 bg-background/85 px-4 py-3 backdrop-blur lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open curriculum">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SidebarContent modules={modules} user={user} completedSlugs={completedSlugs} />
          </SheetContent>
        </Sheet>
        <ThemeToggle />
      </div>
    </>
  );
}
