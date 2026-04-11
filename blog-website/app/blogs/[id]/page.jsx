import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog - Blog Website",
};
const page = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`https://dev.to/api/articles/${id}`, {
    cache: "force-cache",
  });
  const data = await response.json();
  console.log(data);

  return (
    <div className="w-3/4 mx-auto">
      <Image
        src={data.cover_image}
        alt="Blog Image"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full"
      />
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p>Writer: {data.user.name}</p>
        </div>
        <div className="text-right">
          <p className="text-nowrap">
            Publish Date: {data.readable_publish_date}
          </p>
          <p>💬 {data.comments_count}</p>
        </div>
      </div>
      <article
        className="prose prose-lg max-w-none mt-3.5 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: data.body_html }}
      />
    </div>
  );
};

export default page;
