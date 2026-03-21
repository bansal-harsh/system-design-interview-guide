import type { ReactNode } from "react";

import { SidebarNav } from "@/components/learn/sidebar-nav";
import { getModules } from "@/lib/content/modules";

export default async function LearnLayout({ children }: { children: ReactNode }) {
  const modules = await getModules();

  return (
    <div className="min-h-screen">
      <SidebarNav modules={modules} />
      <div className="px-4 pb-8 pt-20 lg:ml-[332px] lg:px-8 lg:pt-8">{children}</div>
    </div>
  );
}

