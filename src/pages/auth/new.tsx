import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Welcome: NextPage = () => {
  const [role, setRole] = useState<string>("");
  return (
    <>
      <Head>
        <title>ReactRoles - Welcome</title>
        <meta name="description" content="Welcome" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="p-16 flex flex-col align-center items-center w-screen justify-center max-w-6xl mx-auto">
          <h1 className="mb-4 text-3xl font-extrabold lg:text-4xl text-center">Welcome</h1>
          <p className="mb-6 text-md font-normal lg:text-lg sm:px-16 xl:px-48 text-center">
            Choose role
          </p>
        </div>
      </main>
    </>
  )
}

export default Welcome;
