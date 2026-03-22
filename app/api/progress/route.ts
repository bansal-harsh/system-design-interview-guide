import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";
import { getCompletedSlugsForUser, toggleProgressForUser } from "@/lib/progress";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return jsonError("Authentication required.", 401);
  }

  return NextResponse.json({
    completedSlugs: getCompletedSlugsForUser(user.id)
  });
}

export async function POST(request: Request) {
  const user = await getSessionUser();

  if (!user) {
    return jsonError("Authentication required.", 401);
  }

  const body = (await request.json()) as { slug?: string };
  const slug = body.slug?.trim();

  if (!slug) {
    return jsonError("Module slug is required.");
  }

  const completed = toggleProgressForUser(user.id, slug);

  return NextResponse.json({ completed });
}

