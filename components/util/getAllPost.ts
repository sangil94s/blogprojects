import { notion } from './Notion';
import { BlogAllPostType } from '@/types/Infomation';

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

  return res.results.map((page: any) => ({
    postId: page.id,
    PostTitle: page.properties.PostTitle.title[0]?.plain_text || '제목 없음',
    Category: page.properties.Category.multi_select?.map((categorys: any) => categorys.name) || [],
    Skills: page.properties.Skill.multi_select?.map((techskills: any) => techskills.name) || [],
    CreateDate: page.properties.CreateDate.date?.start || '',
    SmallDescription: page.properties.SmallDescription.rich_text[0]?.plain_text || '',
  }));
}
