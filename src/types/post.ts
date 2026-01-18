export interface PostMeta {
  title: string;
  slug: string;
  date: string; // ISO 8601
  description: string;
  type?: 'post' | 'doc' | 'doc:commit'; // Default is 'post'
  
  author?: string;
  feature?: string;
  projectId?: string;
  topics?: string[];
  
  sourceUrl?: string;
  commitHash?: string; // For doc:commit type - links to GitHub commit
  
  tags?: string[];
  draft?: boolean;
  image?: string;
  updated?: string;
}

export interface Post {
  filename: string;
  metadata: PostMeta;
}
