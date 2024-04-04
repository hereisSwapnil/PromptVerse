"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);

    const handleDeletePrompt = async(id) => {
        try {
            fetch("/api/")
        } catch (error) {
            console.log(error)
        }
    }
    
  useEffect(() => {
    (async () => {
      if (session) {
        const res = await fetch(`/api/prompt/${session?.user.id}`);
        const data = await res.json();
        if (data.error) {
          return;
        }
        setPrompts(data);
      }
    })();
  }, [session]);

  return (
    <section className="flex flex-col md:max-w-[60vw] m-auto px-[20px] justify-center mt-10 md:mt-20 gap-2 md:gap-5">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold md:text-5xl">My Profile</h1>
        <p className="text-md md:text-lg text-gray-600">
          Welcome to your personalized profile page
        </p>
      </div>
      <div className="mt-5 flex flex-col">
        <div className="mt-20 md:mt-10 md:gap-3 md:p-5 md:shadow-lg">
          {prompts?.map((prompt) => (
            <div
              key={prompt.id}
              className="flex flex-col gap-2 border p-5 shadow-lg md:mb-10 mb-5 rounded-md  mx-auto hover:cursor-pointer hover:transform hover:scale-105 transition-all"
            >
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3 mb-3">
                  <Image
                    src={prompt.createdBy.image}
                    alt={prompt.createdBy}
                    width={40}
                    height={440}
                    className="rounded-full"
                  ></Image>
                  <div className="flex flex-col text-sm">
                    <p className="font-bold text-gray-500">
                      {prompt.createdBy.username}
                    </p>
                    <p className="text-gray-400">{prompt.createdBy.email}</p>
                  </div>
                </div>
              </div>
              <p className="text-md text-gray-700">{prompt.prompt}</p>
              <p className="italic text-gray-400">{prompt.tag}</p>
              <div className="flex flex-row justify-center gap-10 text-md">
                <Link
                  href={`/update-prompt?id=${prompt._id}`}
                  className="text-orange-400"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    handleDeletePrompt(prompt._id);
                  }}
                  className="text-red-400 outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
