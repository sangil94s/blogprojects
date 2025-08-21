import { notion } from './Notion';
import type { BlogAllPostType, CategoryFilter } from '@/types/Infomation';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export async function getAllPosts(): Promise<BlogAllPostType[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    sorts: [
      {
        property: 'CreateDate',
        direction: 'descending',
      },
    ],
  });

  return res.results.map(page => {
    const typedPage = page as PageObjectResponse;

    return {
      postId:
        typedPage.properties.postId?.type === 'number'
          ? (typedPage.properties.postId.number ?? 0)
          : 0,
      PostTitle:
        typedPage.properties.PostTitle?.type === 'title'
          ? (typedPage.properties.PostTitle.title[0]?.plain_text ?? '제목 없음')
          : '제목 없음',
      Category:
        typedPage.properties.Category?.type === 'multi_select'
          ? typedPage.properties.Category.multi_select.map(item => item.name)
          : [],
      Skills:
        typedPage.properties.Skill?.type === 'multi_select'
          ? typedPage.properties.Skill.multi_select.map(item => item.name)
          : [],
      CreateDate:
        typedPage.properties.CreateDate?.type === 'date'
          ? (typedPage.properties.CreateDate.date?.start ?? '')
          : '',
      SmallDescription:
        typedPage.properties.SmallDescription?.type === 'rich_text'
          ? (typedPage.properties.SmallDescription.rich_text[0]?.plain_text ?? '')
          : '',
    };
  });
}

// Category 기준으로 필터링하는 함수
export function filterPostsByCategory(
  posts: BlogAllPostType[],
  category: CategoryFilter,
): BlogAllPostType[] {
  if (category === '전체') {
    return posts;
  }

  return posts.filter(post => post.Category.some(cat => cat === category));
}

export async function getPostsPage(params: {
  pageSize: number;
  startCursor?: string;
}): Promise<{ posts: BlogAllPostType[]; nextCursor: string | null; hasMore: boolean }> {
  const { pageSize, startCursor } = params;

  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    page_size: pageSize,
    start_cursor: startCursor,
    sorts: [
      {
        property: 'CreateDate',
        direction: 'descending',
      },
    ],
  });

  const posts = res.results.map(page => {
    const typedPage = page as PageObjectResponse;

    return {
      postId:
        typedPage.properties.postId?.type === 'number'
          ? (typedPage.properties.postId.number ?? 0)
          : 0,
      PostTitle:
        typedPage.properties.PostTitle?.type === 'title'
          ? (typedPage.properties.PostTitle.title[0]?.plain_text ?? '제목 없음')
          : '제목 없음',
      Category:
        typedPage.properties.Category?.type === 'multi_select'
          ? typedPage.properties.Category.multi_select.map(item => item.name)
          : [],
      Skills:
        typedPage.properties.Skill?.type === 'multi_select'
          ? typedPage.properties.Skill.multi_select.map(item => item.name)
          : [],
      CreateDate:
        typedPage.properties.CreateDate?.type === 'date'
          ? (typedPage.properties.CreateDate.date?.start ?? '')
          : '',
      SmallDescription:
        typedPage.properties.SmallDescription?.type === 'rich_text'
          ? (typedPage.properties.SmallDescription.rich_text[0]?.plain_text ?? '')
          : '',
    };
  });

  return {
    posts,
    nextCursor: res.next_cursor ?? null,
    hasMore: res.has_more ?? false,
  };
}
