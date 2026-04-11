"use client";

import { useState } from "react";
export const metadata: Metadata = {
  title: "Contact Us - Blog Website",
};

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && message) {
      setLoading(true);
      const response = await fetch("/api/contact");
      const data = await response.json();
      setTimeout(() => {
        setResponse(data.message);
        setLoading(false);
      }, 1000);
    }
  };
  return (
    <>
      <div className="bg-[url('/contact-bg.png')] bg-cover bg-center w-full m-auto rounded-lg ">
        <div className="h-120 w-full flex items-center justify-center bg-gray-500/30">
          <h1 className="text-center text-5xl font-bold text-white">
            CONTACT US
          </h1>
        </div>
      </div>
      <div className="my-20">
        <p className="text-center text-2xl text-green-400 my-2.5">{response}</p>
        <form
          onSubmit={handleSubmit}
          className="w-1/3 flex flex-col gap-2 mx-auto"
        >
          <input
            className="border-2 px-2.5 py-1.5 rounded-lg"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Enter Your Message"
            className="border-2 px-2.5 py-1 rounded-lg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            disabled={loading}
            className="w-fit disabled:cursor-not-allowed disabled:bg-gray-500 bg-gray-800 text-white px-4 py-1.5 rounded-lg mx-auto cursor-pointer"
            type="submit"
          >
            {loading ? "loading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
