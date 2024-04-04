"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegCopy } from "react-icons/fa";

const Feed = () => {
  const [prompts, setPrompts] = useState([]);
  const [copyId, setCopyId] = useState(null);

  const handleCopy = (id) => {
    setCopyId(id);
    setTimeout(() => {
      setCopyId(null);
    }, 2000);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      console.log(data);
      setPrompts(data);
    })();
  }, []);
  return (
    <section className="flex flex-col justify-center mx-3 mt-10 md:mt-20 gap-2 md:gap-5">
      <form
        action=""
        className="flex flex-col justify-center items-center w-full"
      >
        <input
          type="text"
          placeholder="# Search for a tag or @ a username"
          className="border shadow-xl px-3 py-2 w-full max-w-[600px] outline-none focus:shadow-lg"
        />
      </form>
      <div className="mt-20 md:mt-10 md:grid lg:grid-cols-2 xl:grid-cols-3 md:gap-3 md:p-5 md:shadow-lg">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="flex flex-col gap-2 border p-5 shadow-lg md:mb-10 mb-5 rounded-md lg:max-w-[500px] mx-auto hover:cursor-pointer hover:transform hover:scale-105 transition-all"
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
              <div className="flex flex-col">
                <p
                  className={`relative right-0 text-sm ${
                    copyId === prompt._id ? "" : "hidden"
                  } text-gray-400`}
                >
                  Copied
                </p>
                <div
                  className="rounded-full w-fit hover:bg-gray-300 p-1"
                  onClick={() => {
                    navigator.clipboard.writeText(prompt.prompt);
                    handleCopy(prompt._id);
                  }}
                >
                  <FaRegCopy />
                </div>
              </div>
            </div>
            <p className="text-md text-gray-700">{prompt.prompt}</p>
            <p className="italic text-gray-400">{prompt.tag}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feed;
