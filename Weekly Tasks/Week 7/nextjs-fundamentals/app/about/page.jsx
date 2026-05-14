export const dynamic = "force-dynamic";
const getPost = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });
  return await response.json();
};
const page = async () => {
  const data = await getPost();

  return <div className="text-red-600 ">About Page</div>;
};

export default page;
