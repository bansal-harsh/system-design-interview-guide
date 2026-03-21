"use client";

import { useMemo } from "react";

import { Progress } from "@/components/ui/progress";
import { useProgressStore } from "@/lib/store/progress-store";

type CourseProgressBarProps = {
  slugs: string[];
};

export function CourseProgressBar({ slugs }: CourseProgressBarProps) {
  const completionRatio = useProgressStore((state) => state.completionRatio);
  const value = useMemo(() => completionRatio(slugs), [completionRatio, slugs]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Course progress</span>
        <span className="font-medium">{value}% complete</span>
      </div>
      <Progress value={value} />
    </div>
  );
}

