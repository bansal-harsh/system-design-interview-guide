"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressState = {
  completedSlugs: string[];
  toggleCompleted: (slug: string) => void;
  isCompleted: (slug: string) => boolean;
  completionRatio: (slugs: string[]) => number;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedSlugs: [],
      toggleCompleted: (slug) =>
        set((state) => ({
          completedSlugs: state.completedSlugs.includes(slug)
            ? state.completedSlugs.filter((entry) => entry !== slug)
            : [...state.completedSlugs, slug]
        })),
      isCompleted: (slug) => get().completedSlugs.includes(slug),
      completionRatio: (slugs) => {
        if (slugs.length === 0) {
          return 0;
        }

        const completedCount = slugs.filter((slug) => get().completedSlugs.includes(slug)).length;
        return Math.round((completedCount / slugs.length) * 100);
      }
    }),
    {
      name: "system-design-progress"
    }
  )
);

