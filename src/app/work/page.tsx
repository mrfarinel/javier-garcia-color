import { ProjectGrid } from "@/components/ProjectGrid";
import { categories, getWorkProjects } from "@/lib/projects";

export const metadata = {
  title: "Work Archive",
};

export default async function WorkArchivePage() {
  const projects = await getWorkProjects();

  return (
    <main className="pt-4 lg:pt-8">
      <ProjectGrid projects={projects} categories={categories} title="Work Archive" showArchiveLink={false} />
    </main>
  );
}
