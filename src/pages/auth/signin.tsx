import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import authOptions from "../api/auth/[...nextauth]";
import { type NextAuthOptions } from "next-auth";
import { useState } from "react";

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [email, setEmail] = useState('')
  return (
    <div className="flex min-h-screen bg-base-200 items-center justify-center">
      <div className="flex flex-col gap-4 ">
        <h1 className="font-extrabold text-2xl text-center">Sign in with email</h1>
        {Object.values(providers).map((provider) => {
          const emailProvider = provider.id === 'email';
          if (emailProvider) return (
            <>
              <div className="flex flex-col gap-2" key={provider.name}>
              <input
                className="input input-bordered input-lg"
                type="email"
                placeholder="email address"
                onChange={e => setEmail(e.target.value)}
                />
              <button className="btn btn-primary btn-lg btn-block" onClick={() => void signIn("email", { email: email }, {
                callbackUrl: `${window.location.origin}`
              })}>
                Sign in
              </button>
            </div>
            <div className="divider">OR</div>
            </>
          )
          return (
            <div key={provider.name}>
              <button className="btn btn-block btn-lg" onClick={() => void signIn(provider.id, {
                callbackUrl: `${window.location.origin}`
              })}>
                Sign in with {provider.name}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions as NextAuthOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  }
}
