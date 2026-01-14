export interface PostMeta {
  title: string;
  slug: string;
  date: string; // ISO 8601
  description: string;
  
  projectId?: string;
  topics?: string[];
  
  relatedPosts?: string[];
  sourceUrl?: string;
  
  tags?: string[];
  draft?: boolean;
  image?: string;
  updated?: string;
}

export interface Post {
  filename: string;
  metadata: PostMeta;
}
