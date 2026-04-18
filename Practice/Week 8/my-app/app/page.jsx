"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import axios from "axios";
export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        // const response = await api.get("/post");

        // const response = await api.post("/post");
        // localStorage.setItem("accessToken", response.data.token);
        const response = await axios.get(
          "https://dev.to/api/articles?per_page=9",
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    document
      .querySelectorAll("li")
      .forEach((li) =>
        li.querySelector("h1").innerText.toLowerCase().includes(value)
          ? (li.style.display = "block")
          : (li.style.display = "none"),
      );
  };
  return (
    <>
      <input
        type="text"
        onChange={handleSearch}
        className="border-2 rounded-lg px-2 py-1 w-fit"
      />

      <ul className="flex gap-3.5 justify-center flex-wrap my-6">
        {data.map((blog) => (
          <li key={blog.id} className="w-98 flex flex-col group">
            <div className="overflow-hidden">
              <Image
                src={blog.social_image}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full group-hover:scale-105 transition-transform duration-300 object-cover"
                alt="Blog Image"
                loading="eager"
              />
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Article Writer: {blog.user.name}
            </p>
            <h1 className="font-bold mt-2.5">{blog.title}</h1>
            <p className="text-gray-600 my-auto text-sm">{blog.description}</p>
            <div className="flex justify-between items-center my-auto mb-3.5 text-sm">
              <p>Created at: {blog.readable_publish_date}</p>
              <p>💬{blog.comments_count}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
