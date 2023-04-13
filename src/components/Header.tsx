import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar bg-primary text-primary-content items-center">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-5xl">ReactRoles</Link>
      </div>
      <div className="flex-none gap-2">
        <Link className="btn btn-ghost normal-case text-xl" href='/'>Home</Link>
        {sessionData?.user && (
          <Link className="btn btn-ghost normal-case text-xl" href='/post-job'>Post a job</Link>
        )}
        {sessionData?.user ? (
          <a
            onClick={() => void signOut()}
          >
            <div className="w-10 rounded-full">
              <Image
                width={56}
                height={56}
                src={sessionData?.user?.image ?? ""}
                alt={sessionData?.user?.name ?? ""}
              />
            </div>
          </a>
        ) : (
          <a
            className="btn btn-ghost normal-case text-xl"
            onClick={() => void signIn()}
          >
            Sign in
          </a>
        )}
      </div>
    </div>
  );
};
