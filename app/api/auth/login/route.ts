import { NextResponse } from "next/server";

import { authenticateUser } from "@/lib/auth/users";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const user = authenticateUser({
      email: body.email ?? "",
      password: body.password ?? ""
    });

    const token = await createSessionToken(user);
    await setSessionCookie(token);

    return NextResponse.json({ user });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to sign you in.";
    return jsonError(message, 401);
  }
}

