import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import authOptions from "../api/auth/[...nextauth]";
import { type NextAuthOptions } from "next-auth";
import { getCsrfToken } from "next-auth/react"


export default function SignIn({ providers, csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mt-8">Login now!</h1>
            <p className="py-6">Login with your preferred method to get full access to React Roles. Job seekers can add jobs to favorites, track their applications and more. Companies can post jobs and view analytics.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <div className="card-body">
              <form method="post" action="/api/auth/signin/email">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input input-bordered input-lg w-full mb-4"
                  placeholder="example@example.com"
                />
                <button className="btn btn-primary btn-lg btn-block" type="submit">Sign in with Email</button>
              </form>
              <div className="divider">OR</div>
              {Object.values(providers).map((provider) => {
                const emailProvider = provider.id === 'email';
                if (emailProvider) return;
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
        </div>
      </div>

    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions as NextAuthOptions);
  const csrfToken = await getCsrfToken(context)


  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { csrfToken, providers: providers ?? [] },
  }
}
