import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import Logo from '~/assets/LogoSmall.svg'

export const Header: FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link className="btn btn-ghost normal-case text-xl" href='/'>Home</Link>
            </li>
            {sessionData?.user && (
              <li><Link className="btn btn-ghost normal-case text-xl" href='/post-job'>Post a job</Link></li>
            )}
            <li>
              <Link className="btn btn-ghost normal-case text-xl" href='/about'>About</Link>
            </li>
            <li>
              <Link className="btn btn-ghost normal-case text-xl" href='/contact'>Contact</Link>
            </li>

          </ul>
        </div>
        <Link
          href='/'
          className="btn btn-ghost normal-case flex align-center p-0"
        >
          <Image src={Logo as string} alt="logo" height={45} />
          <h1 className="text-xl invisible sm:visible">ReactRoles</h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="btn btn-ghost normal-case text-md md:text-xl" href='/'>Home</Link>
          </li>
          {sessionData?.user && (
            <li><Link className="btn btn-ghost normal-case text-md md:text-xl" href='/profile'>Profile</Link></li>
          )}
          {sessionData?.user && (
            <li><Link className="btn btn-ghost normal-case text-md md:text-xl" href='/post-job'>Post a job</Link></li>
          )}
          <li>
            <Link className="btn btn-ghost normal-case text-md md:text-xl" href='/about'>About</Link>
          </li>
          <li>
            <Link className="btn btn-ghost normal-case text-md md:text-xl" href='/contact'>Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
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
    // <div className="navbar bg-primary text-primary-content items-center">
    //   <div className="flex-1">
    //     <Link href="/" className="btn btn-ghost normal-case text-5xl">ReactRoles</Link>
    //   </div>
    //   <div className="flex-none gap-2">
    //     <Link className="btn btn-ghost normal-case text-xl" href='/'>Home</Link>
    //     {sessionData?.user && (
    //       <Link className="btn btn-ghost normal-case text-xl" href='/post-job'>Post a job</Link>
    //     )}
    //     {sessionData?.user ? (
    //       <a
    //         onClick={() => void signOut()}
    //       >
    //         <div className="w-10 rounded-full">
    //           <Image
    //             width={56}
    //             height={56}
    //             src={sessionData?.user?.image ?? ""}
    //             alt={sessionData?.user?.name ?? ""}
    //           />
    //         </div>
    //       </a>
    //     ) : (
    //       <a
    //         className="btn btn-ghost normal-case text-xl"
    //         onClick={() => void signIn()}
    //       >
    //         Sign in
    //       </a>
    //     )}
    //   </div>
    // </div>
  );
};
