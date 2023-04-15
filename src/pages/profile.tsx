import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import { Spinner } from "~/components/Spinner";
import { api } from "~/utils/api";

const Profile: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const { data, refetch: refetchUserJobs, isLoading, isFetching } = api.profile.getJobs.useQuery({
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  const deleteJob = api.profile.deleteJob.useMutation({
    onSuccess: () => {
      void refetchUserJobs();
    },
  });
  const userJobs = data?.userJobs;
  const totalCount = data?.totalCount;
  const numberOfPages = totalCount ? Math.ceil(totalCount / itemsPerPage) : 1;

  console.debug(data)
  return (
    <>
      <Head>
        <title>ReactRoles - Profile</title>
        <meta name="description" content="Post a job" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="pt-16 pb-4 flex flex-col align-center items-center w-screen justify-center max-w-6xl mx-auto">
          <h1 className="mb-4 text-3xl font-extrabold lg:text-4xl text-center">Profile!</h1>
          <p className="mb-6 text-md font-normal lg:text-lg sm:px-16 xl:px-48 text-center">
            Manage your profile here!
          </p>
          {isLoading || isFetching && (
            <div className="flex justify-center items-center w-full h-64">
              <Spinner />
            </div>
          )}
          {!isLoading && !isFetching && userJobs && userJobs.length > 0 && (
            <>
              <h1 className="mb-2 text-2xl font-extrabold bg-primary p-2 self-start">Your Jobs:</h1>
              <div className="flex flex-col w-full py-4 max-w-4xl gap-8">
                {!isLoading && !isFetching && userJobs?.map((job) => (
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
