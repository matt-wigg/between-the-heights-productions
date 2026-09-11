import type { Project } from '@/lib/projects';

interface VimeoOEmbed {
  thumbnail_url?: string;
}

/**
 * Resolve a 16:9 still for a project card.
 *
 * Local stills win. YouTube exposes a predictable thumbnail URL. Vimeo
 * thumbnails are looked up through the public oEmbed endpoint (no API key
 * needed) and cached for a day; if the lookup fails the card falls back to
 * the placeholder tile from the design.
 */
export async function getThumbnail(project: Project): Promise<string | null> {
  if (project.still) return project.still;

  if (project.source.kind === 'youtube') {
    return `https://i.ytimg.com/vi/${project.source.id}/maxresdefault.jpg`;
  }

  const { id, hash } = project.source;
  const videoUrl = `https://vimeo.com/${id}${hash ? `/${hash}` : ''}`;
  const endpoint = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}&width=1280`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = (await res.json()) as VimeoOEmbed;
    return typeof data.thumbnail_url === 'string' ? data.thumbnail_url : null;
  } catch {
    return null;
  }
}
