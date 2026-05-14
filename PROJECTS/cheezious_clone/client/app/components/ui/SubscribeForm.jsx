"use client";
import React, { useState } from "react";
const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setError("");
      setSuccess("Thank you for subscribing!");
    } else if (!email) {
      setError("Required");
    } else {
      setError("Invalid email address");
    }
  };
  return (
    <form className="mt-10 flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter Email Address"
        className="px-6 py-4 border rounded-lg w-120 text-xl outline-none max-lg:w-full"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
          setSuccess("");
        }}
      />
      <p className="text-red-600">{error}</p>
      <p className="text-green-600">{success}</p>
      <button className="bg-[linear-gradient(90deg,rgb(253,240,88)_0%,rgb(255,203,5)_100%)] w-fit px-6 py-3 rounded-lg font-bold cursor-pointer hover:bg-gray-500">
        SUBSCRIBE
      </button>
    </form>
  );
};

export default SubscribeForm;
