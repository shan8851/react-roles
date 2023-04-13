import { type NextPage } from "next";
import Head from "next/head";
import { HomeContent } from "~/components/HomeContent";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ReactRoles</title>
        <meta name="description" content="Curated react jobs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomeContent />
      </main>
    </>
  );
};

export default Home;

