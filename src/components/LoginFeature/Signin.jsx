import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabase";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Login successful:", data);

      navigate("/Home");
    }

    setLoading(false);
  };

  return (
    <div className="w-screen flex mx-auto p-5 bg-slate-400/15 justify-center">
      <form
        onSubmit={handleSignin}
        className="max-w-md m-auto mt-24 p-8
         rounded-2xl bg-white shadow-lg border border-gray-200"
      >
        <h2 className="font-bold pb-2">
          Welcome Back!
        </h2>

        <p>
          Don't have an account?{" "}
          <Link to="/Login/Signup">
            Sign up!
          </Link>
        </p>

        <div className="flex flex-col py-4">

          <input
            placeholder="Email"
            className="p-3 mt-6"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            placeholder="Password"
            className="p-3 mt-6"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {error && (
            <p className="text-red-500 mt-4">
              {error}
            </p>
          )}

        </div>
      </form>
    </div>
  );
};

export default Signin;

