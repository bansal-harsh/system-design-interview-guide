"use client";

import type { Route } from "next";
import { CheckCircle2, LoaderCircle, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";

type ModuleActionsProps = {
  slug: string;
  isAuthenticated: boolean;
  initialCompleted: boolean;
};

export function ModuleActions({ slug, isAuthenticated, initialCompleted }: ModuleActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isCompleted, setIsCompleted] = useState(initialCompleted);

  if (!isAuthenticated) {
    return (
      <Button asChild variant="outline">
        <Link
          href={{
            pathname: "/auth",
            query: {
              mode: "login",
              next: `/learn/${slug}` as Route
            }
          }}
        >
          <Lock className="size-4" />
          Sign in to save progress
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant={isCompleted ? "secondary" : "default"}
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const response = await fetch("/api/progress", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ slug })
          });

          if (!response.ok) {
            return;
          }

          const result = (await response.json()) as { completed: boolean };
          setIsCompleted(result.completed);
          router.refresh();
        })
      }
    >
      {isPending ? <LoaderCircle className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
      {isCompleted ? "Completed" : "Mark complete"}
    </Button>
  );
}
