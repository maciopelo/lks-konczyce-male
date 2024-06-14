import Layout from "components/layout";
import { getImages } from "lib/api";
import { GetStaticProps } from "next";
import Pagination from "components/pagination";
import { PageInfo } from "lib/types";
import { GalleryImage } from "lib/types";
import { paths } from "@/lib/routes";
import Images from "@/components/images";

const IMAGES_PER_PAGE = 9;

interface Props {
  images: GalleryImage[];
  pageInfo: PageInfo;
}

export default function Gallery({ images, pageInfo }: Props) {
  return (
    <Layout pageTitle="Galeria">
      <section className="p-responsive header-offset flex justify-between flex-col items-center w-full min-h-screen">
        <Images images={images} />
        <Pagination
          prevDisabled={!pageInfo.offsetPagination.hasPrevious}
          nextDisabled={!pageInfo.offsetPagination.hasMore}
          nextLink={`${paths.GALLERY}/page/2`}
        />
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { nodes, pageInfo } = await getImages(IMAGES_PER_PAGE);
  return {
    props: { images: nodes, pageInfo },
    revalidate: 10,
  };
};
