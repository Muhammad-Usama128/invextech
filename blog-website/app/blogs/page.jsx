"use client";
import BlogCard from "@/components/ui/BlogCard";
import { useState, useEffect } from "react";

export const metadata = {
  title: "Blogs - Blog Website",
};

const page = () => {
  const [data, setData] = useState([]);
  const [loadBlog, setLoadBlog] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(
        `https://dev.to/api/articles?per_page=9&page=${loadBlog}`,
        {
          cache: "no-store",
        },
      );
      const Data = await response.json();
      if (Data.length === data.length) {
        // setHasMore(false);
        setLoading(false);
      }
      setData(Data);
      window.scrollTo({ top: 500, behavior: "smooth" });
      setLoading(false);
    })();
  }, [loadBlog]);
  return (
    <>
      <div className="bg-[url('/blog-bg.jpg')] bg-cover bg-center w-full m-auto rounded-lg ">
        <div className="h-120 w-full flex items-center justify-center bg-gray-500/30">
          <h1 className="text-center text-5xl font-bold text-white">BLOGS</h1>
        </div>
      </div>
      <div className="mt-16">
        <h1 className="text-center text-5xl my-5 font-bold">
          {" "}
          Page: {loadBlog}
        </h1>
        {!data || data.length === 0 ? (
          <p className="text-center text-3xl">No Blog Found </p>
        ) : (
          <ul className="flex justify-center gap-6 flex-wrap">
            {data.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </ul>
        )}
      </div>
      {loading ? (
        <p className="text-center">"Loading..."</p>
      ) : (
        <div className="flex gap-4 justify-center items-center">
          {loadBlog > 1 && (
            <button
              onClick={() => setLoadBlog(loadBlog - 1)}
              className="mt-8 mb-12 bg-gray-400 cursor-pointer disabled:cursor-not-allowed hover:bg-gray-300 px-4 py-2 rounded-4xl w-fit text-white "
              disabled={loading}
            >
              {loading ? "Loading..." : "Previous Page"}
            </button>
          )}
          <button
            onClick={() => setLoadBlog(loadBlog + 1)}
            className="mt-8 mb-12 bg-gray-400 cursor-pointer disabled:cursor-not-allowed hover:bg-gray-300 px-4 py-2 rounded-4xl w-fit text-white "
            disabled={loading}
          >
            {loading ? "Loading..." : "Next Page"}
          </button>
        </div>
      )}
    </>
  );
};

export default page;
