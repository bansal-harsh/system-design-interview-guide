import type { Route } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { AuthForm } from "@/components/auth/auth-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSessionUser } from "@/lib/auth/session";

type AuthPageProps = {
  searchParams: Promise<{
    mode?: string;
    next?: string;
  }>;
};

function getRedirectTarget(value?: string): Route {
  if (!value || !value.startsWith("/")) {
    return "/learn" as Route;
  }

  return value as Route;
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const [user, params] = await Promise.all([getSessionUser(), searchParams]);

  if (user) {
    redirect(getRedirectTarget(params.next));
  }

  const mode = params.mode === "register" ? "register" : "login";
  const redirectTo = getRedirectTarget(params.next);

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between">
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Back to home
        </Link>
        <Button asChild variant="ghost">
          <Link href="/learn">Browse lessons</Link>
        </Button>
      </header>

      <section className="grid gap-6 pt-10 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <Badge className="w-fit">JWT auth</Badge>
            <CardTitle className="max-w-xl text-4xl font-semibold tracking-tight">
              Sign in once and keep your learning progress attached to your account.
            </CardTitle>
            <CardDescription className="max-w-xl text-base leading-7">
              Completion state is stored server-side per user, so the platform can grow into bookmarks, notes, and
              personalized dashboards without reworking the auth model.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
            <div className="rounded-[1.25rem] border border-border/70 px-4 py-4">
              <ShieldCheck className="mb-3 size-5 text-primary" />
              Passwords are hashed with bcrypt, sessions are signed with JWT, and the cookie stays `httpOnly`.
            </div>
            <div className="rounded-[1.25rem] border border-border/70 px-4 py-4">
              Progress is keyed by user and module slug, so marking a lesson complete follows the logged-in learner.
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <AuthForm mode={mode} redirectTo={redirectTo} />
          <AuthForm mode={mode === "login" ? "register" : "login"} redirectTo={redirectTo} />
        </div>
      </section>
    </main>
  );
}
