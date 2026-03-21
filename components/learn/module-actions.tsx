"use client";

import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/lib/store/progress-store";

type ModuleActionsProps = {
  slug: string;
};

export function ModuleActions({ slug }: ModuleActionsProps) {
  const isCompleted = useProgressStore((state) => state.isCompleted(slug));
  const toggleCompleted = useProgressStore((state) => state.toggleCompleted);

  return (
    <Button variant={isCompleted ? "secondary" : "default"} onClick={() => toggleCompleted(slug)}>
      <CheckCircle2 className="size-4" />
      {isCompleted ? "Completed" : "Mark complete"}
    </Button>
  );
}

