import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";

export type Sponsor = {
  node: {
    id: string;
    sponsorFields: {
      name: string;
      url: string;
      date: string;
      logo: {
        node: {
          sourceUrl: string;
        };
      };
    };
  };
};

type Props = {
  sponsors: Sponsor[];
};

export default function Sponsors({ sponsors }: Props) {
  const getSlidesToShow = () => {
    if (window.innerWidth < 640) {
      return 2;
    }

    if (window.innerWidth < 1024) {
      return 3;
    }

    return 4;
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    cssEase: "linear",
  };

  return (
    <section className="py-6 sm:py-12">
      <p className="font-light text-3xl sm:text-4xl uppercase pb-6 sm:pb-12 text-center">
        Sponsorzy
      </p>

      <Slider {...settings}>
        {sponsors.map((sponsor) => (
          <div key={sponsor.node.id}>
            <Link
              href={sponsor.node.sponsorFields.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                height={100}
                width={200}
                src={sponsor.node.sponsorFields.logo.node.sourceUrl}
                alt={`${sponsor.node.sponsorFields.name} sponsor logo`}
                className="h-auto w-[300px] object-cover object-bottom"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
}
