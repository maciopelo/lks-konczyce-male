import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="bg-black">
      <Head>
        <link rel="icon" href="/icons/icon.ico" />
        <meta
          name="description"
          content="Strona klubowa zespołu LKS Kończyce Małe dla piłkarzy i kibiców. Aktualności, ostatnie mecze, tabela i statystyki."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
