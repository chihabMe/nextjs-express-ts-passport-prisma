import { AppProps } from "next/app";
import "../styles/global.css";
import NextPrograssBar from "nextjs-progressbar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextPrograssBar color="blue" />
      <Component {...pageProps} />;
    </>
  );
};
export default MyApp;
