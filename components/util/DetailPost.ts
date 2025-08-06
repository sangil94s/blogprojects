import { NotionToMarkdown } from 'notion-to-md';
import { notion } from './Notion';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

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
  if (!page || page.object !== 'page') return null;
  const typedPage = page as PageObjectResponse;

  const props = typedPage.properties;
  const content = await n2m.pageToMarkdown(page.id);
  const markdown = n2m.toMarkdownString(content);

  return {
    id: page.id,
    postId: props.postId?.type === 'number' ? (props.postId.number ?? 0) : 0,
    title: props.PostTitle.type === 'title' ? (props.PostTitle.title[0]?.plain_text ?? '') : '',
    category:
      props.Category?.type === 'multi_select'
        ? props.Category.multi_select.map(item => item.name)
        : [],
    skills:
      props.Skill?.type === 'multi_select' ? props.Skill.multi_select.map(item => item.name) : [],
    date: props.CreateDate?.type === 'date' ? (props.CreateDate.date?.start ?? '') : '',
    desc:
      props.SmallDescription?.type === 'rich_text'
        ? (props.SmallDescription.rich_text[0]?.plain_text ?? '')
        : '',
    markdown,
  };
}
