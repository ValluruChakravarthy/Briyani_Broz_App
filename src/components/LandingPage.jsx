import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#FAF8F5]">

      <img
        src="/beet.png"
        alt="beet"
        className="absolute w-[7vw] top-[10%] left-[8%] float-1"
      />

      <img
        src="/lettuce.png"
        alt="lettuce"
        className="absolute w-[7vw] top-[18%] right-[10%] float-2"
      />

      <img
        src="/onion.png"
        alt="onion"
        className="absolute w-[6vw] bottom-[15%] left-[15%] float-3"
      />

      <img
        src="/beet.png"
        alt="beet"
        className="absolute w-[5vw] bottom-[20%] right-[15%] float-4"
      />

      {/* Main content */}

      <div className="relative z-10 min-h-[calc(100vh-80px)]
        flex flex-col items-center justify-center text-center px-6">

        {/* Cooker */}

        <img
          src="/cooker.png"
          alt="cooker"
          className="w-[30vw] max-w-40
          animate-bounce-slow mix-blend-multiply"
        />

        {/* Brand */}

        <h1 className="mt-4 text-[8vw] md:text-[5vw]
          font-extrabold tracking-tight italic text-black">
          BIRYANI....
        </h1>

        <h2 className="text-[6vw] md:text-[3.5vw]
          font-extrabold tracking-tight italic text-amber-600">
          Broz...
        </h2>

        <p className="mt-4 max-w-xl text-lg md:text-xl text-gray-700">
          Not just bros cooking biryani..
          <br />
          Bro's cooking India..
        </p>

        {/* Buttons */}

        <div className="flex gap-4 mt-8">

          <Link
            to="/Login"
            className="px-7 py-3 rounded-xl
            bg-black text-white font-semibold
            hover:bg-amber-500 transition-colors"
          >
            Sign In
          </Link>

          <Link
            to="/Login/Signup"
            className="px-7 py-3 rounded-xl
            border-2 border-black font-semibold
            hover:bg-black hover:text-white transition-colors"
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default LandingPage;

