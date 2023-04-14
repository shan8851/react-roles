import { type NextPage } from "next";
import Head from "next/head";

const About: NextPage = () => {
  return <>
    <Head>
      <title>ReactRoles - About</title>
      <meta name="description" content="About" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <div className="p-4 md:p-16 flex flex-col align-center items-center w-screen justify-center max-w-6xl mx-auto">
        <h1 className="mb-4 text-3xl font-extrabold lg:text-4xl text-center">Your Friendly Neighbourhood React Job Board</h1>
        <p className="mb-6 text-md font-normal lg:text-lg sm:px-16 xl:px-48 text-center">
          Hey there, React enthusiasts! Welcome to React Roles, a job board designed just for you, our fellow React aficionados. We&apos;re all about connecting talented React developers with companies who appreciate your awesomeness and are looking for someone just like you.
        </p>
        <p className="mb-6 text-md font-normal lg:text-lg sm:px-16 xl:px-48 text-center">
          So, what&apos;s our story? Well, we&apos;re a bunch of React lovers who realized that finding the perfect job in the React world could be a bit of a struggle. That&apos;s when React Roles was born - a cozy corner on the internet where you can find jobs that match your React passion and skills.
        </p>
        <p className="mb-6 text-md font-normal lg:text-lg sm:px-16 xl:px-48 text-center">
          We&apos;ve made sure our platform is as friendly and easy-to-use as possible. With a few clicks, you can filter through job listings that suit your experience, location, and work preferences. And, to keep things fresh, we&apos;re always updating our list with the latest opportunities.
        </p>
        <p className="mb-6 text-md font-normal lg:text-lg sm:px-16 xl:px-48 text-center">
          But, we&apos;re not just about jobs. We&apos;re also dedicated to helping you grow and learn. That&apos;s why we share helpful articles, tutorials, and resources to keep you in the know about all things React.
        </p>
        <p className="mb-6 text-md font-normal lg:text-lg sm:px-16 xl:px-48 text-center">
          So, whether you&apos;re just starting your React journey or you&apos;re a seasoned developer, React Roles is your go-to spot for all your job-seeking needs. Join our friendly community today and let&apos;s build a React-tastic future together!
        </p>
      </div>
    </main>

  </>;
};

export default About;
