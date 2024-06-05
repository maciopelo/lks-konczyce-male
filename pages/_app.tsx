import { AppProps } from "next/app";
import "../styles/index.css";
import { Montserrat } from "next/font/google";

const inter = Montserrat({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
