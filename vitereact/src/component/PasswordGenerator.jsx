import React, { useEffect, useState } from "react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  useEffect(() => {
    let pass = "";
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+~`|}{[]:;?><./-=";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  }, [length, numbers, symbols]);
  return (
    <div className="flex justify-center align-middle w-full h-screen bg-gray-900 py-3">
      <div className="p-3 bg-gray-600 m-auto w-120 rounded">
        <h1 className="text-4xl text-white text-center my-2">
          Password Generator
        </h1>
        <div className="flex gap-3">
          <input
            value={password}
            type="text"
            placeholder="Password"
            className="outline-none bg-white px-4 py-2 rounded w-full"
          />
          <button
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigator.clipboard.writeText(password)}
          >
            Copy
          </button>
        </div>
        <div className="text-white text-center my-4 flex gap-4 px-4">
          <div className=" justify-center align-middle my-4">
            <input
              type="range"
              className="w-30"
              min="1"
              max="20"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>

          <div className="my-4">
            <input
              type="checkbox"
              checked={numbers}
              onChange={(e) => setNumbers(e.target.checked)}
            />
            <label className="ml-2">Numbers</label>
          </div>
          <div className="my-4 ">
            <input
              type="checkbox"
              checked={symbols}
              onChange={(e) => setSymbols(e.target.checked)}
            />
            <label className="ml-2">Symbols</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
