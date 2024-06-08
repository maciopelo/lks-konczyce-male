import Head from "next/head";
import Image from "next/image";
import heroImage from "public/images/lksPeachBg.jpg";
import Header from "components/header";
import Footer from "components/footer";
import React from "react";

interface Props {
  pageTitle?: string;
  children: React.ReactNode;
}
export default function Layout({
  pageTitle = "LKS Kończyce Małe",
  children,
}: Props) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <main className="relative text-slate-200 min-h-screen">
        <div className="absolute w-full h-screen top-[0]">
          <div className="absolute w-full h-full bg-[rgba(0,0,0,0.7)]" />
          <Image
            priority={true}
            src={heroImage}
            alt="LKS Hero Image"
            style={{
              width: "100%",
              height: "inherit",
              maxHeight: "100vh",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        <div className="relative min-h-screen">{children}</div>
      </main>
      <Footer />
    </>
  );
}
