import { Progress } from "@/components/ui/progress";
import type { AuthUser } from "@/lib/auth/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CourseProgressBarProps = {
  slugs: string[];
  completedSlugs: string[];
  user: AuthUser | null;
};

export function CourseProgressBar({ slugs, completedSlugs, user }: CourseProgressBarProps) {
  const value = slugs.length === 0 ? 0 : Math.round((completedSlugs.length / slugs.length) * 100);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {user ? `Progress for ${user.name}` : "Sign in to save your progress"}
        </span>
        <span className="font-medium">{user ? `${value}% complete` : "Guest mode"}</span>
      </div>
      <Progress value={value} />
      {!user ? (
        <Button asChild variant="ghost" className="px-0">
          <Link
            href={{
              pathname: "/auth",
              query: {
                mode: "login",
                next: "/learn"
              }
            }}
          >
            Sign in to sync completions
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
