import BlogCard from "@/components/ui/BlogCard";
import Link from "next/link";

export default async function Home() {
  const response = await fetch("https://dev.to/api/articles?per_page=3", {
    cache: "force-cache",
  });
  const data = await response.json();

  return (
    <>
      <div className="bg-[url('/home-bg.jpg')] bg-cover bg-center w-full m-auto rounded-lg ">
        <div className="h-120 w-full flex items-center justify-center bg-gray-500/30">
          <h1 className="text-center text-5xl font-bold text-white">HOME</h1>
        </div>
      </div>
      <div className="my-8">
        <h1 className="text-5xl font-bold text-center mb-5">Latest Blogs</h1>
        {!data || data.length === 0 ? (
          <p>No Blog Found </p>
        ) : (
          <ul className="flex justify-center gap-6 flex-wrap">
            {data.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </ul>
        )}
      </div>
      <Link
        href={"/blogs"}
        className="mt-8 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-4xl w-fit m-auto text-white"
      >
        view More
      </Link>
    </>
  );
}
