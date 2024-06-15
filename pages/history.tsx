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

export default function History({ page }: Props) {
  return (
    <Layout pageTitle="Historia">
      <div className="p-responsive header-offset flex justify-center">
        <div className="max-w-screen-lg flex flex-col">
          <h1 className="font-bold text-2xl pb-4">{page.title}</h1>
          <article className="history text-justify">
            {parse(page.content)}
          </article>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const page = await getPage(`${process.env.NEXT_PUBLIC_HISTORY_PAGE_ID}`);
  return {
    props: { page },
    revalidate: 10,
  };
};
