import { AppProps } from "next/app";
import "../styles/global.css";
import NextPrograssBar from "nextjs-progressbar";
import { Provider } from "react-redux";
import store from "../store";
import { AuthContextProvider } from "@/context/auth.context";
import Header from "@/components/layout/Header";
import Container from "@/components/wrappers/Container";
import ToasterWrapper from "@/components/wrappers/ToasterWrapper";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="realestate listing  " />
        <meta name="keywords" content="house,home,rent,realestate" />
        <meta name="author" content="chihab " />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NextPrograssBar color="#DC373C" />
      <AuthContextProvider>
        <Provider store={store}>
          <Container>
            <ToasterWrapper>
              <Header />
              <Component {...pageProps} />;
            </ToasterWrapper>
          </Container>
        </Provider>
      </AuthContextProvider>
    </>
  );
};
export default MyApp;
