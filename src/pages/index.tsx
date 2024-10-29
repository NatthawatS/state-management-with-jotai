import { Fragment } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const DynamicHomePage = dynamic(() => import("@/components/Feature/HomePage"), {
  loading: () => <p>Loading...</p>,
});

const Home = (): JSX.Element => {
  return (
    <Fragment>
      <Head>
        <title>state management with jotai</title>
        <meta charSet="utf-8" />
        <meta name="description" content="project state management with jotai" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="all" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicHomePage />
    </Fragment>
  );
};

export default Home;
