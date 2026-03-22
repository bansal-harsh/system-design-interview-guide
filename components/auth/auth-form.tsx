"use client";

import type { Route } from "next";
import { LoaderCircle, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AuthFormProps = {
  mode: "login" | "register";
  redirectTo: Route;
};

export function AuthForm({ mode, redirectTo }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const isRegister = mode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? "")
    };

    startTransition(async () => {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error ?? "Something went wrong.");
        return;
      }

      router.push(redirectTo);
      router.refresh();
    });
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isRegister ? <UserPlus className="size-5" /> : <LogIn className="size-5" />}
          {isRegister ? "Create account" : "Sign in"}
        </CardTitle>
        <CardDescription>
          {isRegister
            ? "Create a JWT-backed account so progress is stored per user."
            : "Sign in to sync completion state for your system design journey."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegister ? (
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor={`${mode}-name`}>
                Name
              </label>
              <input
                id={`${mode}-name`}
                name="name"
                required
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus-visible:ring-4 focus-visible:ring-ring"
                placeholder="Harsh Bansal"
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor={`${mode}-email`}>
              Email
            </label>
            <input
              id={`${mode}-email`}
              type="email"
              name="email"
              required
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus-visible:ring-4 focus-visible:ring-ring"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor={`${mode}-password`}>
              Password
            </label>
            <input
              id={`${mode}-password`}
              type="password"
              name="password"
              minLength={6}
              required
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus-visible:ring-4 focus-visible:ring-ring"
              placeholder="At least 6 characters"
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button className="w-full" size="lg" disabled={isPending}>
            {isPending ? <LoaderCircle className="size-4 animate-spin" /> : null}
            {isRegister ? "Create account" : "Sign in"}
          </Button>
        </form>

        <p className="mt-5 text-sm text-muted-foreground">
          {isRegister ? "Already have an account?" : "Need an account?"}{" "}
          <Link
            href={{
              pathname: "/auth",
              query: {
                mode: isRegister ? "login" : "register",
                next: redirectTo
              }
            }}
            className="text-primary underline decoration-primary/35 underline-offset-4"
          >
            {isRegister ? "Sign in" : "Register"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
