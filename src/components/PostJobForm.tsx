import { useState } from "react";
import { api } from "~/utils/api";

export const PostJobForm: React.FC = () => {
 const defaultFormState = {
    title: "",
    salaryMin: 0,
    salaryMax: 0,
    description: "",
    location: "",
    tags: [] as string[],
    remote: false,
  }
  const [formState, setFormState] = useState(defaultFormState);
  const [success, setSuccess] = useState(false);
  const [tag, setTag] = useState<string>("");

  const createJob = api.jobs.create.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setFormState(defaultFormState)
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    },
  });

  const handleAddTag = (value: string) => {
    formState.tags.push(value)
    setTag("");
  }

  const handleRemoveTag = (index: number) => {
    const newTags = formState.tags.filter((_, i) => i !== index);
    setFormState({ ...formState, tags: newTags });
  };

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
    <div className="flex flex-col w-screen max-w-4xl mx-auto p-4 md:p-16">
      {success && <SuccessMessage />}
      <div className="flex flex-col gap-4">
        <div className="form-control w-full">
          <label className="input-group input-group-vertical border-4 border-black">
            <span className="py-2">Job Title:</span>
            <input
              value={formState.title}
              onChange={e => setFormState({ ...formState, title: e.target.value })}
              type="text"
              placeholder="Prompt Engineer"
              className="input w-full outline-none"
            />
          </label>
        </div>
        <div className="form-control w-full">
          <label className="input-group input-group-vertical border-4 border-black">
            <span className="py-2">Location:</span>
          <input
            value={formState.location}
            onChange={e => setFormState({ ...formState, location: e.target.value })}
            type="text"
            placeholder="Anywhere..."
            className="input input-bordered w-full outline-none"
          />
          </label>
        </div>
        <div className="flex gap-8">
          <div className="form-control w-full">
            <label className="input-group input-group-vertical border-4 border-black">
              <span className="py-2">Min Salary: (Peanuts)</span>
              <input
                value={formState.salaryMin}
                onChange={e => setFormState({ ...formState, salaryMin: +e.target.value })}
                type="number"
                className="input input-bordered w-full outline-none"
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="input-group input-group-vertical border-4 border-black">
              <span className="py-2">Max Salary: (All of it)</span>
              <input
                value={formState.salaryMax}
                onChange={e => setFormState({ ...formState, salaryMax: +e.target.value })}
                type="number"
                className="input input-bordered w-full outline-none"
              />
            </label>
          </div>
        </div>
        <div className="form-control w-full">
        <label className="input-group input-group-vertical border-4 border-black">
            <span className="py-2">Job description</span>
          <textarea
            value={formState.description}
            onChange={e => setFormState({ ...formState, description: e.target.value })}
            placeholder="What do you need them to do!"
            className="textarea textarea-bordered textarea-lg w-full outline-none"
          />
          </label>
        </div>
        <div className="flex gap-8">
          <div className="form-control flex flex-grow items-center">
            <label className="input-group input-group-vertical border-4 border-black">
              <span className="py-2">Skills to pay the bills</span>
            <input
              onChange={e => setTag(e.target.value)}
              type="text"
              value={tag}
              placeholder="Unicorn, 10x Engineer, Wizard, etc..."
              className="input input-bordered w-full outline-none"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag(tag);
                }
              }}
            />
            </label>
          </div>
          <button className="btn btn-primary self-center" onClick={() => handleAddTag(tag)}>ADD</button>
        </div>
        <div className="flex gap-2 flex-wrap my-4">
          {
            formState.tags.map((tag, index) => (
              <div key={`key:${tag} ${index}`} className="badge badge-accent hover:badge-secondary gap-1 p-3 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-4 h-4 stroke-current cursor-pointer"
                  onClick={() => handleRemoveTag(index)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
                {tag}
              </div>
            ))
          }
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Remote?</span>
            <input
              type="checkbox"
              className="toggle-secondary toggle-lg"
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
      </div>
      <button
        className="btn btn-lg p-2 w-full mt-2"
        onClick={() => {
          createJob.mutate(formState)
        }}
      >
        Post job
      </button>
    </div>
  )
}
