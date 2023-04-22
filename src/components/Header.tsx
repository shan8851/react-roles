import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FC } from "react";
import Logo from '~/assets/LogoSmall.svg'
import Avatar from '~/assets/avatar.png'

export const Header: FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();


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
            onClick={() => {
              void signOut({ callbackUrl: router.basePath + "/" });
            }}
            className="flex items-center gap-4 cursor-pointer hover:text-secondary"
          >
            sign out
            <div className="w-10 rounded-full">
              <Image
                width={56}
                height={56}
                src={sessionData?.user?.image ?? Avatar}
                alt={sessionData?.user?.name ?? "name"}
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
