export type CategoryType = 'All' | 'Website' | 'System & ERP' | 'Mobile' | 'UI/UX';

export interface Collaborator {
  _key?: string;
  name: string;
  role: string;
  role_id?: string;
  role_en?: string;
  instagram?: string;
}

export interface TechStackItem {
  name: string;
  url?: string;
  icon?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  title_id?: string;
  title_en?: string;
  overview: string;
  overview_id?: string;
  overview_en?: string;
  category: string;
  category_id?: string;
  category_en?: string;
  tags: string[];
  tags_id?: string[];
  tags_en?: string[];
  demoUrl?: string;
  githubUrl?: string;
  sourceCodeUrl?: string;
  demoLabel?: string;
  demoLabel_id?: string;
  demoLabel_en?: string;
  primaryButtonIcon?: 'call' | 'eye' | 'arrow';
  secondaryButtonLabel?: string;
  secondaryButtonLabel_id?: string;
  secondaryButtonLabel_en?: string;
  secondaryButtonUrl?: string;
  secondaryButtonIcon?: 'call' | 'arrow';
  images: string[];
  uploadedDate: string;
  collaborators?: string;
  collaborators_id?: string;
  collaborators_en?: string;
  authors?: Collaborator[];
  techStack: (TechStackItem | string)[];
  highlights?: string[];
  featured?: boolean;
}

export interface BlogContentSpan {
  _key?: string;
  _type?: string;
  marks?: string[];
  text: string;
}

export interface BlogContentMarkDef {
  _key: string;
  _type: string;
  href?: string;
}

export interface BlogContentBlock {
  _key?: string;
  _type: string;
  style?: string;
  level?: number;
  listItem?: "bullet" | "number";
  children?: BlogContentSpan[];
  markDefs?: BlogContentMarkDef[];
  asset?: { _ref?: string; _type?: string };
  alt?: string;
  caption?: string;
}

export interface BlogAuthor {
  name: string;
  role?: string;
  role_id?: string;
  role_en?: string;
  avatar?: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  title_id?: string;
  title_en?: string;
  excerpt: string;
  excerpt_id?: string;
  excerpt_en?: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  tags_id?: string[];
  tags_en?: string[];
  coverImage: string;
  content: string;
  content_id?: string;
  content_en?: string;
  category?: string;
  category_id?: string;
  category_en?: string;
  author?: BlogAuthor;
  contentBlocks?: BlogContentBlock[];
  contentBlocks_id?: BlogContentBlock[];
  contentBlocks_en?: BlogContentBlock[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage: string;
  content: string[];
  keyTakeaways?: string[];
}

export interface WorkExperience {
  id: string;
  period: string;
  period_id?: string;
  period_en?: string;
  role: string;
  role_id?: string;
  role_en?: string;
  company: string;
  description: string;
  description_id?: string;
  description_en?: string;
  skills: string[];
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  title_id?: string;
  title_en?: string;
  issuer: string;
  category: string;
  category_id?: string;
  category_en?: string;
}

export interface Education {
  id: string;
  period: string;
  period_id?: string;
  period_en?: string;
  institution: string;
  degree: string;
  degree_id?: string;
  degree_en?: string;
  major: string;
  major_id?: string;
  major_en?: string;
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database & CMS' | 'Tools & Marketing';
  icon?: string;
  level: string;
}

export type ActivePage = 'home' | 'about' | 'projects' | 'blogs' | 'project-detail' | 'blog-detail';

