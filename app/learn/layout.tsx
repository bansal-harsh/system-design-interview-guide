import type { ReactNode } from "react";

import { SidebarNav } from "@/components/learn/sidebar-nav";
import { getSessionUser } from "@/lib/auth/session";
import { getModules } from "@/lib/content/modules";
import { getCompletedSlugsForUser } from "@/lib/progress";

export default async function LearnLayout({ children }: { children: ReactNode }) {
  const modules = await getModules();
  const user = await getSessionUser();
  const completedSlugs = user ? getCompletedSlugsForUser(user.id) : [];

  return (
    <div className="min-h-screen">
      <SidebarNav modules={modules} user={user} completedSlugs={completedSlugs} />
      <div className="px-4 pb-8 pt-20 lg:ml-[332px] lg:px-8 lg:pt-8">{children}</div>
    </div>
  );
}
