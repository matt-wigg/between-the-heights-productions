export const site = {
  name: 'Between The Heights Productions',
  shortName: 'Between The Heights',
  tagline: 'Editing, directing and videography for brands, labels and independent film. Southern California.',
  description:
    'Between The Heights Productions is a Southern California production company led by editor and director Daniel DuVall. Brand spots, music videos, listing films and narrative work.',
  owner: 'Daniel DuVall',
  email: 'danielduvall22@gmail.com',
  phoneDisplay: '(+1) 814-494-0811',
  phoneHref: 'tel:8144940811',
  social: {
    linkedin: 'https://www.linkedin.com/in/daniel-duvall-47384913b/',
    youtube: 'https://www.youtube.com/channel/UCM9fIG9SMJaTTtRhKxxtVaA',
    vimeo: 'https://vimeo.com/user48513860',
  },
} as const;

export const navItems = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Studio', href: '/studio' },
] as const;
