import { GetStaticProps } from "next";
import { getPosts } from "lib/api";
import Layout from "components/layout";
import { Post } from "lib/types";
import { PageInfo } from "lib/types";
import Pagination from "components/pagination";
import Posts from "@/components/posts";
import { paths } from "@/lib/routes";

const POSTS_PER_PAGE = 4;

interface Props {
  posts: Post[];
  pageInfo: PageInfo;
}

export default function Index({ posts, pageInfo }: Props) {
  return (
    <Layout pageTitle="Aktualności">
      <section className="p-responsive flex justify-between flex-col items-center w-full min-h-screen header-offset">
        <Posts posts={posts} />
        <Pagination
          prevDisabled={!pageInfo.offsetPagination.hasPrevious}
          nextDisabled={!pageInfo.offsetPagination.hasMore}
          nextLink={`${paths.POSTS}/page/2`}
        />
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { edges, pageInfo } = await getPosts(POSTS_PER_PAGE);
  return {
    props: { posts: edges, pageInfo },
    revalidate: 10,
  };
};
