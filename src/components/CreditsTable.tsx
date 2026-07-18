import type { Project } from "@/data/projects";
import { getProjectCreditRows } from "@/lib/project-credits";

export function CreditsTable({ project }: { project: Project }) {
  return (
    <dl className="border-t border-line">
      {getProjectCreditRows(project).map((row) => (
        <div key={row.key} className="grid grid-cols-[120px_1fr] border-b border-line py-3 text-sm">
          <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-minimal">{row.label}</dt>
          <dd className="text-body">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
