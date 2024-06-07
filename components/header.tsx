import Link from "next/link";
import Image from "next/image";
import logo from "public/icons/logoWithBg.svg";
import facebook from "public/icons/facebook.svg";
import { paths } from "lib/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const { HOME, POSTS, GALLERY, HISTORY } = paths;

const commonUlCss = "text-sm lg:text-base text-white font-bold uppercase";

const Menu = () => {
  const { pathname } = useRouter();

  return (
    <>
      <li className="lg:p-1">
        <Link href={HOME} className={pathname === "/" ? "bg-dimWhite" : ""}>
          Strona główna
        </Link>
      </li>
      <li className="lg:p-1">
        <Link
          href={POSTS}
          className={pathname.includes(POSTS) ? "bg-dimWhite" : ""}
        >
          Aktualności
        </Link>
      </li>
      <li className="lg:p-1">
        <Link
          href={GALLERY}
          className={pathname.includes(GALLERY) ? "bg-dimWhite" : ""}
        >
          Galeria
        </Link>
      </li>
      <li className="lg:p-1">
        <Link
          href={HISTORY}
          className={pathname.includes(HISTORY) ? "bg-dimWhite" : ""}
        >
          Historia
        </Link>
      </li>
      <li>
        <a
          href="https://www.facebook.com/lkskonczycemale?locale=pl_PL"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image width={30} height={25} src={facebook} alt="facebook" />
        </a>
      </li>
    </>
  );
};
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => setIsScrolled(window.scrollY > 0);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`navbar fixed z-50 w-full  p-responsive duration-500 ${
        isScrolled ? "bg-[rgba(0,0,0,0.4)]" : "bg-transparent"
      }`}
    >
      <div className="navbar-start w-[70px]">
        <Link href={HOME}>
          <Image width={100} height={25} priority src={logo} alt="logo" />
        </Link>
      </div>
      <div className="navbar-end  w-full ">
        <ul className={`hidden md:flex menu menu-horizontal ${commonUlCss}`}>
          <Menu />
        </ul>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="text-white btn btn-ghost md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-darkBurgund rounded-box w-52 ${commonUlCss}`}
          >
            <Menu />
          </ul>
        </div>
      </div>
    </header>
  );
}
