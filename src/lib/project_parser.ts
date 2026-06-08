import fs from "fs";
import path from "path";

export interface ProjectMetadata {
  title: string;
  description: string;
  repo?: string;
  category: "programming" | "motion_graphics";
  subcategory?: string;
  tags?: string[];
  thumbnail?: string;
}

export interface ImageSection {
  type: "image";
  src: string;
  width?: string;
  alt?: string;
}

export interface TextSection {
  type: "text";
  content: string;
  width?: string;
  align?: string;
}

export interface EmbedSection {
  type: "embed";
  uuid: string;
}

export interface LocalVideoSection {
  type: "local_video";
  file: string;
  thumbnail?: string;
}

export interface WarningsSection {
  type: "warnings";
}

export interface GitHubButtonSection {
  type: "github_button";
  href: string;
}

export interface HeadingSection {
  type: "heading";
  text: string;
}

export interface ImageRowSection {
  type: "image_row";
  images: { src: string; width?: string; alt?: string }[];
}

export interface FlexRowSection {
  type: "flex_row";
  sections: (ImageSection | TextSection | LocalVideoSection)[];
}

export type ProjectSection =
  | HeadingSection
  | TextSection
  | ImageSection
  | ImageRowSection
  | FlexRowSection
  | EmbedSection
  | LocalVideoSection
  | WarningsSection
  | GitHubButtonSection;

export interface ParsedProject {
  slug: string;
  metadata: ProjectMetadata;
  sections: ProjectSection[];
}

/** Check if a path ends in a video file extension */
function isVideoPath(p: string): boolean {
  return /\.(mp4|webm|mov|avi)$/i.test(p);
}

/**
 * Parse basic frontmatter from markdown content (key: value lines between ---)
 */
function parseFrontmatter(content: string): { metadata: Record<string, string | string[]>; body: string } {
  const metadata: Record<string, string | string[]> = {};
  let body = content;

  if (content.startsWith("---")) {
    const endIdx = content.indexOf("---", 3);
    if (endIdx !== -1) {
      const frontmatterStr = content.slice(3, endIdx).trim();
      body = content.slice(endIdx + 3).trim();

      for (const line of frontmatterStr.split("\n")) {
        const colonIdx = line.indexOf(":");
        if (colonIdx !== -1) {
          const key = line.slice(0, colonIdx).trim();
          let value: string | string[] = line.slice(colonIdx + 1).trim();

          if (value.startsWith("[") && value.endsWith("]")) {
            value = value.slice(1, -1).split(",").map((v) => v.trim());
          }

          metadata[key] = value;
        }
      }
    }
  }

  return { metadata, body };
}

/**
 * Parse the body markdown into structured sections
 */
function parseBody(body: string, category: string): ProjectSection[] {
  const lines = body.split("\n");
  const sections: ProjectSection[] = [];
  let headingFound = false;
  let textBuffer: string[] = [];

  function flushText() {
    if (textBuffer.length > 0) {
      const content = textBuffer.join("\n").trim();
      if (content) {
        sections.push({ type: "text", content });
      }
      textBuffer = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushText();
      continue;
    }

    // Heading — first non-empty, non-image, short line
    if (!headingFound && !line.startsWith("![[") && !line.startsWith("http") && line.length < 100) {
      headingFound = true;
      flushText();
      sections.push({ type: "heading", text: line });
      continue;
    }

    // YouTube embed URL
    const youtubeMatch = line.match(
      /https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/
    );
    if (youtubeMatch) {
      flushText();
      sections.push({ type: "embed", uuid: youtubeMatch[1] });
      continue;
    }

    // Image/video with text on same line (flex row)
    const imageWithTextMatch = line.match(/^!\[\[([^\]]+)\]\](.+)/);
    if (imageWithTextMatch) {
      flushText();
      const [, src, textContent] = imageWithTextMatch;
      const trimmedText = textContent.trim();
      if (trimmedText) {
        const leftSection = isVideoPath(src)
          ? { type: "local_video" as const, file: src }
          : { type: "image" as const, src, width: "w-1/2" };
        sections.push({
          type: "flex_row",
          sections: [leftSection, { type: "text", content: trimmedText, width: "w-1/2" }],
        });
      } else {
        if (isVideoPath(src)) {
          sections.push({ type: "local_video", file: src });
        } else {
          sections.push({ type: "image", src });
        }
      }
      continue;
    }

    // Multiple embeds on same line (image row) — check for videos too
    const allImages = [...line.matchAll(/!\[\[([^\]]+)\]\]/g)];
    if (allImages.length > 1) {
      flushText();
      const hasVideo = allImages.some((m) => isVideoPath(m[1]));
      if (hasVideo) {
        // Mixed or all videos — render each individually
        for (const m of allImages) {
          if (isVideoPath(m[1])) {
            sections.push({ type: "local_video", file: m[1] });
          } else {
            sections.push({ type: "image", src: m[1] });
          }
        }
      } else {
        sections.push({
          type: "image_row",
          images: allImages.map((m) => ({ src: m[1] })),
        });
      }
      continue;
    }

    // Single embed on its own line
    const singleEmbed = line.match(/^!\[\[([^\]]+)\]\]$/);
    if (singleEmbed) {
      flushText();
      const src = singleEmbed[1];
      if (isVideoPath(src)) {
        sections.push({ type: "local_video", file: src });
      } else {
        sections.push({ type: "image", src });
      }
      continue;
    }

    // Regular text line
    textBuffer.push(line);
  }

  flushText();

  // Add warnings after heading for motion graphics
  if (category === "motion_graphics") {
    const headingIdx = sections.findIndex((s) => s.type === "heading");
    if (headingIdx !== -1) {
      sections.splice(headingIdx + 1, 0, { type: "warnings" });
    }
  }

  return sections;
}

/**
 * Parse a markdown file for a project
 */
export function parseProjectFile(filePath: string): ParsedProject | null {
  try {
    const fullPath = path.resolve(filePath);
    const content = fs.readFileSync(fullPath, "utf-8");
    const slug = path.basename(filePath, ".md");

    const { metadata: rawMeta, body } = parseFrontmatter(content);

    const category = (rawMeta.category as string) || "programming";

    const metadata: ProjectMetadata = {
      title: (rawMeta.title as string) || slug,
      description: (rawMeta.description as string) || "",
      repo: rawMeta.repo as string | undefined,
      category: category as "programming" | "motion_graphics",
      subcategory: rawMeta.subcategory as string | undefined,
      tags: Array.isArray(rawMeta.tags) ? (rawMeta.tags as string[]) : undefined,
      thumbnail: rawMeta.thumbnail as string | undefined,
    };

    const sections = parseBody(body, category);

    // Prepend GitHub button if repo exists (before heading)
    if (metadata.repo) {
      const headingIdx = sections.findIndex((s) => s.type === "heading");
      if (headingIdx !== -1) {
        sections.splice(headingIdx, 0, {
          type: "github_button",
          href: metadata.repo,
        });
      }
    }

    return { slug, metadata, sections };
  } catch (e) {
    console.error(`Failed to parse project file ${filePath}:`, e);
    return null;
  }
}

/**
 * Get a project by slug (filename without .md)
 */
export function getProjectBySlug(
  slug: string,
  contentDir: string = "src/content/projects"
): ParsedProject | null {
  const filePath = path.join(path.resolve(contentDir), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parseProjectFile(filePath);
}
