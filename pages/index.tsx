import { GetStaticProps } from "next";
import { getLatestPosts, getSponsors } from "lib/api";
import Layout from "components/layout";
import Season from "components/season";
import LatestPosts, { Post } from "components/latest-posts";
import TableMatch from "components/table-match";
import dynamic from "next/dynamic";
import Sponsors, { Sponsor } from "components/sponsors";

interface Props {
  posts: Post[];
  sponsors: Sponsor[];
}
// To be sure that window object exists
const DynamicSponsors = dynamic(() => import("../components/sponsors"), {
  ssr: false,
});

export default function Index({ posts, sponsors }: Props) {
  return (
    <Layout>
      <Season />
      <LatestPosts posts={posts} />
      <TableMatch />
      {/* <Sponsors sponsors={sponsors} /> */}
      <DynamicSponsors sponsors={sponsors} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const limit = 4;
  const { edges } = await getLatestPosts(preview, limit);
  const sponsors = await getSponsors(preview);

  return {
    props: { posts: edges, sponsors, preview },
    revalidate: 10,
  };
};
