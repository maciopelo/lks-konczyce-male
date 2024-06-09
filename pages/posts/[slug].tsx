import Layout from "components/layout";
import Image from "next/image";
import { getPost, getAllPostSlugs } from "lib/api";
import { GetStaticPaths, GetStaticProps } from "next";
import { parseDate } from "lib/utils";
import { PostData } from "lib/types";
import parse from "html-react-parser";
interface Props {
  post: PostData;
}

export default function SinglePost({ post }: Props) {
  const { title, content, date, image } = post.postFields;

  return (
    <Layout pageTitle="Aktualności">
      <section className="p-responsive header-offset flex flex-col items-center min-h-screen">
        <div className="max-w-screen-md flex flex-col justify-center">
          <h1 className="font-bold text-lg sm:text-3xl">{title}</h1>
          <div className="flex flex-col pt-4">
            <Image
              width={1000}
              height={1000}
              src={image.node.sourceUrl}
              alt={`Hero image of post ${post.slug}`}
              className="object-contain object-bottom rounded-md"
            />
            <span className="py-4 font-bold text-sm sm:text-md">
              {parseDate(date)}
            </span>
          </div>
          <article className=" text-sm sm:text-lg text-justify">
            {parse(content)}
          </article>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { edges } = await getAllPostSlugs();
  const paths =
    edges.map(
      ({ node }: { node: { slug: string } }) => `/posts/${node.slug}`
    ) || [];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  params,
}) => {
  const post = await getPost(preview, params?.slug as string);

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};
