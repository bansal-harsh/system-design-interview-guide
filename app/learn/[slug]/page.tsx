import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock3 } from "lucide-react";

import { Breadcrumbs } from "@/components/learn/breadcrumbs";
import { ModuleActions } from "@/components/learn/module-actions";
import { ModuleNavigation } from "@/components/learn/module-navigation";
import { TableOfContents } from "@/components/learn/table-of-contents";
import { mdxComponents } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSessionUser } from "@/lib/auth/session";
import { getAdjacentModules, getModuleBySlug, getModules } from "@/lib/content/modules";
import { getCompletedSlugsForUser } from "@/lib/progress";

type ModulePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const modules = await getModules();
  return modules.map((module) => ({ slug: module.slug }));
}

export async function generateMetadata({ params }: ModulePageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await getModuleBySlug(slug);

  if (!lesson) {
    return {};
  }

  return {
    title: lesson.title,
    description: lesson.description,
    openGraph: {
      title: lesson.title,
      description: lesson.description,
      type: "article"
    }
  };
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { slug } = await params;
  const [lesson, user] = await Promise.all([getModuleBySlug(slug), getSessionUser()]);

  if (!lesson) {
    notFound();
  }

  const adjacent = await getAdjacentModules(slug);
  const completedSlugs = user ? getCompletedSlugsForUser(user.id) : [];
  const isCompleted = completedSlugs.includes(lesson.slug);

  return (
    <main className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
      <section className="space-y-6">
        <Card>
          <CardHeader className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="ghost" className="px-0">
                <Link href="/learn">
                  <ArrowLeft className="size-4" />
                  Back to course
                </Link>
              </Button>
            </div>
            <Breadcrumbs current={lesson.title} />
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{lesson.level}</Badge>
              <Badge variant="secondary">{lesson.category}</Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4" />
                {lesson.readTime}
              </div>
            </div>
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{lesson.title}</h1>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">{lesson.description}</p>
              </div>
              <ModuleActions slug={lesson.slug} isAuthenticated={Boolean(user)} initialCompleted={isCompleted} />
            </div>
            <div className="flex flex-wrap gap-2">
              {lesson.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="pt-8">
            <article className="prose-docs">
              <MDXRemote
                source={lesson.body}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
                  }
                }}
              />
            </article>
          </CardContent>
        </Card>

        <ModuleNavigation previous={adjacent.previous} next={adjacent.next} />
      </section>

      <aside className="hidden xl:block">
        <TableOfContents items={lesson.headings} />
      </aside>
    </main>
  );
}
