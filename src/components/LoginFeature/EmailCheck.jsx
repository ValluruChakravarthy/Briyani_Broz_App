
import React from "react";
import { Link } from "react-router-dom";

const EmailCheck = () => {
  return (
    <div className="w-screen flex mx-auto p-5 bg-slate-400/15 justify-center">
      <div className="max-w-md m-auto mt-24 p-8 rounded-2xl bg-white shadow-lg border border-gray-200 text-center">

        <h2 className="font-bold text-2xl mb-4">
          Check your email...
        </h2>

        <p className="text-gray-600 mb-4">
          We've sent a verification link to your email address.
        </p>

        <p className="text-gray-600 mb-6">
          Please check your inbox and click the link to verify your account.
        </p>

        <Link
          to="/Login"
          className="inline-block bg-amber-400 hover:bg-amber-500 px-6 py-3 rounded-lg"
        >
          Go to Login
        </Link>

      </div>
    </div>
  );
};

export default EmailCheck;

