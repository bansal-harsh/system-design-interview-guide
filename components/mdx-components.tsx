import { Lightbulb, Network, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DiagramBlockProps = {
  title: string;
  caption: string;
  nodes?: string[] | string;
};

function DiagramBlock({ title, caption, nodes }: DiagramBlockProps) {
  const normalizedNodes = Array.isArray(nodes)
    ? nodes
    : typeof nodes === "string"
      ? nodes
          .replace(/^\[|\]$/g, "")
          .split(",")
          .map((node) => node.replace(/^['"\s]+|['"\s]+$/g, ""))
          .filter(Boolean)
      : [];

  return (
    <Card className="my-8 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2 text-primary">
          <Network className="size-4" />
          <Badge>Architecture diagram</Badge>
        </div>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{caption}</p>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        {normalizedNodes.map((node, index) => (
          <div
            key={node}
            className={cn(
              "rounded-[1.25rem] border border-border/70 px-4 py-4 text-sm font-medium",
              index % 3 === 0 && "bg-primary/8",
              index % 3 === 1 && "bg-chart-2/10",
              index % 3 === 2 && "bg-chart-3/10"
            )}
          >
            {node}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

type InsightBlockProps = {
  title: string;
  children: ReactNode;
  icon: "tip" | "example";
};

function InsightBlock({ title, children, icon }: InsightBlockProps) {
  const Icon = icon === "tip" ? Lightbulb : Sparkles;

  return (
    <Card className="my-8 border-primary/15">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-primary">
          <Icon className="size-4" />
          <Badge>{icon === "tip" ? "Interview tip" : "Real-world example"}</Badge>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm leading-7 text-muted-foreground">{children}</CardContent>
    </Card>
  );
}

export const mdxComponents = {
  DiagramBlock,
  InterviewTip: ({ title, children }: { title: string; children: ReactNode }) => (
    <InsightBlock title={title} icon="tip">
      {children}
    </InsightBlock>
  ),
  RealWorldExample: ({ title, children }: { title: string; children: ReactNode }) => (
    <InsightBlock title={title} icon="example">
      {children}
    </InsightBlock>
  )
};
