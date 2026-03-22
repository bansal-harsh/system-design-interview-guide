import { db } from "@/lib/db";

export function getCompletedSlugsForUser(userId: number) {
  const rows = db
    .prepare("SELECT module_slug FROM user_progress WHERE user_id = ? AND completed = 1 ORDER BY module_slug ASC")
    .all(userId) as Array<{ module_slug: string }>;

  return rows.map((row) => row.module_slug);
}

export function isModuleCompletedForUser(userId: number, moduleSlug: string) {
  const row = db
    .prepare("SELECT completed FROM user_progress WHERE user_id = ? AND module_slug = ?")
    .get(userId, moduleSlug) as { completed: number } | undefined;

  return row?.completed === 1;
}

export function toggleProgressForUser(userId: number, moduleSlug: string) {
  const isCompleted = isModuleCompletedForUser(userId, moduleSlug);

  if (isCompleted) {
    db.prepare("DELETE FROM user_progress WHERE user_id = ? AND module_slug = ?").run(userId, moduleSlug);
    return false;
  }

  db.prepare(
    `
      INSERT INTO user_progress (user_id, module_slug, completed, updated_at)
      VALUES (?, ?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(user_id, module_slug)
      DO UPDATE SET completed = 1, updated_at = CURRENT_TIMESTAMP
    `
  ).run(userId, moduleSlug);

  return true;
}

