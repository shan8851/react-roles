import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Header } from "~/components/Header";
import { useState } from "react";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import useDebounce from "~/hooks/useDebounce";
import { Spinner } from "~/components/Spinner";
dayjs.extend(relativeTime);

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ReactRoles</title>
        <meta name="description" content="Curated react jobs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Content />
      </main>
    </>
  );
};

export default Home;

const Content: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [showRemote, setShowRemote] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(search, 1000);
  const { data: jobs, refetch: refetchJobs, isLoading, isFetching } = api.jobs.getAll.useQuery({
    title: debouncedValue,
    company: debouncedValue,
    location: debouncedValue,
    // remote: showRemote ? true : false,
  });
  const { data: sessionData } = useSession();
  const deleteJob = api.jobs.delete.useMutation({
    onSuccess: () => {
      void refetchJobs();
    },
  });

  return (
    <div className="p-16 flex flex-col align-center items-center w-screen justify-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white">React Roles</h1>
      <p className="mb-6 text-lg font-normal text-slate-500 lg:text-xl sm:px-16 xl:px-48 dark:text-slate-400 text-center">Welcome to ReactRoles, the premier job board dedicated to React developers! Discover a curated selection of exciting job opportunities in the React ecosystem, ranging from startups to leading tech companies.</p>
      {sessionData?.user && (
        <button className="btn-primary p-4 rounded">
          Post a job
        </button>
      )}
      <div className="my-8 flex justify-between items-center w-full gap-4 max-w-4xl">
        <div className="form-control w-full max-w-2xl">
          <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search by job title, company or location" className="input input-bordered w-full outline-none" />
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text mr-2">Remote Only?</span>
            <input
              type="checkbox"
              className="toggle"
              checked={showRemote}
              onChange={e => {
                const isChecked = e.target.checked;
                setShowRemote(isChecked);
              }}
            />
          </label>
        </div>
      </div>
      {isLoading || isFetching && (
        <div className="flex justify-center items-center w-full h-64">
          <Spinner />
        </div>
      )}
      {!isLoading && !isFetching && (
        <div className="flex flex-col w-screen py-4 max-w-4xl">
        {jobs?.map((job) => (
          <div key={job.id} className="flex justify-between py-4 align-center items-center border border-sky-500 p-4 my-2 rounded">
            <div className="flex flex-col">
              <h1>{job.title}</h1>
              <p>{job.company}</p>
              <p className="text-sm text-slate-500">${job.salary}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-slate-600 text-xs">{dayjs(job.createdAt).fromNow()}</p>
              <button className="btn-warning btn-xs btn px-5" onClick={() => void deleteJob.mutate({ id: job.id })}>
                Delete
              </button>
            </div>

          </div>
        )
        )}
      </div>
      )}
    </div>
  )
};
