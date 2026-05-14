"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
const page = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(3);

  const posts = async (limit) => {
    const response = fetch("https://dummyjson.com/products");
    let data = await (await response).json();
    data = data.products;
    data = limit ? data.slice(0, parseInt(limit)) : data.slice(0);
    setData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await posts(limit);
  };
  useEffect(() => {
    (async () => {
      await posts(limit);
    })();
  }, []);
  return (
    <div>
      <h1 className="text-3xl text-center">Product: {limit}</h1>
      <form onSubmit={handleSubmit} className="flex gap-1 w-fit m-auto">
        <input
          className="border-white border-2 px-1.5 py-1 rounded-lg outline-none"
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
        <button
          className="bg-amber-400 rounded-lg w-fit px-1.5 py-1"
          type="submit"
        >
          Submit
        </button>
      </form>
      <ul className="flex flex-wrap gap-5 justify-center my-3">
        {data.length === 0 ? (
          <p className="text-center text-3xl mt-2.5">No products found.</p>
        ) : (
          data.map((item) => (
            <li
              key={item.id}
              className="group relative overflow-hidden cursor-pointer rounded-lg border-2 w-90 p-2 flex flex-col"
            >
              <p className="absolute top-4 -right-full group-hover:right-2 transition-all duration-300 delay-200 z-10">
                <span className="text-3xl bg-gray-700 rounded-full px-1.5 py-2 hover:bg-gray-600 ">
                  🛒
                </span>
              </p>
              <Image
                loading="eager"
                src={item.images[0]}
                width={0}
                height={0}
                sizes="100%"
                className="group-hover:scale-110 transition-transform duration-500 w-full"
                alt="Product Image"
              />
              <h1 className="text-2xl group-hover:text-gray-400">
                {item.title}
              </h1>
              <p className="group-hover:text-gray-400">{item.description}</p>
              <p className="mt-auto group-hover:text-gray-400">${item.price}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default page;
