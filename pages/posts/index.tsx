import { GetStaticProps } from "next";
import { getLatestPosts, getPrevPosts, getNextPosts } from "@/lib/api";
import Layout from "@/components/Layout";
import { Post } from "@/components/LatestPosts";
import Link from "next/link";
import { paths } from "@/lib/routes";
import { parseDate } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { redirect } from "next/navigation";

const POSTS_PER_PAGE = 4;
const API_URL = "http://127.0.0.1:10003/graphql";

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
        API_URL
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
        API_URL
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
      <section className="p-responsive flex justify-between flex-col items-center w-full min-h-screen pt-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {visiblePosts.map((post) => {
            const { title, date, image } = post.node.postFields;
            return (
              <Link
                className="card w-[280px] min-[350px]:w-[350px] h-[300px] sm:w-[450px] sm:h-[350px] bg-base-100 shadow-xl relative"
                href={`${paths.POSTS}/${post.node.slug}`}
                key={post.node.id}
              >
                {isLoading ? (
                  <div className="absolute w-full h-full skeleton" />
                ) : (
                  <>
                    <figure className="grow-[4]">
                      <Image
                        src={image.node.sourceUrl}
                        alt="Shoes"
                        width={450}
                        height={350}
                        className="object-contain"
                      />
                    </figure>
                    <div className="card-body p-3 grow-[1]">
                      <h2 className="card-title text-md">{title}</h2>
                      <p className="text-sm">{parseDate(date)}</p>
                    </div>
                  </>
                )}
              </Link>
            );
          })}
        </div>
        <div className="join grid grid-cols-2 my-4">
          <button
            disabled={!currentPageInfo.hasPreviousPage || isLoading}
            className="join-item btn btn-outline text-3xl"
            onClick={fetchPrevPosts}
          >
            «
          </button>
          <button
            disabled={!currentPageInfo.hasNextPage || isLoading}
            className="join-item btn btn-outline text-3xl"
            onClick={fetchNextPosts}
          >
            »
          </button>
        </div>
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
