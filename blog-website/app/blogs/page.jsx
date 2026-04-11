"use client";
import BlogCard from "@/components/ui/BlogCard";
import { useState, useEffect } from "react";
const page = () => {
  const [data, setData] = useState([]);
  const [loadBlog, setLoadBlog] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(
        `https://dev.to/api/articles?per_page=${loadBlog * 9}`,
        {
          cache: "force-cache",
        },
      );
      const Data = await response.json();
      if (Data.length === data.length) {
        setHasMore(false);
        setLoading(false);
      }
      setData(Data);
      setLoading(false);
    })();
  }, [loadBlog]);
  return (
    <>
      <div className="bg-[url('/pexels-markus-winkler-1430818-19813743.jpg')] bg-cover bg-center w-full m-auto rounded-lg ">
        <div className="h-120 w-full flex items-center justify-center bg-gray-500/30">
          <h1 className="text-center text-5xl font-bold text-white">BLOGS</h1>
        </div>
      </div>
      <div className="mt-16">
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
      {hasMore && (
        <button
          onClick={() => setLoadBlog(loadBlog + 1)}
          className="mt-8 mb-12 hidden bg-gray-400 cursor-pointer disabled:cursor-not-allowed hover:bg-gray-300 px-4 py-2 rounded-4xl w-fit m-auto text-white "
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
};

export default page;
