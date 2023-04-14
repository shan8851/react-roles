import { type NextPage } from "next";
import Head from "next/head";
import { PostJobForm } from "~/components/PostJobForm";

const PostJob: NextPage = () => {
  return <>
    <Head>
      <title>ReactRoles - Post a job</title>
      <meta name="description" content="Post a job" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <div className="pt-16 pb-4 flex flex-col align-center items-center w-screen justify-center max-w-6xl mx-auto">
        <h1 className="mb-4 text-3xl font-extrabold lg:text-4xl text-center">Let&apos;s Find Your Next React Superstar!</h1>
        <p className="mb-6 text-md font-normal lg:text-lg sm:px-16 xl:px-48 text-center">
          Hey there, awesome companies! We know you&apos;re on the lookout for top-notch React talent. To attract the best of the best, it&apos;s essential to craft an irresistible job description and offer a salary that truly reflects their value. So, let&apos;s get down to business and create a job listing that&apos;ll have React developers lining up to join your team. Remember, a fantastic job post is like a magnet, and we&apos;re here to help you make it as powerful as possible!
        </p>

      </div>
      <PostJobForm />
    </main>
  </>;
};

export default PostJob;
