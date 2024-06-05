import Image from "next/image";
import logo from "public/icons/logoWithoutBg.svg";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col bg-darkBurgund text-white uppercase text-2xl font-600 text-center">
      <h1>Uppps! Coś poszło nie tak, wróc później.</h1>
      <Image src={logo} alt="Logo LKS Kończyce Małe" className="m-8" />
    </div>
  );
}
