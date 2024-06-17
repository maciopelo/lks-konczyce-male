import Layout from "components/layout";
import { getPage } from "@/lib/api";
import { GetStaticProps } from "next";
import parse from "html-react-parser";

interface Props {
  page: {
    title: string;
    content: string;
  };
}

export default function PoliticsPrivacy({ page }: Props) {
  return (
    <Layout pageTitle="Polityka prywatności">
      <div className="p-responsive header-offset flex justify-center">
        <div className="max-w-screen-lg flex flex-col">
          <h1 className="font-bold text-2xl pb-4">{page.title}</h1>
          <article className="politics-privacy text-justify">
            {parse(page.content)}
          </article>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const page = await getPage(`${process.env.POLITICS_PRIVACY_PAGE_ID}`);
  return {
    props: { page },
    revalidate: 10,
  };
};
