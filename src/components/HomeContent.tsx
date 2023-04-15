import { useSession } from "next-auth/react";
import Link from "next/link";
import { type FC, useState } from "react";
import useDebounce from "~/hooks/useDebounce";
import { type RouterOutputs, api } from "~/utils/api";
import { Spinner } from "./Spinner";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from "next/image";
import Logo from '~/assets/LogoSmall.svg'
import { useRouter } from "next/router";
import Pagination from "./Pagination";

dayjs.extend(relativeTime);

type Job = RouterOutputs["jobs"]["getAll"]["jobListings"][0];


export const HomeContent: FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const [showRemote, setShowRemote] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const debouncedValue = useDebounce<string>(search, 1000);

  const { data: jobData, isLoading, isFetching } = api.jobs.getAll.useQuery({
    title: debouncedValue,
    company: debouncedValue,
    location: debouncedValue,
    // remote: showRemote ? true : false,
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });
  const jobs = jobData?.jobListings;
  const totalCount = jobData?.totalCount;
  const numberOfPages = totalCount ? Math.ceil(totalCount / itemsPerPage) : 1;
  const { data: sessionData } = useSession();

  console.debug(jobData)

  const addView = api.jobs.addView.useMutation();

  const goToJob = (jobId: string) => {
    addView.mutate({ id: jobId });
    void router.push(`/job/${jobId}`);
  };

  return (
    <div className="p-4 md:p-16 flex flex-col align-center items-center w-screen justify-center max-w-6xl mx-auto">
      <Image src={Logo as string} height={145} alt="logo" />
      <p className="my-6 text-md font-normal lg:text-lg sm:px-16 xl:px-48 text-center">
        Hey champ! You&apos;ve landed in the perfect spot to find your dream React job. Browse through our collection of handpicked opportunities, tailor-made for the awesome React developer you are. Ready, set, explore! Your next big adventure is just a few clicks away.
      </p>
      {sessionData?.user && (
        <Link href='/post-job'>
          <button className="btn p-4 btn-lg">
            Post a job
          </button>
        </Link>
      )}
      {isLoading || isFetching && (
        <div className="flex justify-center items-center w-full h-64">
          <Spinner />
        </div>
      )}
      {!isLoading && !isFetching && jobs?.length === 0 && (
        <h2 className="my-4 text-2xl font-bold md:text-5xl lg:text-6xl">Nothing to see here...</h2>
      )}
      {!isLoading && !isFetching && jobs && jobs.length > 0 && (
        <div className="flex flex-col sm:flex-row my-4 md:my-8 sm:justify-between sm:items-center w-full gap-4 max-w-4xl">
          <div className="form-control w-full max-w-2xl">
            <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search by job title, company or location" className="input input-bordered border-4 border-black w-full outline-none" />
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-2">Remote Only?</span>
              <input
                type="checkbox"
                className="toggle-secondary toggle-lg"
                checked={showRemote}
                onChange={e => {
                  const isChecked = e.target.checked;
                  setShowRemote(isChecked);
                }}
              />
            </label>
          </div>
        </div>
      )}
      {jobs && !isLoading && !isFetching && (
        <>
          <div className="flex flex-col w-full py-4 max-w-4xl gap-4">
            {jobs.map((job: Job) => (
              <div
                key={job.id}
                onClick={() => void goToJob(job.id)}
                className="flex flex-col gap-8 md:flex-row justify-between align-center md:items-center border-4 border-black p-4">
                <div className="flex flex-col">
                  <h1>{job.title}</h1>
                  <p>{job.company}</p>
                  <p className="bg-accent">
                    {`$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="text-xs">{dayjs(job.createdAt).fromNow()}</p>
                </div>
              </div>
            )
            )}
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
  )
};
