import { projects as cachedProjects, categories } from "@/data/projects";
import { vimeoCategoryMap } from "@/data/vimeo-categories";
import { titleCategoryMap } from "@/data/vimeo-projects";
import type { Project, ProjectCategory } from "@/data/projects";

type VimeoApiVideo = {
  uri: string;
  name: string;
  description?: string | null;
  link: string;
  created_time?: string;
  release_time?: string;
  pictures?: {
    sizes?: Array<{
      width: number;
      link: string;
    }>;
  };
};

type VimeoApiPage<T> = {
  data: T[];
  paging?: {
    next?: string | null;
  };
};

const VIMEO_USERNAME = "mrfarinel";
const VIMEO_REVALIDATE_SECONDS = Number(process.env.VIMEO_REVALIDATE_SECONDS ?? 300);

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getVimeoId(value: string) {
  return value.match(/(\d+)(?:$|[/?#])/)?.[1] ?? value;
}

function cleanDescription(value?: string | null) {
  if (!value) return undefined;

  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function pickLargestPicture(video: VimeoApiVideo) {
  return [...(video.pictures?.sizes ?? [])].sort((a, b) => b.width - a.width)[0]?.link ?? "";
}

function normalizeTitle(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getTitleCategory(title: string) {
  const normalizedTitle = normalizeTitle(title);
  return titleCategoryMap.find((entry) => normalizedTitle.includes(normalizeTitle(entry.match)))?.category;
}

async function fetchVimeoPages<T>(initialUrl: string, token: string) {
  const items: T[] = [];
  let url: string | null = initialUrl;
  const cacheOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : { next: { revalidate: VIMEO_REVALIDATE_SECONDS } };

  while (url) {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
      ...cacheOptions,
    });

    if (!response.ok) {
      throw new Error(`Vimeo API request failed: ${response.status}`);
    }

    const page = (await response.json()) as VimeoApiPage<T>;
    items.push(...page.data);
    url = page.paging?.next
      ? page.paging.next.startsWith("http")
        ? page.paging.next
        : `https://api.vimeo.com${page.paging.next}`
      : null;
  }

  return items;
}

function toProject(video: VimeoApiVideo): Project {
  const vimeoId = getVimeoId(video.uri);
  const image = pickLargestPicture(video);
  const date = video.created_time ?? video.release_time ?? "";
  const category: ProjectCategory = getTitleCategory(video.name) ?? vimeoCategoryMap[vimeoId] ?? "Commercial";

  return {
    id: `${slugify(video.name)}-${vimeoId}`,
    title: video.name,
    category,
    year: date ? new Date(date).getFullYear().toString() : "",
    uploadedAt: date,
    thumbnail: image,
    heroImage: image,
    vimeoId,
    vimeoUrl: video.link,
    description: cleanDescription(video.description),
    colorist: "Javier García",
    stills: [],
  };
}

export async function getPortfolioProjects() {
  const token = process.env.VIMEO_ACCESS_TOKEN;
  if (!token) {
    return cachedProjects.map((project) => ({
      ...project,
      category: getTitleCategory(project.title) ?? project.category,
    }));
  }

  try {
    const videos = await fetchVimeoPages<VimeoApiVideo>(
      `https://api.vimeo.com/users/${VIMEO_USERNAME}/videos?per_page=100&sort=date&direction=desc`,
      token,
    );
    const byId = new Map(videos.map((video) => [getVimeoId(video.uri), video]));
    return [...byId.values()].map(toProject);
  } catch {
    return cachedProjects;
  }
}

export async function getPortfolioProject(id: string) {
  const projects = await getPortfolioProjects();
  return projects.find((project) => project.id === id);
}

export async function getAdjacentPortfolioProjects(id: string) {
  const projects = await getPortfolioProjects();
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

export { categories };
