import Image from "next/image";
import { GalleryImage } from "lib/types";
interface Props {
  image: GalleryImage;
  onClose: () => void;
}
const ImageModal = ({ image, onClose }: Props) => {
  return (
    <dialog
      id="SingeImageModal"
      className="modal bg-modalBg"
      open={Boolean(image)}
    >
      <div className="modal-box w-11/12 max-w-6xl p-0 pt-10 sm:p-10 bg-transparent overflow-hidden shadow-none">
        <form method="dialog">
          <figure className="flex justify-center">
            <Image
              width={1000}
              height={1000}
              src={image.sourceUrl}
              alt={`Hero image of post ${image.slug}`}
              className="object-contain rounded-xl"
            />
          </figure>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0 font-bold text-xl"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ImageModal;
