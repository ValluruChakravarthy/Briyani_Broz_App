
import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import supabase from "../../supabase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [fullname, setFullname] = useState("");

  const navigate=useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    //supabase function mentioned in docs
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: fullname,
      },
      //without this after clicking confirm in gmail its going to crashed giving 404
      emailRedirectTo: '${window.location.origin}/Login',
    },
  });

    if (error) {
      setError(error.message);
    } else {
      console.log("Signup successful:", data);
    }

setLoading(false);
navigate("/CheckEmail");
  };

  return (
    <div className="w-screen flex mx-auto p-5 bg-slate-400/15 justify-center">
      <form
        onSubmit={handleSignup}
        className="max-w-md m-auto mt-24 p-8
         rounded-2xl bg-white shadow-lg border border-gray-200"
      >
        <h2 className="font-bold pb-2 pt-20 ">
          Sign up today!
        </h2>

        <p>
          Already have an account?{" "}
          <Link to="/Login">
            Sign in!
          </Link>
        </p>

        <div className="flex flex-col py-4">

      <input
        placeholder="Full Name"
        className="p-3 mt-6 border-[0.1vw]"
        type="text"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        required
      />
          <input
            placeholder="Email"
            className="p-3 mt-6 border-[0.1vw]"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            placeholder="Password"
            className="p-3 mt-6 border-[0.1vw]"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full hover:bg-amber-400 p-5"
          >
            {loading ? "Signing up..." : "Sign up"}
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

export default Signup;
