import { GetStaticProps } from "next";
import { getLatestPosts, getPrevPosts, getNextPosts } from "lib/api";
import Layout from "components/layout";
import { Post } from "components/latest-posts";
import Link from "next/link";
import { paths } from "lib/routes";
import { parseDate } from "lib/utils";
import Image from "next/image";
import { useState } from "react";
import { redirect } from "next/navigation";
import Pagination from "components/pagination";

const POSTS_PER_PAGE = 4;

interface Props {
  preview: boolean;
  posts: Post[];
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string;
    endCursor: string;
  };
}

export default function Index({ posts, pageInfo, preview }: Props) {
  const [visiblePosts, setVisiblePosts] = useState(posts);
  const [currentPageInfo, setCurrentPageInfo] = useState(pageInfo);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNextPosts = async () => {
    try {
      setIsLoading(true);
      const response = await getNextPosts(
        preview,
        POSTS_PER_PAGE,
        currentPageInfo.endCursor,
        process.env.NEXT_PUBLIC_WORDPRESS_API_URL
      );
      setIsLoading(false);
      setVisiblePosts(response.edges);
      setCurrentPageInfo(response.pageInfo);
    } catch (error) {
      redirect("/500");
    }
  };

  const fetchPrevPosts = async () => {
    try {
      setIsLoading(true);
      const response = await getPrevPosts(
        preview,
        POSTS_PER_PAGE,
        currentPageInfo.startCursor,
        process.env.NEXT_PUBLIC_WORDPRESS_API_URL
      );
      setIsLoading(false);
      setVisiblePosts(response.edges);
      setCurrentPageInfo(response.pageInfo);
    } catch (error) {
      redirect("/500");
    }
  };

  return (
    <Layout pageTitle="Aktualności">
      <section className="p-responsive flex justify-between flex-col items-center w-full min-h-screen header-offset">
        {isLoading ? (
          <span className="flex-1 loading loading-spinner loading-lg" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {visiblePosts.map((post) => {
              const { title, date, image } = post.node.postFields;
              return (
                <Link
                  className="card w-[280px] min-[350px]:w-[300px] h-[300px] sm:w-[400px] sm:h-[330px] bg-base-100 shadow-xl relative hover:animate-pulse"
                  href={`${paths.POSTS}/${post.node.slug}`}
                  key={post.node.id}
                >
                  <figure className="grow-[4] relative">
                    <Image
                      src={image.node.sourceUrl}
                      alt="Shoes"
                      width={450}
                      height={350}
                      style={{
                        maxWidth: "inherit",
                      }}
                      className="object-contain"
                    />
                    <div className="absolute h-full bg-dimDark w-full rounded-md" />
                  </figure>
                  <div className="card-body p-3 grow-[1]">
                    <h2 className="card-title text-md">{title}</h2>
                    <p className="text-sm">{parseDate(date)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <Pagination
          prevDisabled={!currentPageInfo.hasPreviousPage || isLoading}
          nextDisabled={!currentPageInfo.hasNextPage || isLoading}
          onPrevClick={fetchPrevPosts}
          onNextClick={fetchNextPosts}
        />
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const { edges, pageInfo } = await getLatestPosts(preview, POSTS_PER_PAGE);
  return {
    props: { posts: edges, pageInfo, preview },
    revalidate: 10,
  };
};
