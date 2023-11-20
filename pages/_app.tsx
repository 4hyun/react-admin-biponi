import Head from "next/head";
import { NextPage } from "next";
import Router from "next/router";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Toaster, toast } from "react-hot-toast";
import nProgress from "nprogress";
import { SWRConfig } from "swr";
import axios from "axios";

// custom components
import MuiTheme from "theme/MuiTheme";
import { AppProvider } from "contexts/AppContext";
import { SettingProvider } from "contexts/SettingContext";
import createEmotionCache from "../src/createEmotionCache";
// import OpenGraphTags from "utils/OpenGraphTags";
// import GoogleAnalytics from "utils/GoogleAnalytics";
// util function for error status show
import getErrorMessage from "utils/getErrorMessage";

// third party library css import
import "nprogress/nprogress.css";
import "react-quill/dist/quill.snow.css";
import "simplebar-react/dist/simplebar.min.css";

//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());
// small change
nProgress.configure({ showSpinner: false });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// fetcher function for swr
const fetcher = (url: string) => axios(url).then((res) => res.data);

// ==============================================================
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}
// ==============================================================

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const config = {
    fetcher,
    onError: (err: unknown) => toast.error(getErrorMessage(err)),
  };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <title>React Next.js Ecommerce Template</title>
        {/* <GoogleAnalytics />
        <OpenGraphTags /> */}
      </Head>

      <SessionProvider session={pageProps.session}>
        <AppProvider>
          <MuiTheme>
            <SWRConfig value={config}>
              <SettingProvider>
                {getLayout(<Component {...pageProps} />)}
                <Toaster position="top-right" />
              </SettingProvider>
            </SWRConfig>
          </MuiTheme>
        </AppProvider>
      </SessionProvider>
    </CacheProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default MyApp;
