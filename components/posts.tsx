import { paths } from "@/lib/routes";
import { parseDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Post } from "lib/types";

interface Props {
  posts: Post[];
}

const Posts = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
      {posts.map((post) => {
        const { title, date, image } = post.node.postFields;
        return (
          <Link
            className="card w-[280px] min-[350px]:w-[300px] h-[300px] sm:w-[400px] sm:h-[330px] bg-base-100 shadow-xl relative hover:animate-pulse"
            href={`${paths.POSTS}/${post.node.slug}`}
            key={post.node.slug}
          >
            <figure className="grow-[4] relative">
              <Image
                src={image.node.sourceUrl}
                alt="Shoes"
                width={450}
                height={350}
                style={{
                  maxWidth: "inherit",
                }}
                className="object-contain"
              />
              <div className="absolute h-full bg-dimDark w-full rounded-md" />
            </figure>
            <div className="card-body p-3 grow-[1]">
              <h2 className="card-title text-md">{title}</h2>
              <p className="text-sm">{parseDate(date)}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Posts;
