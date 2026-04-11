import Image from "next/image";
import Link from "next/link";
const BlogCard = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.id}`} className="w-80 flex flex-col group">
      <div className="overflow-hidden">
        <Image
          src={blog.social_image}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full group-hover:scale-105 transition-transform duration-300 h-48 object-cover"
          alt="Blog Image"
          loading="eager"
        />
      </div>
      <p className="text-gray-600 text-sm mt-2">
        Article Writer: {blog.user.name}
      </p>
      <h1 className="font-bold mt-2.5 my-auto">{blog.title}</h1>
      <p className="text-gray-600 my-auto text-sm">{blog.description}</p>
      <div className="flex justify-between items-center my-auto mb-3.5 text-sm">
        <p>Created at: {blog.readable_publish_date}</p>
        <p>💬 {blog.comments_count}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
