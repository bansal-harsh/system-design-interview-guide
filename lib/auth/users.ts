import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import type { AuthUser } from "@/lib/auth/types";

type UserRow = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function toAuthUser(row: Pick<UserRow, "id" | "name" | "email">): AuthUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email
  };
}

export function getUserByEmail(email: string) {
  return db
    .prepare("SELECT id, name, email, password_hash FROM users WHERE email = ?")
    .get(normalizeEmail(email)) as UserRow | undefined;
}

export function createUser(input: { name: string; email: string; password: string }) {
  const name = input.name.trim();
  const email = normalizeEmail(input.email);

  if (!name || !email || input.password.length < 6) {
    throw new Error("Please provide a name, a valid email, and a password with at least 6 characters.");
  }

  const existingUser = getUserByEmail(email);

  if (existingUser) {
    throw new Error("An account already exists for this email address.");
  }

  const passwordHash = bcrypt.hashSync(input.password, 10);
  const result = db
    .prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)")
    .run(name, email, passwordHash);

  return {
    id: Number(result.lastInsertRowid),
    name,
    email
  } satisfies AuthUser;
}

export function authenticateUser(input: { email: string; password: string }) {
  const user = getUserByEmail(input.email);

  if (!user || !bcrypt.compareSync(input.password, user.password_hash)) {
    throw new Error("Invalid email or password.");
  }

  return toAuthUser(user);
}

