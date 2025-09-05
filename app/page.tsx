import AllPostListCount from '@/components/Post/Main/AllPostListCount';
import MorePostsClient from '@/components/Post/Main/MorePostsClient';
import RecentPosts from '@/components/Post/Main/RecentPosts';

import { getAllPosts, getPostsPage } from '@/components/util/getAllPost';

export const revalidate = 0;

export default async function Home() {
  const initial = await getPostsPage({ pageSize: 10 });

  return (
    <div className="m-auto my-4 min-h-screen w-11/12 rounded-lg bg-white">
      <AllPostListCount count={(await getAllPosts())?.length} />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:basis-[80%]">
          <MorePostsClient
            initialPosts={initial.posts}
            nextPageToken={initial.nextCursor}
            hasMorePages={initial.hasMore}
            pageSize={1}
          />
        </div>
        <aside className="m-1 w-full lg:sticky lg:top-24 lg:max-w-sm lg:basis-[15%]">
          <RecentPosts />
        </aside>
      </div>
    </div>
  );
}
