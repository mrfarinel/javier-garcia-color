export type ProjectTitleParts = {
  name: string;
  descriptor?: string;
};

export function splitProjectTitle(title: string): ProjectTitleParts {
  const [name, ...descriptorParts] = title.split(/\s+-\s+/);
  const descriptor = descriptorParts.join(" - ").trim();

  return {
    name: name.trim() || title,
    descriptor: descriptor || undefined,
  };
}
