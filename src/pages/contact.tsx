import { useState } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import { type NextPage } from "next";
import Head from "next/head";

const Contact: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');

  // Please update the Access Key in the .env
  const apiKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

  const { submit: onSubmit } = useWeb3Forms({
    access_key: apiKey!,
    settings: {
      from_name: "React Roles",
      subject: "New contact message for React Roles",
    },
    onSuccess: (msg) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg) => {
      setIsSuccess(false);
      setMessage(msg);
    },
  });

  return (
    <>
      <Head>
        <title>ReactRoles - Contact</title>
        <meta name="description" content="Contact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="p-16 flex flex-col align-center items-center w-screen justify-center max-w-6xl mx-auto">
          <h1 className="mb-4 text-3xl font-extrabold lg:text-4xl text-center">Let&apos;s Chat, React Pals!</h1>
          <p className="mb-6 text-md font-normal lg:text-lg sm:px-16 xl:px-48 text-center">
            Hey there, friend! Got a question, suggestion, or just want to say hi? We&apos;re all ears! Fill out the contact form below, and our React-loving team will get back to you as soon as possible. We can&apos;t wait to hear from you and help make your React journey even more awesome!
          </p>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            <input
              type="checkbox"
              id=""
              className="hidden"
              style={{ display: "none" }}
              {...register("botcheck")}
            />
            <div className="form-control w-full">
             <label className={`input-group input-group-vertical border-4 ${errors.name ? 'border-error' : 'border-black'}`}>
            <span className="py-2">What shall we call you?</span>
              <input
                type="text"
                placeholder="Elon Musk"
                className="input w-full outline-none"
                {...register("name", {
                  required: "Name is required",
                  maxLength: 80,
                })}
              />
              </label>
              {errors.name && (
                <div className="mt-1 text-error">
                  <small>{errors.name.message as string}</small>
                </div>
              )}
            </div>
            <div className="form-control w-full">
              <label htmlFor="email_address" className={`input-group input-group-vertical border-4 ${errors.email ? 'border-error' : 'border-black'}`}>
                <span className="label-text">What&apos;s your email?</span>
              <input
                id="email_address"
                type="email"
                placeholder="elon@twitter.com"
                className="input w-full outline-none"
                {...register("email", {
                  required: "Enter your email",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email",
                  },
                })}
              />
              </label>
              {errors.email && (
                <div className="mt-1 text-error">
                  <small>{errors.email.message as string}</small>
                </div>
              )}
            </div>
            <div className="form-control w-full">
              <label className={`input-group input-group-vertical border-4 ${errors.message ? 'border-error' : 'border-black'}`}>
            <span className="py-2">What&apos;s on your mind?</span>

              <textarea
                className="textarea textarea-bordered textarea-lg w-full outline-none"
                placeholder="React Roles is effin awesome"
                {...register("message", {
                  required: "Enter your Message",
                })}
              />
              </label>
              {errors.message && (
                <div className="mt-1 text-error">
                  {" "}
                  <small>{errors.message.message as string}</small>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-block my-4">
              {isSubmitting ? (
                <svg
                  className="w-5 h-5 mx-auto animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
          {isSubmitSuccessful && isSuccess && (
            <div className="mt-3 text-sm text-center text-secondary">
              {message || "Success. Message sent successfully"}
            </div>
          )}
          {isSubmitSuccessful && !isSuccess && (
            <div className="mt-3 text-sm text-center text-error">
              {message || "Something went wrong. Please try later."}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Contact;

