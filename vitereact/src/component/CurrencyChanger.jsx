import React, { useEffect, useState } from "react";

const CurrencyChanger = () => {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currentCurrency, setCurrentCurrency] = useState("USD");
  const [targetAmount, setTargetAmount] = useState(0);
  const [targetCurrency, setTargetCurrency] = useState("PKR");
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const ChangeAmount = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${currentCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setAvailableCurrencies(Object.keys(data.rates));
        const rate = data.rates[targetCurrency];
        const convertedAmount = currentAmount * rate;
        setTargetAmount(convertedAmount.toFixed(2));
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
      });
  };
  useEffect(() => {
    ChangeAmount();
  }, []);
  return (
    <div className="bg-gray-900 pt-10 w-full h-screen">
      <div>
        <h1 className="text-white text-5xl text-center mt-12">
          Currency Changer
        </h1>
      </div>
      <div className="bg-gray-200 w-1/2 m-auto p-7 rounded mt-10">
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col">
            <label className=" mb-1 text-2xl text-gray-500">From</label>
            <input
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              type="number"
              className=" bg-white outline-none text-2xl px-2 py-1 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-2xl text-gray-500">Currency Type</label>
            <select
              value={currentCurrency}
              onChange={(e) => setCurrentCurrency(e.target.value)}
              className=" bg-white outline-none text-2xl px-2 py-1 rounded"
            >
              {availableCurrencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2 justify-between mt-5">
          <div className="flex flex-col">
            <label className=" mb-1 text-2xl">To</label>
            <input
              changeable={false}
              value={targetAmount}
              type="number"
              className=" bg-white outline-none text-2xl px-2 py-1 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-2xl text-gray-500">Currency Type</label>
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              className=" bg-white outline-none text-2xl px-2 py-1 rounded"
            >
              {availableCurrencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={ChangeAmount}
          className=" cursor-pointer bg-blue-500 text-white px-4 py-2 rounded mt-5"
        >
          Convert {currentCurrency} to {targetCurrency}
        </button>
      </div>
    </div>
  );
};

export default CurrencyChanger;
