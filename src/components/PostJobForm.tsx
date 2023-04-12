import { useState } from "react";
import { api } from "~/utils/api";


export const PostJobForm: React.FC = () => {
  const defaultFormState = {
    company: "",
    title: "",
    salary: 0,
    description: "",
    location: "",
    requirements: "",
    remote: false,
  }
  const [formState, setFormState] = useState(defaultFormState);
  const [success, setSuccess] = useState(false);

  const createJob = api.jobs.create.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setFormState(defaultFormState)
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    },
  });

  const SuccessMessage = () => (
    <div className="alert alert-success shadow-lg mb-4">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Your job has been posted</span>
      </div>
      <div className="flex-none">
        <button
          onClick={() => setSuccess(false)}
          className="btn btn-sm btn-ghost"
        >
          Okay
        </button>
      </div>
    </div>
  )
  return (
    <div className="flex flex-col w-screen max-w-4xl mx-auto">
      {success && <SuccessMessage />}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Company</span>
        </label>
        <input
          value={formState.company}
          onChange={e => setFormState({ ...formState, company: e.target.value })}
          type="text" placeholder="e.g. Apple"
          className="input input-bordered w-full outline-none"
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Job title</span>
        </label>
        <input
          value={formState.title}
          onChange={e => setFormState({ ...formState, title: e.target.value })}
          type="text"
          placeholder="e.g. Software Engineer"
          className="input input-bordered w-full outline-none"
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Salary</span>
        </label>
        <input
          value={formState.salary}
          onChange={e => setFormState({ ...formState, salary: +e.target.value })}
          type="number"
          placeholder="e.g. 100000"
          className="input input-bordered w-full outline-none"
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Job description?</span>
        </label>
        <input
          value={formState.description}
          onChange={e => setFormState({ ...formState, description: e.target.value })}
          type="text"
          placeholder="e.g. Full stack developer"
          className="input input-bordered w-full outline-none"
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Location</span>
        </label>
        <input
          value={formState.location}
          onChange={e => setFormState({ ...formState, location: e.target.value })}
          type="text"
          placeholder="e.g. Remote"
          className="input input-bordered w-full outline-none"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Requirements</span>
        </label>
        <textarea
          value={formState.requirements}
          onChange={e => setFormState({ ...formState, requirements: e.target.value })}
          className="textarea textarea-bordered h-24 outline-none"
          placeholder="e.g. 3 years experience"
        />
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Remote?</span>
          <input
            type="checkbox"
            className="toggle"
            checked={formState.remote}
            onChange={e => {
              const isChecked = e.target.checked;
              setFormState((prevState) => ({
                ...prevState,
                remote: isChecked,
              }));
            }} />
        </label>
      </div>
      <button
        className="btn-primary p-2 w-full mt-2"
        onClick={() => {
          const jobModal = document.getElementById('job-modal') as HTMLInputElement;
          if (jobModal) {
            jobModal.checked = false;
          }
          createJob.mutate(formState)
        }}
      >
        Post job
      </button>
    </div>
  )
}
