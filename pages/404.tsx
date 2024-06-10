import Link from "next/link";
import Image from "next/image";
import logo from "public/icons/logoWithoutBg.svg";
import { paths } from "lib/routes";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col bg-darkBurgund text-white uppercase text-2xl font-600 text-center">
      <h1>Uppps! Strona nie istnieje</h1>
      <Link href={paths.HOME}>
        <Image src={logo} alt="Logo LKS Kończyce Małe" className="m-8" />
        <p>Wróć na główną</p>
      </Link>
    </div>
  );
}
