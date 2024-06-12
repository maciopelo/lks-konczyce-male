import Layout from "components/layout";
import { getImages, getNextImages, getPrevImages } from "lib/api";
import { GetStaticProps } from "next";
import Image from "next/image";
import Pagination from "components/pagination";
import { useState } from "react";
import { PageInfo } from "lib/types";
import { GalleryImage } from "lib/types";
import { useRouter } from "next/router";
const IMAGES_PER_PAGE = 9;

interface Props {
  images: GalleryImage[];
  pageInfo: PageInfo;
}

export default function Gallery({ images, pageInfo }: Props) {
  const router = useRouter();
  const [visibleImages, setVisibleImages] = useState(images);
  const [currentPageInfo, setCurrentPageInfo] = useState(pageInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);

  const fetchNextImages = async () => {
    try {
      setIsLoading(true);
      const response = await getNextImages(
        IMAGES_PER_PAGE,
        currentPageInfo.endCursor,
        process.env.NEXT_PUBLIC_WORDPRESS_API_URL
      );
      setIsLoading(false);
      setVisibleImages(response.nodes);
      setCurrentPageInfo(response.pageInfo);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      router.push("/500");
    }
  };

  const fetchPrevImages = async () => {
    try {
      setIsLoading(true);
      const response = await getPrevImages(
        IMAGES_PER_PAGE,
        currentPageInfo.startCursor,
        process.env.NEXT_PUBLIC_WORDPRESS_API_URL
      );
      setIsLoading(false);
      setVisibleImages(response.nodes);
      setCurrentPageInfo(response.pageInfo);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      router.push("/500");
    }
  };

  return (
    <>
      <Layout pageTitle="Galeria">
        <section className="p-responsive header-offset flex justify-between flex-col items-center w-full min-h-screen">
          {isLoading ? (
            <span className="flex-1 loading loading-spinner loading-lg" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {visibleImages.map((img) => (
                <figure
                  className="flex max-h-[220px] relative rounded-md hover:cursor-pointer"
                  key={img.slug}
                  onClick={() => {
                    setIsModal(true);
                    setCurrentImage(img);
                  }}
                >
                  {isLoading ? (
                    <div className="absolute w-full h-full skeleton" />
                  ) : (
                    <>
                      <Image
                        width={1000}
                        height={1000}
                        src={img.sourceUrl}
                        alt={`Image: ${img.slug}`}
                        className="w-full h-auto object-cover object-top rounded-md shadow-xl"
                      />
                      <div className="absolute h-full bg-dimDark w-full rounded-md" />
                    </>
                  )}
                </figure>
              ))}
            </div>
          )}

          <Pagination
            prevDisabled={!currentPageInfo.hasPreviousPage || isLoading}
            nextDisabled={!currentPageInfo.hasNextPage || isLoading}
            onPrevClick={fetchPrevImages}
            onNextClick={fetchNextImages}
          />
        </section>
      </Layout>
      {currentImage ? (
        <dialog
          id="SingeImageModal"
          className="modal bg-modalBg"
          open={isModal}
        >
          <div className="modal-box w-11/12 max-w-6xl p-0 pt-10 sm:p-10 bg-transparent overflow-hidden shadow-none">
            <form method="dialog">
              <figure className="flex justify-center">
                <Image
                  width={1000}
                  height={1000}
                  src={currentImage.sourceUrl}
                  alt={`Hero image of post ${currentImage.slug}`}
                  className="object-contain rounded-xl"
                />
              </figure>
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0 font-bold text-xl"
                onClick={() => setIsModal(false)}
              >
                ✕
              </button>
            </form>
          </div>
        </dialog>
      ) : null}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { nodes, pageInfo } = await getImages(IMAGES_PER_PAGE);
  return {
    props: { images: nodes, pageInfo },
    revalidate: 10,
  };
};
