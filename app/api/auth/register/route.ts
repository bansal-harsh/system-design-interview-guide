import { NextResponse } from "next/server";

import { createSessionToken, setSessionCookie } from "@/lib/auth/session";
import { createUser } from "@/lib/auth/users";
import { jsonError } from "@/lib/http";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    const user = createUser({
      name: body.name ?? "",
      email: body.email ?? "",
      password: body.password ?? ""
    });

    const token = await createSessionToken(user);
    await setSessionCookie(token);

    return NextResponse.json({ user });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create your account.";
    return jsonError(message);
  }
}

