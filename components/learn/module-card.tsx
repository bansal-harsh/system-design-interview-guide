import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatModuleIndex } from "@/lib/utils";
import type { Module } from "@/lib/content/types";

type ModuleCardProps = {
  module: Module;
  completed?: boolean;
};

export function ModuleCard({ module, completed = false }: ModuleCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-2">
            <Badge variant="secondary">{module.level}</Badge>
            {completed ? <Badge>Completed</Badge> : null}
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
            {formatModuleIndex(module.order)}
          </span>
        </div>
        <CardTitle>{module.title}</CardTitle>
        <CardDescription>{module.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {module.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
          {module.outcomes.slice(0, 3).map((outcome) => (
            <li key={outcome}>- {outcome}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <span className="text-sm text-muted-foreground">{module.readTime}</span>
        <Button asChild variant="outline">
          <Link href={`/learn/${module.slug}`}>
            Open module
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
