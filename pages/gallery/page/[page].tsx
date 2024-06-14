import Layout from "components/layout";
import { getImages, getImagesCount } from "lib/api";
import { GetStaticProps, GetStaticPaths } from "next";
import Pagination from "components/pagination";
import { PageInfo } from "lib/types";
import { GalleryImage } from "lib/types";
import { useRouter } from "next/router";
import { paths } from "@/lib/routes";
import Images from "@/components/images";

const IMAGES_PER_PAGE = 9;

interface Props {
  images: GalleryImage[];
  pageInfo: PageInfo;
}

export default function Gallery({ images, pageInfo }: Props) {
  const router = useRouter();

  const page = Number(router?.query?.page) ?? 1;

  if (typeof window !== "undefined" && page === 1) {
    router.push("/gallery");
  }

  return (
    <Layout pageTitle="Galeria">
      <section className="p-responsive header-offset flex justify-between flex-col items-center w-full min-h-screen">
        <Images images={images} />
        <Pagination
          prevDisabled={!pageInfo.offsetPagination.hasPrevious}
          nextDisabled={!pageInfo.offsetPagination.hasMore}
          prevLink={`${paths.GALLERY}/page/${page - 1}`}
          nextLink={`${paths.GALLERY}/page/${page + 1}`}
        />
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { pageInfo } = await getImagesCount();

  const paths = new Array(
    Math.ceil(pageInfo.offsetPagination.total / IMAGES_PER_PAGE)
  )
    .fill(null)
    .map((_, idx) => `/gallery/page/${idx + 1}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = Number(params?.page) ?? 1;
  const offset = (page - 1) * IMAGES_PER_PAGE;

  const { nodes, pageInfo } = await getImages(IMAGES_PER_PAGE, offset);
  return {
    props: { images: nodes, pageInfo },
    revalidate: 10,
  };
};
