import { GetStaticProps } from "next";
import { getLastThreePosts, getSponsors } from "@/lib/api";
import Layout from "@/components/Layout";
import Season from "@/components/Season";
import LatestPosts from "@/components/LatestPosts";
import TableMatch from "@/components/TableMatch";
import dynamic from "next/dynamic";

// To be sure that window object exists
const DynamicSponsors = dynamic(() => import("@/components/Sponsors"), {
  ssr: false,
});

export default function Index({ posts, sponsors }) {
  return (
    <Layout>
      <Season />
      <LatestPosts posts={posts} />
      <TableMatch />
      <DynamicSponsors sponsors={sponsors} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const posts = await getLastThreePosts(preview);
  const sponsors = await getSponsors(preview);

  return {
    props: { posts, sponsors, preview },
    revalidate: 10,
  };
};
