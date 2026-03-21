import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import type { Module, ModuleWithContent, TableOfContentsItem } from "@/lib/content/types";

const contentDirectory = path.join(process.cwd(), "content");

type ModuleMetadata = Omit<Module, "contentPath">;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(source: string): TableOfContentsItem[] {
  return source
    .split("\n")
    .map((line) => {
      const match = line.match(/^(##|###)\s+(.*)$/);

      if (!match) {
        return null;
      }

      const [, hashes, title] = match;
      return {
        id: slugify(title),
        title: title.trim(),
        level: hashes.length as 2 | 3
      };
    })
    .filter((heading): heading is TableOfContentsItem => heading !== null);
}

async function readModuleDirectory(entry: string): Promise<ModuleWithContent> {
  const directory = path.join(contentDirectory, entry);
  const metadataPath = path.join(directory, "metadata.json");
  const contentPath = path.join(directory, "index.mdx");

  const [metadataFile, contentFile] = await Promise.all([
    fs.readFile(metadataPath, "utf8"),
    fs.readFile(contentPath, "utf8")
  ]);

  const metadata = JSON.parse(metadataFile) as ModuleMetadata;
  const { content } = matter(contentFile);

  return {
    ...metadata,
    contentPath,
    body: content,
    headings: extractHeadings(content)
  };
}

export async function getModules(): Promise<Module[]> {
  const entries = await fs.readdir(contentDirectory, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const modules = await Promise.all(directories.map(readModuleDirectory));

  return modules
    .sort((left, right) => left.order - right.order)
    .map(({ body: _body, headings: _headings, ...module }) => module);
}

export async function getModuleBySlug(slug: string): Promise<ModuleWithContent | null> {
  const modules = await fs.readdir(contentDirectory, { withFileTypes: true });
  const directory = modules.find((entry) => entry.isDirectory() && entry.name === slug);

  if (!directory) {
    return null;
  }

  return readModuleDirectory(slug);
}

export async function getAdjacentModules(slug: string) {
  const modules = await getModules();
  const currentIndex = modules.findIndex((module) => module.slug === slug);

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null
    };
  }

  return {
    previous: modules[currentIndex - 1] ?? null,
    next: modules[currentIndex + 1] ?? null
  };
}

export async function getLearningStats() {
  const modules = await getModules();

  return {
    moduleCount: modules.length,
    categoryCount: new Set(modules.map((module) => module.category)).size,
    totalOutcomes: modules.reduce((sum, module) => sum + module.outcomes.length, 0)
  };
}

