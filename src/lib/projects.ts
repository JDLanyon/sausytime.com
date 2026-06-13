import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ProjectCategory = "programming" | "motion_graphics";

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  repo?: string;
  category: ProjectCategory;
  subcategory?: string;
  tags?: string[];
  thumbnail?: string;
  /** Extra body content beyond what's in the GitHub README */
  extra?: string;
}

/**
 * Parse a local .md file, extract frontmatter + optional extra body.
 */
export function getProjectMeta(slug: string): ProjectMeta | null {
  const filePath = path.resolve(`src/content/projects/${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    repo: data.repo || undefined,
    category: (data.category as ProjectCategory) ?? "programming",
    subcategory: data.subcategory || undefined,
    tags: Array.isArray(data.tags) ? data.tags : undefined,
    thumbnail: data.thumbnail || undefined,
    extra: content.trim() || undefined,
  };
}

/**
 * Get the GitHub raw README URL from a repo URL.
 * Supports https://github.com/user/repo and https://github.com/user/repo/tree/branch
 */
function readmeUrl(repo: string): string {
  const m = repo.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!m) return "";
  const [, owner, repoName] = m;
  return `https://raw.githubusercontent.com/${owner}/${repoName}/main/README.md`;
}

/**
 * Fetch the README from a GitHub repo. Falls back to master branch if main fails.
 */
export async function fetchReadme(repo: string): Promise<string | null> {
  try {
    const url = readmeUrl(repo);
    if (!url) return null;

    const res = await fetch(url, { next: { revalidate: 3600 } }); // cache 1h
    if (res.ok) return await res.text();

    // Try master branch
    const masterUrl = url.replace("/main/", "/master/");
    const res2 = await fetch(masterUrl, { next: { revalidate: 3600 } });
    return res2.ok ? await res2.text() : null;
  } catch {
    return null;
  }
}

/** List all project slugs for static generation */
export function getAllProjectSlugs(): string[] {
  const dir = path.resolve("src/content/projects");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
