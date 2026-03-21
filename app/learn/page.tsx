import Link from "next/link";
import { ArrowRight, Orbit, PanelLeftClose, Sparkles } from "lucide-react";

import { CourseProgressBar } from "@/components/learn/course-progress-bar";
import { ModuleCard } from "@/components/learn/module-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getModules } from "@/lib/content/modules";

export default async function LearnPage() {
  const modules = await getModules();

  return (
    <main className="mx-auto max-w-7xl">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <Badge className="w-fit">Course overview</Badge>
            <CardTitle className="max-w-2xl text-4xl font-semibold tracking-tight">
              A modular roadmap from scaling basics to distributed systems trade-offs
            </CardTitle>
            <CardDescription className="max-w-2xl text-base leading-7">
              This experience is structured like a premium course platform: sidebar navigation, MDX lessons, TOC,
              progress tracking, and enough architectural discipline to evolve into a real product.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <CourseProgressBar slugs={modules.map((module) => module.slug)} />
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.25rem] border border-border/70 px-4 py-4">
                <PanelLeftClose className="mb-3 size-5 text-primary" />
                <p className="font-medium">Docs-style navigation</p>
                <p className="mt-1 text-sm text-muted-foreground">Left rail, breadcrumbs, sticky TOC, and module handoffs.</p>
              </div>
              <div className="rounded-[1.25rem] border border-border/70 px-4 py-4">
                <Orbit className="mb-3 size-5 text-primary" />
                <p className="font-medium">Progressive difficulty</p>
                <p className="mt-1 text-sm text-muted-foreground">Beginner to advanced topics arranged in one learning arc.</p>
              </div>
              <div className="rounded-[1.25rem] border border-border/70 px-4 py-4">
                <Sparkles className="mb-3 size-5 text-primary" />
                <p className="font-medium">Future extensibility</p>
                <p className="mt-1 text-sm text-muted-foreground">Ready for logins, DB content, AI assist, and interactive labs.</p>
              </div>
            </div>
            <Button asChild size="lg">
              <Link href={`/learn/${modules[0]?.slug ?? ""}`}>
                Start with the first lesson
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Badge variant="secondary" className="w-fit">
              Starter curriculum
            </Badge>
            <CardTitle>Learning path</CardTitle>
            <CardDescription>Each module is discovered from the filesystem with no hardcoded registry.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {modules.map((module) => (
              <div key={module.slug} className="rounded-[1.25rem] border border-border/70 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-primary/75">{module.category}</p>
                <p className="mt-2 font-medium">{module.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{module.readTime}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <ModuleCard key={module.slug} module={module} />
        ))}
      </section>
    </main>
  );
}

