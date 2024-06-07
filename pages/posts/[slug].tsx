import Layout from "components/layout";
import Image from "next/image";
import { getPost, getAllPostSlugs } from "lib/api";
import { GetStaticPaths, GetStaticProps } from "next";
import { parseDate } from "lib/utils";

interface Props {
  post: {
    slug: string;
    postFields: {
      title: string;
      content: string;
      date: string;
      image: {
        node: {
          sourceUrl: string;
        };
      };
    };
  };
}

export default function SinglePost({ post }: Props) {
  const { title, content, date, image } = post.postFields;
  return (
    <Layout pageTitle="Aktualności">
      <section className="p-responsive header-offset flex flex-col items-center justify-center w-full min-h-screen">
        <div className="max-w-screen-md xl:max-w-screen-lg flex flex-col justify-center p-4">
          <h1 className="font-bold text-lg sm:text-3xl">{title}</h1>
          <div className="flex flex-col pt-4 ">
            <Image
              width={1000}
              height={1000}
              src={image.node.sourceUrl}
              alt={`Hero image of post ${post.slug}`}
              className="w-full h-auto max-h-[400px] object-cover object-bottom rounded-md"
            />
            <span className="py-4 font-bold text-sm sm:text-md">
              {parseDate(date)}
            </span>
          </div>
          <p className=" text-sm sm:text-lg text-justify">{content}</p>
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
