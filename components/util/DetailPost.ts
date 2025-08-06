/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NotionToMarkdown } from 'notion-to-md';
import { notion } from './Notion';

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getDetailPostById(postId: number) {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'postId',
      number: {
        equals: postId,
      },
    },
  });

  const page = res.results[0];
  if (!page) return null;

  const props = (page as any).properties;
  const content = await n2m.pageToMarkdown(page.id);
  const markdown = n2m.toMarkdownString(content);

  return {
    id: page.id,
    postId: props.postId.number,
    title: props.PostTitle.title[0]?.plain_text || '',
    category: props.Category.multi_select?.map((categorys: any) => categorys.name) || [],
    skills: props.Skill.multi_select?.map((skills: any) => skills.name) || [],
    date: props.CreateDate.date?.start || '',
    desc: props.SmallDescription.rich_text[0]?.plain_text || '',
    markdown,
  };
}
