"use client";

import { LoaderCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await fetch("/api/auth/logout", {
            method: "POST"
          });
          router.refresh();
          router.push("/");
        })
      }
    >
      {isPending ? <LoaderCircle className="size-4 animate-spin" /> : <LogOut className="size-4" />}
      Logout
    </Button>
  );
}

