"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && price && description) {
      try {
        const response = await axios.post("https://fakestoreapi.com/products", {
          title,
          price,
          description,
        });
        if (response.status === 201) {
          setMessage("Product created successfully!");
          setTitle("");
          setPrice("");
          setDescription("");
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
      } catch (error) {
        setMessage("An error occurred while creating the product.");
      }
    }
  };

  return (
    <div className="mt-16">
      <p className="text-center text-green-500">{message}</p>
      <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 mx-auto"
      >
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-300 rounded-md py-1.5 px-2.5 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          className="border border-gray-300 rounded-md py-1.5 px-2.5 outline-none"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="border border-gray-300 rounded-md py-1.5 px-2.5 outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="w-fit bg-blue-500 text-white py-1.5 px-2.5 rounded-md cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
