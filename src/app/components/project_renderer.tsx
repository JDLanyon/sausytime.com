import Image from "next/image";
import Link from "next/link";
import { Modal } from "@/app/components/modal";
import { LocalVideo } from "@/app/components/modal_elements";
import { Embed } from "@/app/components/embed";
import Button from "@/app/components/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import type {
  ParsedProject,
  ProjectSection,
  ImageSection,
  TextSection,
  ImageRowSection,
  FlexRowSection,
  HeadingSection,
  GitHubButtonSection,
  EmbedSection,
  LocalVideoSection,
} from "@/lib/project_parser";

/** Simple markdown-to-JSX for inline formatting (bold, italic, links) */
function renderInlineMarkdown(text: string) {
  const parts: (string | React.ReactNode)[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    const matches: { index: number; length: number; node: React.ReactNode }[] = [];

    if (boldMatch) {
      matches.push({
        index: boldMatch.index!,
        length: boldMatch[0].length,
        node: <strong key={key++}>{boldMatch[1]}</strong>,
      });
    }
    if (italicMatch) {
      matches.push({
        index: italicMatch.index!,
        length: italicMatch[0].length,
        node: <em key={key++}>{italicMatch[1]}</em>,
      });
    }
    if (linkMatch) {
      matches.push({
        index: linkMatch.index!,
        length: linkMatch[0].length,
        node: (
          <Link
            key={key++}
            href={linkMatch[2]}
            target="_blank"
            className="font-bold underline"
          >
            {linkMatch[1]}
          </Link>
        ),
      });
    }

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    matches.sort((a, b) => a.index - b.index);
    const first = matches[0];

    if (first.index > 0) {
      parts.push(remaining.slice(0, first.index));
    }

    parts.push(first.node);
    remaining = remaining.slice(first.index + first.length);
  }

  return parts;
}

function TextLine({ children, className }: { children: string; className?: string }) {
  return <p className={className}>{renderInlineMarkdown(children)}</p>;
}

function TextBlock({ content, className }: { content: string; className?: string }) {
  const lines = content.split("\n");
  return (
    <div className={className}>
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i} />;
        if (line.match(/^\s*[-*]\s/)) {
          return (
            <li key={i} className="ml-4">
              {renderInlineMarkdown(line.replace(/^\s*[-*]\s/, ""))}
            </li>
          );
        }
        if (line.startsWith("###")) {
          return (
            <h3 key={i} className="font-bold mt-4 mb-2">
              {renderInlineMarkdown(line.replace(/^###\s*/, ""))}
            </h3>
          );
        }
        if (line.startsWith("##")) {
          return (
            <h2 key={i} className="font-bold mt-4 mb-2 text-lg">
              {renderInlineMarkdown(line.replace(/^##\s*/, ""))}
            </h2>
          );
        }
        return <TextLine key={i}>{line}</TextLine>;
      })}
    </div>
  );
}

function SectionRenderer({ section }: { section: ProjectSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h1 className="text-center m-0 mb-8">
          {(section as HeadingSection).text}
        </h1>
      );
    case "warnings":
      return (
        <div className="text-center my-2">
          <b>
            <p>*volume warning* - check volume before playing.</p>
            <p>*epilepsy warning* - flashing images.</p>
          </b>
        </div>
      );
    case "github_button":
      return (
        <div className="flex absolute left-4 top-4 transform">
          <Button
            text="View on GitHub"
            href={(section as GitHubButtonSection).href}
            target_blank
          >
            <SiGithub />
          </Button>
        </div>
      );
    case "embed":
      return (
        <div className="text-center my-4">
          <Embed uuid={(section as EmbedSection).uuid} />
        </div>
      );
    case "local_video":
      return (
        <div className="text-center my-4">
          <LocalVideo
            file={(section as LocalVideoSection).file}
            thumbnail={(section as LocalVideoSection).thumbnail}
          />
        </div>
      );
    case "image": {
      const img = section as ImageSection;
      return (
        <Image
          className={img.width || "w-full"}
          src={img.src}
          width={1000}
          height={1000}
          alt={img.alt || "project image"}
        />
      );
    }
    case "image_row": {
      const row = section as ImageRowSection;
      return (
        <div className="flex flex-wrap *:p-2">
          {row.images.map((img, i) => (
            <Image
              key={i}
              className={img.width || "w-1/2"}
              src={img.src}
              width={1000}
              height={1000}
              alt={img.alt || `project image ${i + 1}`}
            />
          ))}
        </div>
      );
    }
    case "text": {
      const txt = section as TextSection;
      return <TextBlock content={txt.content} className={txt.width} />;
    }
    case "flex_row": {
      const flex = section as FlexRowSection;
      return (
        <div className="flex flex-wrap *:p-2">
          {flex.sections.map((sub, i) => {
            if (sub.type === "image") {
              const img = sub as ImageSection;
              return (
                <Image
                  key={i}
                  className={img.width || "w-1/2"}
                  src={img.src}
                  width={1000}
                  height={1000}
                  alt={img.alt || "project image"}
                />
              );
            }
            if (sub.type === "local_video") {
              const vid = sub as LocalVideoSection;
              return (
                <div key={i} className="w-1/2">
                  <LocalVideo file={vid.file} thumbnail={vid.thumbnail} />
                </div>
              );
            }
            if (sub.type === "text") {
              const txt = sub as TextSection;
              return (
                <TextBlock
                  key={i}
                  content={txt.content}
                  className={txt.width || "w-1/2"}
                />
              );
            }
            return null;
          })}
        </div>
      );
    }
    default:
      return null;
  }
}

export function ProjectPage({ project }: { project: ParsedProject }) {
  return (
    <Modal>
      <div>
        {project.sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}
      </div>
    </Modal>
  );
}
