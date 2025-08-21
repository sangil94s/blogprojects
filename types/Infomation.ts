// 타입 정보를 여기에

export interface BlogAllPostType {
  postId: number;
  PostTitle: string;
  Category: string[];
  Skills: string[];
  CreateDate: string;
  SmallDescription: string;
}

export interface PostTypes {
  posts: BlogAllPostType[];
}

export interface CountType {
  count: number;
}

export interface MorePostsClientProps {
  initialPosts: BlogAllPostType[];
  nextPageToken: string | null;
  hasMorePages: boolean;
  pageSize?: number;
}

export type CategoryFilter =
  | '전체'
  | 'ETC'
  | '프론트엔드'
  | '백엔드'
  | '배포'
  | '에러-시행착오'
  | '회고';

export interface FilterProps {
  selectedCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  posts: BlogAllPostType[];
}
