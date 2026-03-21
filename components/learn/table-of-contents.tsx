import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TableOfContentsItem } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  items: TableOfContentsItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">On this page</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              item.level === 3 && "ml-4"
            )}
          >
            {item.title}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

