"use client";
import toast from "react-hot-toast";
import useApi from "@/lib/useApi";

export default function Home() {
  (async () => {
    try {
      const response = await useApi.get("/");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  })();

  const handleLogout = async () => {
    try {
      await useApi.post("/refresh/logout");
      toast.success("Logout Successfully!", {
        className:
          "!bg-green-400 !text-white !border-2 !border-green-600 !px-6 !py-4",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      toast.error("Something went wrong.");

      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-3xl w-full text-center border border-gray-100">
        <div className="mb-6 inline-flex p-4 rounded-full bg-indigo-50 shadow-inner">
          <svg
            className="w-12 h-12 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Welcome to the{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
            Dashboard
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
          Your secure, beautiful, and intuitive workspace. Start managing your
          tasks, analyzing data, and collaborating with your team today.
        </p>

        <button
          onClick={handleLogout}
          className="inline-flex cursor-pointer items-center justify-center bg-gray-900 text-white font-semibold py-4 px-10 rounded-xl hover:bg-gray-800 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <span>Logout</span>
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
