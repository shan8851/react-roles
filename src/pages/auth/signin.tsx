import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import authOptions from "../api/auth/[...nextauth]";
import { type NextAuthOptions } from "next-auth";

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex min-h-screen bg-base-200 items-center justify-center">
      <div className="flex flex-col gap-4 ">
        <h1 className="font-bold text-lg">Sign in</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className="btn btn-lg" onClick={() => void signIn(provider.id, {
              callbackUrl: `${window.location.origin}`
            })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
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
