import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbsProps = {
  current: string;
};

export function Breadcrumbs({ current }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-foreground">
        Home
      </Link>
      <ChevronRight className="size-4" />
      <Link href="/learn" className="hover:text-foreground">
        Learn
      </Link>
      <ChevronRight className="size-4" />
      <span className="text-foreground">{current}</span>
    </nav>
  );
}

