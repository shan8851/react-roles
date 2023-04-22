import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { useRouter } from "next/router";



const Welcome: NextPage = () => {
const router = useRouter();

  const [role, setRole] = useState<string>("jobSeeker");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: "onTouched",
  });

  type FormData = {
    companyName: string;
  };

const addCompany = api.account.updateUserToCompany.useMutation();

  const onSubmit = async (data: FormData) => {
    console.log('fired', data)
  await addCompany.mutateAsync(data);
  await router.push("/profile");
};

  return (
    <>
      <Head>
        <title>ReactRoles - Welcome</title>
        <meta name="description" content="Welcome" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="p-16 flex flex-col w-screen justify-center items-center max-w-6xl mx-auto">
          <h1 className="mb-4 text-3xl font-extrabold lg:text-4xl text-center">Welcome</h1>
          <p className="mb-6 text-md font-normal lg:text-lg sm:px-16 xl:px-48 text-center">
            Welcome to ReactRoles, before you start please let us know if you are interested in using the site as a job seeker or as a company.
          </p>
          <div className="max-w-sm">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-4">Job Seeker</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-primary"
                  checked={role === 'jobSeeker'}
                  onChange={() => setRole('jobSeeker')}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-4">Company</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-primary"
                  checked={role === 'company'}
                  onChange={() => setRole('company')}
                />
              </label>
            </div>
            {role === 'jobSeeker' && (
              <Link href="/" className="btn btn-lg btn-primary mt-4">See jobs</Link>
            )}
            {role === 'company' && (
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                <div className="form-control w-full">
                  <label className={`input-group input-group-vertical border-4 ${errors.companyName ? 'border-error' : 'border-black'}`}>
                    <span className="py-2">Company Name?</span>
                    <input
                      type="text"
                      placeholder="Apple"
                      className="input w-full outline-none"
                      {...register("companyName", {
                        required: "Company name is required",
                        maxLength: 80,
                      })}
                    />
                  </label>
                  {errors.companyName && (
                    <div className="mt-1 text-error">
                      <small>{errors.companyName.message as string}</small>
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
                    "Setup your company"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default Welcome;
