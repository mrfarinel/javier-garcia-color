import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { vimeoCategoryMap } from "../src/data/vimeo-categories";
import { featuredVimeoIds, hiddenVimeoIds, titleCategoryMap } from "../src/data/vimeo-projects";

type ProjectCategory = "Commercial" | "Film" | "Fiction" | "Series" | "Music Video";

type VimeoProject = {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  uploadedAt?: string;
  thumbnail: string;
  heroImage: string;
  vimeoId: string;
  vimeoUrl: string;
  description?: string;
  colorist: "Javier García";
  stills: [];
};

type PublicVimeoVideo = {
  id: number;
  title: string;
  description?: string;
  url: string;
  upload_date: string;
  thumbnail_large: string;
};

type VimeoApiPicture = {
  width: number;
  link: string;
};

type VimeoApiVideo = {
  uri: string;
  name: string;
  description?: string | null;
  link: string;
  created_time?: string;
  release_time?: string;
  pictures?: {
    sizes?: VimeoApiPicture[];
  };
};

type VimeoApiCollection = {
  uri: string;
  name: string;
};

const VIMEO_USERNAME = "mrfarinel";
const EXPECTED_PROFILE_VIDEO_TOTAL = 56;
const FALLBACK_CATEGORY: ProjectCategory = "Commercial";
const categoryPriority: ProjectCategory[] = ["Fiction", "Series", "Music Video", "Commercial"];

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getVimeoId(value: string | number) {
  const raw = String(value);
  const match = raw.match(/(\d+)(?:$|[/?#])/);
  return match ? match[1] : raw;
}

function normalizeCategory(value?: string): ProjectCategory {
  const category = value?.toLowerCase() ?? "";

  if (category.includes("fiction") || category.includes("film") || category.includes("short")) return "Fiction";
  if (category.includes("series")) return "Series";
  if (category.includes("music video") || category.includes("music") || category.includes("videoclip")) {
    return "Music Video";
  }
  if (category.includes("commercial") || category.includes("advertising") || category.includes("ads")) {
    return "Commercial";
  }

  return FALLBACK_CATEGORY;
}

function getCategoryRank(category: ProjectCategory) {
  return categoryPriority.indexOf(category);
}

function chooseCategory(current: ProjectCategory | undefined, next: ProjectCategory) {
  if (!current) return next;
  return getCategoryRank(next) < getCategoryRank(current) ? next : current;
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

function cleanDescription(value?: string | null) {
  if (!value) return undefined;

  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function pickLargestPicture(sizes?: VimeoApiPicture[]) {
  if (!sizes?.length) return "";
  return [...sizes].sort((a, b) => b.width - a.width)[0].link;
}

async function fetchJson<T>(url: string, token?: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Vimeo request failed: ${response.status} ${url}`);
  }

  return response.json() as Promise<T>;
}

async function loadEnvLocal() {
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    const content = await readFile(envPath, "utf8");

    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env.local is optional. Public Vimeo import works without it.
  }
}

async function fetchVimeoApiPages<T>(url: string, token: string) {
  const items: T[] = [];
  let nextUrl: string | null = url;

  while (nextUrl) {
    const page: { data: T[]; paging?: { next?: string | null } } = await fetchJson(nextUrl, token);
    items.push(...page.data);
    if (!page.paging?.next) {
      nextUrl = null;
    } else {
      nextUrl = page.paging.next.startsWith("http")
        ? page.paging.next
        : `https://api.vimeo.com${page.paging.next}`;
    }
  }

  return items;
}

async function fetchApiCollectionCategories(token: string) {
  const categoryByVideoId = new Map<string, ProjectCategory>();
  const videosById = new Map<string, VimeoApiVideo>();
  let collectionVideoCount = 0;

  try {
    const collections = await fetchVimeoApiPages<VimeoApiCollection>(
      `https://api.vimeo.com/users/${VIMEO_USERNAME}/albums?per_page=100`,
      token,
    );

    for (const collection of collections) {
      const collectionId = collection.uri.split("/").pop();
      if (!collectionId) continue;

      const category = normalizeCategory(collection.name);
      const videos = await fetchVimeoApiPages<VimeoApiVideo>(
        `https://api.vimeo.com/users/${VIMEO_USERNAME}/albums/${collectionId}/videos?per_page=100`,
        token,
      );

      for (const video of videos) {
        const vimeoId = getVimeoId(video.uri);
        collectionVideoCount += 1;
        videosById.set(vimeoId, video);
        categoryByVideoId.set(vimeoId, chooseCategory(categoryByVideoId.get(vimeoId), category));
      }
    }
  } catch (error) {
    console.warn("Could not read Vimeo showcases/albums. Falling back to manual category map.");
  }

  return { categoryByVideoId, collectionVideoCount, videosById };
}

async function loadFromVimeoApi(token: string): Promise<VimeoProject[]> {
  const { categoryByVideoId, collectionVideoCount, videosById } = await fetchApiCollectionCategories(token);
  const videos = await fetchVimeoApiPages<VimeoApiVideo>(
    `https://api.vimeo.com/users/${VIMEO_USERNAME}/videos?per_page=100&sort=date&direction=desc`,
    token,
  );
  const allVideosById = new Map<string, VimeoApiVideo>();

  for (const video of videos) {
    allVideosById.set(getVimeoId(video.uri), video);
  }

  for (const [vimeoId, video] of videosById) {
    if (!allVideosById.has(vimeoId)) {
      allVideosById.set(vimeoId, video);
    }
  }

  const projects: VimeoProject[] = [...allVideosById.values()].map((video) => {
    const vimeoId = getVimeoId(video.uri);
    const title = video.name;
    const thumbnail = pickLargestPicture(video.pictures?.sizes);
    const date = video.created_time ?? video.release_time ?? "";
    const detectedCategory = categoryByVideoId.get(vimeoId);
    const category = getTitleCategory(title) ?? vimeoCategoryMap[vimeoId] ?? detectedCategory ?? FALLBACK_CATEGORY;

    return {
      id: `${slugify(title)}-${vimeoId}`,
      title,
      category,
      year: date ? new Date(date).getFullYear().toString() : "",
      uploadedAt: date,
      thumbnail,
      heroImage: thumbnail,
      vimeoId,
      vimeoUrl: video.link,
      description: cleanDescription(video.description),
      colorist: "Javier García",
      stills: [],
    };
  });

  logImportSummary({
    projects,
    fallbackVideoIds: projects
      .filter((project) => !vimeoCategoryMap[project.vimeoId] && !categoryByVideoId.has(project.vimeoId))
      .map((project) => project.vimeoId),
    profileVideoCount: videos.length,
    collectionVideoCount,
    expectedProfileVideoTotal: EXPECTED_PROFILE_VIDEO_TOTAL,
    source: "Vimeo API",
  });

  return projects;
}

async function loadFromPublicProfile(): Promise<VimeoProject[]> {
  const videos = await fetchJson<PublicVimeoVideo[]>(`https://vimeo.com/api/v2/${VIMEO_USERNAME}/videos.json`);

  const projects: VimeoProject[] = videos.map((video) => {
    const vimeoId = String(video.id);

    return {
      id: `${slugify(video.title)}-${vimeoId}`,
      title: video.title,
      category: getTitleCategory(video.title) ?? vimeoCategoryMap[vimeoId] ?? FALLBACK_CATEGORY,
      year: new Date(video.upload_date).getFullYear().toString(),
      uploadedAt: video.upload_date,
      thumbnail: video.thumbnail_large,
      heroImage: video.thumbnail_large,
      vimeoId,
      vimeoUrl: video.url,
      description: cleanDescription(video.description),
      colorist: "Javier García",
      stills: [],
    };
  });

  logImportSummary({
    projects,
    fallbackVideoIds: projects
      .filter((project) => !vimeoCategoryMap[project.vimeoId])
      .map((project) => project.vimeoId),
    profileVideoCount: videos.length,
    collectionVideoCount: 0,
    expectedProfileVideoTotal: EXPECTED_PROFILE_VIDEO_TOTAL,
    source: "public Vimeo profile feed",
  });
  console.warn(
    "Public Vimeo feed does not expose paginated account videos or showcase structure. Set VIMEO_ACCESS_TOKEN for full import.",
  );

  return projects;
}

function logImportSummary({
  projects,
  profileVideoCount,
  collectionVideoCount,
  fallbackVideoIds,
  expectedProfileVideoTotal,
  source,
}: {
  projects: VimeoProject[];
  profileVideoCount: number;
  collectionVideoCount: number;
  fallbackVideoIds: string[];
  expectedProfileVideoTotal: number;
  source: string;
}) {
  const totalsByCategory = projects.reduce<Record<ProjectCategory, number>>(
    (totals, project) => {
      totals[project.category] += 1;
      return totals;
    },
    {
      Commercial: 0,
      Film: 0,
      Fiction: 0,
      Series: 0,
      "Music Video": 0,
    },
  );
  const fallbackIds = new Set(fallbackVideoIds);
  const fallbackProjects = projects.filter((project) => fallbackIds.has(project.vimeoId));

  console.log(`Vimeo source: ${source}`);
  console.log(`Total videos fetched from user profile: ${profileVideoCount}`);
  console.log(`Expected public Vimeo profile total from profile HTML: ${expectedProfileVideoTotal}`);
  console.log(`Total videos fetched from showcases/albums: ${collectionVideoCount}`);
  console.log(`Total unique videos imported: ${projects.length}`);
  if (profileVideoCount < expectedProfileVideoTotal) {
    console.warn(
      `Imported profile video count is below Vimeo profile total (${profileVideoCount}/${expectedProfileVideoTotal}). Use VIMEO_ACCESS_TOKEN with full read access to import every video.`,
    );
  }
  console.log("Total by category:");

  for (const [category, total] of Object.entries(totalsByCategory)) {
    if (total > 0) console.log(`- ${category}: ${total}`);
  }

  if (fallbackProjects.length) {
    console.log("Videos using fallback category Commercial:");
    for (const project of fallbackProjects) {
      console.log(`- ${project.vimeoId}: ${project.title}`);
    }
  } else {
    console.log("Videos using fallback category Commercial: none");
  }
}

function formatProjectsFile(projects: VimeoProject[]) {
  return `export type ProjectCategory = "Commercial" | "Film" | "Fiction" | "Series" | "Music Video";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  uploadedAt?: string;
  thumbnail: string;
  heroImage: string;
  vimeoId: string;
  vimeoUrl: string;
  director?: string;
  dop?: string;
  production?: string;
  agency?: string;
  client?: string;
  colorist: "Javier García";
  description?: string;
  stills: string[];
};

// This file is generated by scripts/import-vimeo.ts.
// Paste only the numeric Vimeo ID when manually editing video IDs.
// Example:
// Vimeo URL: https://vimeo.com/123456789
// vimeoId: "123456789"
export const projects: Project[] = ${JSON.stringify(projects, null, 2)};

export const categories = ["All", "Commercials", "Fiction", "Music Videos", "Series"] as const;

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

export function getAdjacentProjects(id: string) {
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
`;
}

async function main() {
  await loadEnvLocal();

  const token = process.env.VIMEO_ACCESS_TOKEN;
  const importedProjects = token ? await loadFromVimeoApi(token) : await loadFromPublicProfile();
  const hiddenIds = new Set(hiddenVimeoIds);
  const featuredOrder = new Map(featuredVimeoIds.map((id, index) => [id, index]));
  const projects = importedProjects
    .filter((project) => !hiddenIds.has(project.vimeoId))
    .sort((a, b) => {
      const aFeatured = featuredOrder.get(a.vimeoId);
      const bFeatured = featuredOrder.get(b.vimeoId);

      if (aFeatured !== undefined && bFeatured !== undefined) return aFeatured - bFeatured;
      if (aFeatured !== undefined) return -1;
      if (bFeatured !== undefined) return 1;
      return Date.parse(b.uploadedAt ?? b.year) - Date.parse(a.uploadedAt ?? a.year);
    });
  const outputPath = path.join(process.cwd(), "src/data/projects.ts");

  await writeFile(outputPath, formatProjectsFile(projects));

  console.log(`Imported ${projects.length} Vimeo projects into src/data/projects.ts`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
