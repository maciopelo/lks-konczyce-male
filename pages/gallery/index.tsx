import Layout from "@/components/Layout";
import { getImages, getNextImages, getPrevImages } from "@/lib/api";
import { GetStaticProps } from "next";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import { API_URL } from "@/lib/constants";
import { redirect } from "next/navigation";

const IMAGES_PER_PAGE = 9;

type Image = {
  slug: string;
  sourceUrl: string;
};

interface Props {
  images: Image[];
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string;
    endCursor: string;
  };
}

export default function Gallery({ images, pageInfo }: Props) {
  const [visibleImages, setVisibleImages] = useState(images);
  const [currentPageInfo, setCurrentPageInfo] = useState(pageInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const fetchNextImages = async () => {
    try {
      setIsLoading(true);
      const response = await getNextImages(
        IMAGES_PER_PAGE,
        currentPageInfo.endCursor,
        API_URL
      );
      setIsLoading(false);
      setVisibleImages(response.nodes);
      setCurrentPageInfo(response.pageInfo);
    } catch (error) {
      redirect("/500");
    }
  };

  const fetchPrevImages = async () => {
    try {
      setIsLoading(true);
      const response = await getPrevImages(
        IMAGES_PER_PAGE,
        currentPageInfo.startCursor,
        API_URL
      );
      setIsLoading(false);
      setVisibleImages(response.nodes);
      setCurrentPageInfo(response.pageInfo);
    } catch (error) {
      redirect("/500");
    }
  };

  return (
    <>
      <Layout pageTitle="Galeria">
        <section className="p-responsive header-offset flex justify-betwe en flex-col items-center w-full min-h-screen">
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
                        alt={`Hero image of post ${img.slug}`}
                        className="w-full h-auto object-cover object-bottom rounded-md shadow-xl"
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
          className="modal bg-dimDark"
          open={isModal}
        >
          <div className="modal-box w-11/12 max-w-6xl p-0 pt-7 sm:p-7">
            <form method="dialog">
              <figure>
                <Image
                  width={1000}
                  height={1000}
                  src={currentImage.sourceUrl}
                  alt={`Hero image of post ${currentImage.slug}`}
                  className="w-full object-cover h-4/5 rounded-xl"
                />
              </figure>
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-0.5 top-0.5 font-bold"
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
