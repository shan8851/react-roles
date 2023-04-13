import { type NextPage } from "next";
import Head from "next/head";

const Contact: NextPage = () => {
  return <>
    <Head>
      <title>ReactRoles - Contact</title>
      <meta name="description" content="Contact" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <div className="p-16 flex flex-col align-center items-center w-screen justify-center max-w-6xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl">Let&apos;s Chat, React Pals!</h1>
        <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-center">
          Hey there, friend! Got a question, suggestion, or just want to say hi? We&apos;re all ears! Fill out the contact form below, and our React-loving team will get back to you as soon as possible. We can&apos;t wait to hear from you and help make your React journey even more awesome!
        </p>
        <div className="form-control w-full max-w-lg">
          <label className="label">
            <span className="label-text">What is your name?</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered border-4 border-black input-lg" />
        </div>
        <div className="form-control w-full max-w-lg">
          <label className="label">
            <span className="label-text">What is your email?</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered border-4 border-black input-lg" />
        </div>
        <div className="form-control w-full max-w-lg">
          <label className="label">
            <span className="label-text">What you want to say?</span>
          </label>
          <textarea className="textarea textarea-bordered border-4 border-black textarea-lg" placeholder="Bio"></textarea>
        </div>
        <button className="btn btn-lg btn-block max-w-lg my-4">Submit</button>
      </div>
    </main>
  </>;
};

export default Contact;
