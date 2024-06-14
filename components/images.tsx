import { useState } from "react";
import { GalleryImage } from "lib/types";
import Image from "next/image";
import ImageModal from "./image-modal";

interface Props {
  images: GalleryImage[];
}
const Images = ({ images }: Props) => {
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
      {images.map((img) => (
        <figure
          className="flex max-h-[220px] relative rounded-md hover:cursor-pointer"
          key={img.slug}
          onClick={() => setCurrentImage(img)}
        >
          <Image
            width={1000}
            height={1000}
            src={img.sourceUrl}
            alt={`Image: ${img.slug}`}
            className="w-full h-auto object-cover object-top rounded-md shadow-xl"
          />
        </figure>
      ))}

      {currentImage ? (
        <ImageModal
          image={currentImage}
          onClose={() => setCurrentImage(null)}
        />
      ) : null}
    </div>
  );
};

export default Images;
