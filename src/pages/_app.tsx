import { AppProps } from "next/app";
import "../styles/global.css";
import NextPrograssBar from "nextjs-progressbar";
import { Provider } from "react-redux";
import store from "../store";
import { AuthContextProvider } from "@/context/auth.context";
import Header from "@/components/layout/Header";
import Container from "@/components/wrappers/Container";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextPrograssBar color="blue" />
      <AuthContextProvider>
        <Provider store={store}>
          <Container>
            <Header />
            <Component {...pageProps} />;
          </Container>
        </Provider>
      </AuthContextProvider>
    </>
  );
};
export default MyApp;
