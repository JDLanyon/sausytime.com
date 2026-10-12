import { notFound } from "next/navigation";
import { getProjectMeta, fetchReadme, getAllProjectSlugs } from "@/lib/projects";
import { ProjectModal } from "@/app/components/project_modal";

import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export function generateStaticParams() {
  return getAllProjectSlugs()
    .map((slug) => ({ slug, meta: getProjectMeta(slug) }))
    .filter(({ meta }) => meta?.category === "programming" && meta.subcategory)
    .map(({ slug, meta }) => ({ slug: [meta!.subcategory!, slug] }));
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

