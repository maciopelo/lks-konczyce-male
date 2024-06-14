import { GetStaticProps, GetStaticPaths } from "next";
import { getPosts, getAllPostSlugs } from "lib/api";
import Layout from "components/layout";
import { Post } from "lib/types";
import { PageInfo } from "lib/types";
import Pagination from "components/pagination";
import Posts from "@/components/posts";
import { useRouter } from "next/router";
import { paths } from "@/lib/routes";

const POSTS_PER_PAGE = 4;

interface Props {
  posts: Post[];
  pageInfo: PageInfo;
}

export default function Index({ posts, pageInfo }: Props) {
  const router = useRouter();

  const page = Number(router?.query?.page) ?? 1;

  if (typeof window !== "undefined" && page === 1) {
    router.push("/posts");
  }

  return (
    <Layout pageTitle="Aktualności">
      <section className="p-responsive flex justify-between flex-col items-center w-full min-h-screen header-offset">
        <Posts posts={posts} />
        <Pagination
          prevDisabled={!pageInfo.offsetPagination.hasPrevious}
          nextDisabled={!pageInfo.offsetPagination.hasMore}
          prevLink={`${paths.POSTS}/page/${page - 1}`}
          nextLink={`${paths.POSTS}/page/${page + 1}`}
        />
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { edges } = await getAllPostSlugs();

  const paths = new Array(Math.ceil(edges.length / POSTS_PER_PAGE))
    .fill(null)
    .map((_, idx) => `/posts/page/${idx + 1}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = Number(params?.page) ?? 1;
  const offset = (page - 1) * POSTS_PER_PAGE;

  const { edges, pageInfo } = await getPosts(POSTS_PER_PAGE, offset);
  return {
    props: { posts: edges, pageInfo },
    revalidate: 10,
  };
};
