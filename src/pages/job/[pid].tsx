import Link from 'next/link';
import { useRouter } from 'next/router'
import { Spinner } from '~/components/Spinner';
import { api } from '~/utils/api';

const Job = () => {
  const router = useRouter()
  const { pid } = router.query
  const { data: job } = api.jobs.getJob.useQuery({ id: pid as string });
  const applyClicked = api.application.applyForJob.useMutation();

  if (!job) return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spinner />
    </div>
  )

  return (
    <div className="p-4 md:p-16 flex flex-col align-center items-center w-screen justify-center max-w-6xl mx-auto ">
      <div className="stats bg-primary text-primary-content mb-6">
        <div className="stat">
          <div className="stat-title">Job views</div>
          <div className="stat-value">{job.views}</div>
          <div className="stat-actions">
            <Link href="/contact" className="btn btn-sm">want more 👀?</Link>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Applications 🧟</div>
          <div className="stat-value">{job.applyClicked}</div>
          <div className="stat-actions">
            <Link href="/profile" className="btn btn-sm btn-success">👉 Dashboard</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-4xl">{job.title}</h1>
        <h2 className="text-2xl">Job Description</h2>
        <p>{job.description}</p>
        <h3 className="text-2xl">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {job.tags.map(tag => (
            <div key={tag} className="badge badge-accent gap-1 p-3">
              {tag}
            </div>
          ))}
        </div>
        <button
          className="btn w-full my6"
          onClick={() => applyClicked.mutate({ jobId: job.id })}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default Job
