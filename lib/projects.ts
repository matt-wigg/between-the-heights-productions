export type ProjectCategory = 'Reel' | 'Narrative' | 'Music video' | 'Commercial';

export interface Project {
  slug: string;
  /** Short label shown on the detail page eyebrow, e.g. "Reel, 2024". */
  tag: string;
  /** Category badge shown on cards. */
  category: ProjectCategory;
  title: string;
  /** One-line subtitle shown on cards. */
  subtitle: string;
  client: string;
  role: string;
  year: string;
  deliverables: string;
  summary: string;
  embed: string;
  brief: string;
  approach: string;
  outcome: string;
  /** Local still in /public. When absent a Vimeo/YouTube thumbnail is looked up. */
  still?: string;
  stillAlt: string;
  source: { kind: 'youtube'; id: string } | { kind: 'vimeo'; id: string; hash?: string };
}

export const projects: Project[] = [
  {
    slug: '2024-demo-reel',
    tag: 'Reel, 2024',
    category: 'Reel',
    title: '2024 Demo Reel',
    subtitle: 'Two minutes across every format we work in',
    client: 'Between The Heights Productions',
    role: 'Editor and director',
    year: '2024',
    deliverables: '2:00 reel',
    summary: 'Two minutes across every format we work in: brand, music, narrative and real estate.',
    embed: 'https://www.youtube.com/embed/M7YusauFAlU?rel=0',
    brief:
      'Give a prospective client one link that shows range, without asking them to watch five separate films.',
    approach:
      'Cut to a single rhythmic spine, so the jumps between commercial and narrative read as deliberate rather than as a grab bag.',
    outcome:
      'The reel opens most conversations, and briefs tend to arrive referencing a specific shot in it.',
    still: '/reel-2024.jpg',
    stillAlt: '2024 demo reel',
    source: { kind: 'youtube', id: 'M7YusauFAlU' },
  },
  {
    slug: 'the-david-project',
    tag: 'Narrative',
    category: 'Narrative',
    title: 'The David Project',
    subtitle: 'Sizzle reel, edited and directed',
    client: 'The David Project',
    role: 'Editor and director',
    year: '2023',
    deliverables: 'Sizzle reel',
    summary:
      'A sizzle reel built to raise finance for a feature. Proof of tone, cast and scale in under three minutes.',
    embed: 'https://www.youtube.com/embed/yA2OQY8Bh54?rel=0',
    brief:
      'Turn limited proof of concept footage into something that reads like a film with a budget behind it.',
    approach:
      'Structure first. A cold open on the strongest performance beat, then escalation carried by sound design instead of coverage that did not exist.',
    outcome: 'Used in investor meetings as the main pitch asset for the project.',
    still: '/david-project.jpg',
    stillAlt: 'The David Project sizzle reel',
    source: { kind: 'youtube', id: 'yA2OQY8Bh54' },
  },
  {
    slug: 'uptown-party',
    tag: 'Music video',
    category: 'Music video',
    title: 'Uptown Party',
    subtitle: 'The Faintest Glow, directed and edited',
    client: 'The Faintest Glow',
    role: 'Director and editor',
    year: '2022',
    deliverables: 'Music video',
    summary:
      'A performance led music video for The Faintest Glow, shot in a day and cut to the track.',
    embed: 'https://player.vimeo.com/video/796352574?h=3e18097ef5&byline=0',
    brief: 'One shoot day, one location, and a band that had never been on camera together.',
    approach:
      'Blocked the performance around the song structure so every chorus had a new camera position. Coverage planned as an edit, not as insurance.',
    outcome:
      'Featured by Music From the 412 in Pittsburgh, PA, and still the band’s most played video.',
    stillAlt: 'Uptown Party music video',
    source: { kind: 'vimeo', id: '796352574', hash: '3e18097ef5' },
  },
  {
    slug: 'friend-like-me',
    tag: 'Music video',
    category: 'Music video',
    title: 'EXP, Friend Like Me',
    subtitle: 'Performance video, edited',
    client: 'EXP',
    role: 'Editor',
    year: '2020',
    deliverables: 'Performance video',
    summary:
      'A performance video cut for pace, where the edit carries the energy the room could not.',
    embed: 'https://player.vimeo.com/video/387561971?h=bde7429dfb',
    brief: 'Footage from a single low light session that needed to feel like a live show.',
    approach:
      'Cut on the beat and on the breath, holding wides just long enough to let the track open up before tightening again.',
    outcome: 'Delivered in a week and became the artist’s calling card video.',
    stillAlt: 'EXP, Friend Like Me performance video',
    source: { kind: 'vimeo', id: '387561971', hash: 'bde7429dfb' },
  },
  {
    slug: 'torrey-pines',
    tag: 'Commercial',
    category: 'Commercial',
    title: 'Torrey Pines',
    subtitle: 'Lynda DuVall, San Diego Realtor',
    client: 'Lynda DuVall, San Diego Realtor',
    role: 'Director and editor',
    year: '2021',
    deliverables: 'Listing film',
    summary:
      'A listing film for a Torrey Pines property, treating the architecture the way a narrative treats a location.',
    embed: 'https://player.vimeo.com/video/504567581?h=9a3c551f61',
    brief: 'Sell a high value home to buyers who would only ever see it on a phone screen.',
    approach:
      'Moving camera through doorways to keep the spatial logic intact, graded for the light the house actually gets at golden hour.',
    outcome: 'Reused across the agent’s listing pages and social channels.',
    stillAlt: 'Torrey Pines listing film',
    source: { kind: 'vimeo', id: '504567581', hash: '9a3c551f61' },
  },
];

export const reel = projects[0];

/** Projects featured on the home page: David Project, Uptown Party, Torrey Pines. */
export const featuredSlugs = ['the-david-project', 'uptown-party', 'torrey-pines'];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
