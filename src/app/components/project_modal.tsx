import { Modal } from "@/app/components/modal";
import Button from "@/app/components/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { ProjectMeta } from "@/lib/projects";

/** Render GitHub-flavoured markdown with styling + raw HTML support */
function MarkdownBody({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children }) => <h2 className="text-xl font-bold mt-6 mb-2">{children}</h2>,
        h2: ({ children }) => <h3 className="text-lg font-bold mt-5 mb-2">{children}</h3>,
        h3: ({ children }) => <h4 className="font-bold mt-4 mb-1">{children}</h4>,
        p: ({ children }) => <p className="my-2">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-6 my-2">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 my-2">{children}</ol>,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold underline">
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="bg-(--primary)/10 px-1 rounded text-sm">{children}</code>
        ),
        pre: ({ children }) => (
          <pre className="bg-(--primary)/10 p-4 rounded overflow-x-auto my-2">{children}</pre>
        ),
        img: ({ src, alt }) => (
          <img src={src || ""} alt={alt || ""} className="mx-auto my-2 max-w-full h-auto" />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

interface ProjectModalProps {
  meta: ProjectMeta;
  readme: string | null;
}

export function ProjectModal({ meta, readme }: ProjectModalProps) {
  const isMotion = meta.category === "motion_graphics";
  const hasRepo = !!meta.repo;

  return (
    <Modal>
      <div>
        {/* GitHub button */}
        {hasRepo && meta.repo && (
          <div className="flex absolute left-4 top-4 transform">
            <Button text="View on GitHub" href={meta.repo} target_blank>
              <SiGithub />
            </Button>
          </div>
        )}

        {/* Heading */}
        <h1 className="text-center m-0 mb-8">{meta.title}</h1>

        {/* Motion graphics warnings */}
        {isMotion && (
          <div className="text-center my-2">
            <b>
              <p>*volume warning* - check volume before playing.</p>
              <p>*epilepsy warning* - flashing images.</p>
            </b>
          </div>
        )}

        {/* Extra body content from local .md file */}
        {meta.extra && <MarkdownBody>{meta.extra}</MarkdownBody>}

        {/* GitHub README */}
        {readme && <MarkdownBody>{readme}</MarkdownBody>}

        {/* Fallback */}
        {!meta.extra && !readme && (
          <div className="text-center">
            <p>More information coming soon :{">"}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
