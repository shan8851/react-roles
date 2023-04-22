import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import { api } from "~/utils/api";

const Profile: NextPage = () => {
  const { data: sessionData } = useSession();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const { data, refetch: refetchCompanyListings, isLoading, isFetching } = api.profile.getJobs.useQuery({
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  const deleteJob = api.profile.deleteJob.useMutation({
    onSuccess: () => {
      void refetchCompanyListings();
    },
  });
  const companyListings = data?.companyJobListings;
  const totalCount = data?.totalCount;
  const numberOfPages = totalCount ? Math.ceil(totalCount / itemsPerPage) : 1;

  const { data: companyData, isLoading: companyDataLoding, error } = api.account.getCompanyData.useQuery();

  console.debug(companyData)

  return (
    <>
      <Head>
        <title>ReactRoles - Profile</title>
        <meta name="description" content="Post a job" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="pt-16 pb-4 flex flex-col align-center items-center w-screen justify-center max-w-6xl mx-auto">
          {companyData?.companyName && (
            <h1 className="mb-4 text-3xl font-extrabold lg:text-4xl text-center">{`Welcome: ${companyData?.companyName}`}</h1>
          )}
          <p className="mb-6 text-md font-normal lg:text-lg sm:px-16 xl:px-48 text-center">
            Manage your profile here!
          </p>
          {sessionData?.user && (
            <Link href='/post-job'>
              <button className="btn p-4 btn-lg">
                Post a job
              </button>
            </Link>
          )}
          {!isLoading && !isFetching && companyListings && companyListings.length > 0 && (
            <>
              <h1 className="mb-2 text-2xl font-extrabold bg-primary p-2 self-start">Your Jobs:</h1>
              <div className="flex flex-col w-full py-4 max-w-4xl gap-8">
                {!isLoading && !isFetching && companyListings?.map((job) => (
                  <div className="flex gap-4 items-center justify-between" key={job.id}>
                    <div className="flex gap-3">
                      <h1>{job.title}</h1>
                      <p>-</p>
                      <div className="flex gap-2 items-center">
                        <p>Views:</p>
                        <p className="font-bold">{job.views}</p>
                      </div>
                      <p>-</p>
                      <div className="flex gap-2 items-center">
                        <p>Applications:</p>
                        <p className="font-bold">{job.applyClicked}</p>
                      </div>

                    </div>
                    <button className="btn-secondary btn-xs btn px-5" onClick={() => void deleteJob.mutate({ id: job.id })}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              {numberOfPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    numberOfPages={numberOfPages}
                    onPageChange={(page: number) => {
                      setCurrentPage(page);
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default Profile
