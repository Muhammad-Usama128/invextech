"use client";
import { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email) {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });
      const data = await response.json();
      setMessage(data.message);
    }
  };
  return (
    <>
      <h1>{message}</h1>
      <form
        autoComplete="true"
        className="flex flex-col gap-2.5 items-start mt-2.5 w-fit m-auto"
        onSubmit={handleSubmit}
      >
        <input
          className="border-white border-2 w-2xs rounded-lg px-2.5 py-1.5 outline-none"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <input
          className="border-white border-2 w-2xs rounded-lg px-2.5 py-1.5 outline-none"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <button
          type="submit"
          className="bg-amber-400 px-2.5 py-1 cursor-pointer rounded-lg "
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
