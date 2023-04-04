import { AppProps } from "next/app";
import "../styles/global.css";
import NextPrograssBar from "nextjs-progressbar";
import { Provider } from "react-redux";
import store from "../store";
import { AuthContextProvider } from "@/context/auth.context";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextPrograssBar color="blue" />
      <AuthContextProvider>
        <Provider store={store}>
          <Component {...pageProps} />;
        </Provider>
      </AuthContextProvider>
    </>
  );
};
export default MyApp;
