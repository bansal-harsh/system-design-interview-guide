import Link from "next/link";
import { ArrowRight, BookOpen, Boxes, DatabaseZap, Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSessionUser } from "@/lib/auth/session";
import { getLearningStats, getModules } from "@/lib/content/modules";

const platformHighlights = [
  {
    title: "Progressive curriculum",
    description: "Move from single-server intuition to distributed-systems reasoning with an ordered learning path.",
    icon: BookOpen
  },
  {
    title: "Modular by default",
    description: "Each module lives in its own content folder so you can ship sections independently and grow later.",
    icon: Boxes
  },
  {
    title: "Future-ready architecture",
    description: "Start with MDX and local metadata today, then pivot to a database-backed content service without rewriting the UI.",
    icon: DatabaseZap
  }
];

export default async function HomePage() {
  const [modules, stats, user] = await Promise.all([getModules(), getLearningStats(), getSessionUser()]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="glass-panel flex items-center justify-between rounded-[2rem] border border-border/70 px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">System Design Learning Platform</p>
            <p className="text-xs text-muted-foreground">Next.js + MDX + Vercel-ready</p>
          </div>
        </Link>
        <ThemeToggle />
      </header>

      <section className="relative overflow-hidden px-2 pb-10 pt-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <Badge className="mb-5">Premium course starter</Badge>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
              Learn system design with a platform that scales the way the curriculum teaches.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Structured like a modern course experience, powered by modular MDX content, and ready to evolve into a
              multi-course, database-backed learning product.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/learn">
                  {user ? "Continue learning" : "Start learning"}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/learn/scale-from-zero-to-millions">Open sample module</Link>
              </Button>
              {!user ? (
                <Button asChild variant="ghost" size="lg">
                  <Link
                    href={{
                      pathname: "/auth",
                      query: {
                        mode: "register",
                        next: "/learn"
                      }
                    }}
                  >
                    Create account
                  </Link>
                </Button>
              ) : null}
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl">{stats.moduleCount}</CardTitle>
                  <CardDescription>Starter modules</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl">{stats.categoryCount}</CardTitle>
                  <CardDescription>Topic lanes</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl">{stats.totalOutcomes}</CardTitle>
                  <CardDescription>Learning outcomes</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          <Card className="overflow-hidden">
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                Structured learning flow
              </Badge>
              <CardTitle>From first principles to interview-ready design reviews</CardTitle>
              <CardDescription>
                The starter curriculum is intentionally sequenced so each chapter builds the mental model for the next.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {modules.map((module) => (
                <div key={module.slug} className="flex items-start gap-4 rounded-[1.25rem] border border-border/70 px-4 py-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
                    {module.order}
                  </div>
                  <div>
                    <p className="font-medium">{module.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{module.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-5 pb-10 md:grid-cols-3">
        {platformHighlights.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </main>
  );
}
