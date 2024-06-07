import { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import "styles/index.css";

const inter = Montserrat({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
