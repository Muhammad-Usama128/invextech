import React, { useState } from "react";
import Card from "./Card";
const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 align-middle mt-10">
      <h1 className="text-3xl  font-bold">{count}</h1>
      <div className="flex gap-4">
        <button
          className=" cursor-pointer p-3 bg-amber-500 text-white rounded-lg shadow-lg hover:bg-amber-600 transition-colors duration-200"
          onClick={() => count < 20 && setCount(count + 1)}
        >
          Increase
        </button>
        <button
          className="cursor-pointer p-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors duration-200"
          onClick={() => count > 0 && setCount(count - 1)}
        >
          Decrease
        </button>
      </div>
      <Card value={count} />
      <Card value={count} />
    </div>
  );
};

export default Home;
