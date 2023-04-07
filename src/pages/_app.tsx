import { AppProps } from "next/app";
import "../styles/global.css";
import NextPrograssBar from "nextjs-progressbar";
import { Provider } from "react-redux";
import store from "../store";
import { AuthContextProvider } from "@/context/auth.context";
import Header from "@/components/layout/Header";
import Container from "@/components/wrappers/Container";
import ToasterWrapper from "@/components/wrappers/ToasterWrapper";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
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
