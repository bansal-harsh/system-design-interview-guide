import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Module } from "@/lib/content/types";

type ModuleNavigationProps = {
  previous: Module | null;
  next: Module | null;
};

export function ModuleNavigation({ previous, next }: ModuleNavigationProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className={previous ? "" : "opacity-55"}>
        <CardContent className="pt-6">
          {previous ? (
            <Button asChild variant="ghost" className="h-auto w-full justify-start rounded-2xl px-0 py-0">
              <Link href={`/learn/${previous.slug}`} className="flex w-full items-center gap-4">
                <ArrowLeft className="size-4" />
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Previous</p>
                  <p className="mt-1 text-left text-base font-medium">{previous.title}</p>
                </div>
              </Link>
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">You are at the beginning of the curriculum.</p>
          )}
        </CardContent>
      </Card>
      <Card className={next ? "" : "opacity-55"}>
        <CardContent className="pt-6">
          {next ? (
            <Button asChild variant="ghost" className="h-auto w-full justify-end rounded-2xl px-0 py-0">
              <Link href={`/learn/${next.slug}`} className="flex w-full items-center justify-end gap-4 text-right">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Next</p>
                  <p className="mt-1 text-base font-medium">{next.title}</p>
                </div>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : (
            <p className="text-right text-sm text-muted-foreground">You reached the end of this starter path.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

