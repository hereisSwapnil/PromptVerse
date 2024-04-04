"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  const isLoggedIn = false;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex flex-row justify-between px-[20px] mt-1 md:mt-2">
      <Link href="/" className="flex flex-row justify-center items-center">
        <h1 className="text-2xl font-bold">Prompt Verse</h1>
      </Link>
      {session?.user ? (
        <div className="relative">
          <div className="flex flex-row gap-3 items-center">
            <Link
              href="/create-prompt"
              className="border px-4 py-2 hidden md:flex rounded-r-full rounded-l-full text-xl hover:bg-[#000000] hover:text-[#fff] hover:scale-105"
            >
              Create Prompt
            </Link>
            <button
              onClick={() => signOut()}
              className="border outline-none px-4 hidden md:flex py-2 rounded-r-full rounded-l-full text-xl hover:bg-[#000000] hover:text-[#fff] hover:scale-105"
            >
              Sign Out
            </button>
            <Image
              src={session?.user.image}
              width={40}
              height={40}
              alt="Username"
              className="md:hidden hover:cursor-pointer hover:scale-105 rounded-full outline"
            />
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={50}
                height={50}
                alt="Username"
                className="hidden md:block hover:cursor-pointer rounded-full hover:scale-105 outline"
                onClick={toggleDropdown}
              />
            </Link>
          </div>
          {isDropdownOpen && (
            <div className="absolute md:hidden right-0 w-[150px] border bg-[#fff] shadow-lg z-20 rounded-md mt-2">
              <Link
                href="/profile"
                className="flex hover:bg-[#edede9] hover:font-bold px-4 py-2 rounded-md"
              >
                Profile
              </Link>
              <Link
                href="/create-prompt"
                className="flex hover:bg-[#edede9] hover:font-bold px-4 py-2 rounded-md"
              >
                Create Prompt
              </Link>
              <button
                onClick={() => signOut()}
                className="flex outline-none hover:bg-[#edede9] hover:font-bold px-4 py-2 rounded-md"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-row gap-3 items-center">
          <button
            onClick={() => signIn()}
            className="border px-2 md:px-4 py-1 md:py-2 outline-none md:flex rounded-r-full rounded-l-full text-md md:text-xl hover:bg-[#000000] hover:text-[#fff]"
          >
            Sign In
          </button>
          {/*  */}
          {/* <Link
            href="/create-prompt"
            className="flex hover:bg-[#edede9] hover:font-bold px-4 py-2 rounded-md"
          >
            Create Prompt
          </Link> */}
          {/*  */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
