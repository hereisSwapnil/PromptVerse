"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setSubmitting] = useState(false);
  const handleCreatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section className="flex flex-col md:max-w-[60vw] m-auto px-[20px] justify-center mt-10 md:mt-20 gap-2 md:gap-5">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold md:text-5xl">Create Post</h1>
        <p className="text-md md:text-lg text-gray-600">
          Create and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform.
        </p>
      </div>
      <div className="mt-5 flex flex-col">
        <h2 className="text-xl font-bold md:text-2xl">Your AI Prompt</h2>
        <textarea
          type="text"
          placeholder="I'm going to give you a piece of code and you have tell me how can I make it cleaner, more readable, and more efficient."
          className="w-full min-h-[150px] h-auto p-3 mt-3 border rounded-sm shadow-md outline-none focus:shadow-lg"
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        <h2 className="text-xl font-bold mt-7 md:text-2xl">
          Tag{" "}
          <span className="text-lg md:text-xl font-thin">
            (#product, #webdevelopment, #idea)
          </span>
        </h2>
        <input
          type="text"
          className="w-full outline-none h-auto p-3 mt-3 border rounded-sm shadow-md focus:shadow-lg"
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
        />
      </div>
      <div className="flex flex-row gap-3 items-center justify-end mt-5">
        <Link href="/" className="text-lg text-gray-400 hover:text-gray-700">
          Cancel
        </Link>
        <button
          onClick={handleCreatePost}
          className="border outline-none px-2 py-1 md:px-4 md:py-2 rounded-r-full rounded-l-full text-lg md:text-xl hover:bg-[#000000] hover:text-[#fff] hover:scale-105"
        >
          Create
        </button>
      </div>
    </section>
  );
};

export default CreatePrompt;
