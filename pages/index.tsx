import { GetStaticProps } from "next";
import { getPosts, getSponsors, getLastestMatches } from "lib/api";
import Layout from "components/layout";
import Season from "components/season";
import LatestPosts from "components/latest-posts";
import TableMatch from "components/table-match";
import dynamic from "next/dynamic";
import { PageInfo, Match, Sponsor, Post } from "lib/types";

interface Props {
  posts: Post[];
  sponsors: Sponsor[];
  matchesData: { edges: Match[]; pageInfo: PageInfo };
}
// To be sure that window object exists
const DynamicSponsors = dynamic(() => import("../components/sponsors"), {
  ssr: false,
});

export default function Index({ posts, sponsors, matchesData }: Props) {
  return (
    <Layout>
      <Season />
      <LatestPosts posts={posts} />
      <TableMatch matchesData={matchesData} />
      <DynamicSponsors sponsors={sponsors} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const latestPosts = await getPosts(4);
  const sponsors = await getSponsors(preview);
  const matchesData = await getLastestMatches(5);

  return {
    props: {
      posts: latestPosts.edges,
      sponsors: sponsors.edges,
      matchesData,
      preview,
    },
    revalidate: 10,
  };
};
