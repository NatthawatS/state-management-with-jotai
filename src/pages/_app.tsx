import { Provider } from "jotai";
import Layout from "@/components/Common/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Layout>
        <DevTools />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
