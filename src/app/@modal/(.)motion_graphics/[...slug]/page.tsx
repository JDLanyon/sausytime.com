import { notFound } from "next/navigation";
import { getProjectMeta, fetchReadme, getAllProjectSlugs } from "@/lib/projects";
import { ProjectModal } from "@/app/components/project_modal";

import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export function generateStaticParams() {
  return getAllProjectSlugs()
    .filter((slug) => {
      const meta = getProjectMeta(slug);
      return meta?.category === "motion_graphics";
    })
    .map((slug) => ({ slug: [slug] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = getProjectMeta(slug[slug.length - 1]);
  return {
    title: meta?.title ?? "Project",
    description: meta?.description ?? "",
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const meta = getProjectMeta(slug[slug.length - 1]);
  if (!meta) notFound();

  const readme = meta.repo ? await fetchReadme(meta.repo) : null;

  return <ProjectModal meta={meta} readme={readme} />;
}
