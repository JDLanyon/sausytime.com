import Nav from "@/app/components/nav";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-[100vh] flex flex-col">
      <Nav />
      <div id="content" className="px-32 py-8 mt-16">
      {children}
      </div>
    </section>
  )
}