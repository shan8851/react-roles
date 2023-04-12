import { type NextPage } from "next";
import Head from "next/head";
import { Header } from "~/components/Header";
import { PostJobForm } from "~/components/PostJobForm";

const PostJob: NextPage = () => {
  return <>
    <Head>
      <title>ReactRoles - Post a job</title>
      <meta name="description" content="Post a job" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <Header />
      <div className="p-16 flex flex-col align-center items-center w-screen justify-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white">Post a Job</h1>
        <p className="mb-6 text-lg font-normal text-slate-500 lg:text-xl sm:px-16 xl:px-48 dark:text-slate-400 text-center">Remember to get the best quality candidates, be as descriptive as possible with your job descriptions and requirements..</p>
      </div>
      <PostJobForm />
    </main>
  </>;
};

export default PostJob;
