import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function Footer() {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-quad",
      duration: 1000,
    });
  }, []);

  return (
    <footer className="p-responsive py-4 flex bg-black text-white border-t-2 border-burgund">
      <div className="flex-2 sm:flex-1 text-left text-[10px] sm:text-sm">
        <a
          href="https://maps.app.goo.gl/5ZjLeYV55S8K7ucw6"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="font-bold">LKS Kończyce Małe </span> <br />
          Jagiellońska 33 <br />
          43-410 Kończyce Małe
        </a>
      </div>
      <div className="flex-1 text-center flex justify-center items-center font-bold text-xs sm:text-sm">
        <p className="hidden min-[350px]:block">Copyright </p>
        <span className="text-lg min-[350px]:text-xs">©</span>
      </div>
      <div className="flex-2 sm:flex-1 text-right flex justify-end items-center text-[10px] sm:text-sm">
        <Link
          href="/polityka-prywatnosci.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          Polityka prywatności
        </Link>
      </div>
    </footer>
  );
}
