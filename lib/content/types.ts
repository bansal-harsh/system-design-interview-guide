export type Module = {
  id: string;
  title: string;
  slug: string;
  description: string;
  order: number;
  contentPath: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  tags: string[];
  outcomes: string[];
};

export type ModuleWithContent = Module & {
  body: string;
  headings: TableOfContentsItem[];
};

export type TableOfContentsItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

