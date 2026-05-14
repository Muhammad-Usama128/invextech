"use client";
import axios from "axios";
import { useEffect, useState } from "react";
const Card = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    const name =
      e.target.parentElement.previousElementSibling.querySelectorAll("input")[0]
        .value;
    const phone =
      e.target.parentElement.previousElementSibling.querySelectorAll("input")[1]
        .value;
    const email =
      e.target.parentElement.previousElementSibling.querySelectorAll("input")[2]
        .value;
    if (name && phone && email) {
      try {
        const response = await axios.post("https://fakestoreapi.com/products", {
          id: product.id,
          name,
          phone,
          email,
        });
        if (response.status === 201) {
          setIsEditing(false);
          setMessage("Product updated successfully!");
        } else {
          setMessage("Failed to update product.");
        }
      } catch (error) {
        setMessage("An error occurred while updating the product.");
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://fakestoreapi.com/products/${product.id}`,
      );
      if (response.status === 200) {
        setMessage("Product deleted successfully!");
      } else {
        setMessage("Failed to delete product.");
        console.log(response);
      }
    } catch (error) {
      setMessage("An error occurred while deleting the product.");
    }
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <li className="list-none flex relative justify-between gap-2 p-4 border rounded-md w-xl">
      <p className="absolute top-0 left-2 text-sm text-green-500">{message}</p>
      {isEditing ? (
        <div className="flex flex-col">
          <input
            type="text"
            className="text-gray-500 outline-none border-b-2 w-96 "
            defaultValue={product.title}
          />

          <input
            className="text-gray-500 outline-none border-b-2 w-96"
            type="text"
            defaultValue={product.price}
          />
          <input
            className="text-gray-500 outline-none border-b-2 w-96"
            type="text"
            defaultValue={product.rating.rate}
          />
        </div>
      ) : (
        <div className="text-gray-500">
          <p className="mb-0.5">{product.title}</p>
          <p className="mb-0.5">${product.price.toFixed(2)}</p>
          <p className="mb-0.5">{product.rating.rate}</p>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {!isEditing ? (
          <>
            <button
              onClick={(e) => {
                setIsEditing(true);
                setTimeout(() => {
                  e.target.parentElement.previousElementSibling
                    .querySelector("input")
                    .focus();
                }, 100);
              }}
              className="text-blue-500 cursor-pointer hover:text-blue-600"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 cursor-pointer hover:text-red-600"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={(e) => handleSubmit(e)}
              className="text-blue-500 cursor-pointer hover:text-blue-600"
            >
              Submit
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 cursor-pointer hover:text-gray-600"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default Card;
