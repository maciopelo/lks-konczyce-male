import { paths } from "@/lib/routes";
import { parseDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export type Post = {
  node: {
    id: string;
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
};

interface Props {
  posts: Post[];
}

export default function LatestPosts({ posts }: Props) {
  return (
    <section className="flex justify-center items-center flex-col py-6 sm:py-12 p-responsive">
      <p className="font-light text-3xl sm:text-4xl uppercase pb-6 sm:pb-12 text-center">
        Najnowsze aktualności
      </p>
      <div className="flex flex-col md:flex-row">
        {posts.map((post) => {
          const { title, date, image } = post.node.postFields;

          return (
            <Link
              className="card shadow-xl image-full pb-5 last:pb-0 md:pb-0 md:pr-5 last:pr-0 last:hidden lg:last:grid"
              href={`${paths.POSTS}/${post.node.slug}`}
              key={post.node.id}
            >
              <figure className="h-80 md:h-auto">
                <Image
                  width={400}
                  height={200}
                  src={image.node.sourceUrl}
                  alt="Shoes"
                  className="h-auto w-full object-cover object-bottom"
                />
              </figure>

              <div className="card-body justify-end p-4">
                <h2 className="card-title font-">{title}</h2>
                <p className="grow-0 text-sm lg:text-md">{parseDate(date)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
