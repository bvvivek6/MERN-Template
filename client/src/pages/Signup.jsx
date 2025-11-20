import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";

const Signup = () => {
  const { signup, loading } = useAuthContext();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(name, email, password);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen dm-sans flex items-center justify-center bg-black text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="
        bg-[#111]
        border border-neutral-800
        shadow-xl
        rounded-xl
        p-8
        w-full max-w-sm
        space-y-6
      "
      >
        <h2 className="text-3xl font-semibold text-center tracking-tight">
          Sign Up
        </h2>

        {error && (
          <div className="text-red-500 text-sm bg-red-500/10 border border-red-700 rounded p-2">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
          w-full
          bg-transparent
          border border-neutral-700
          rounded-lg
          px-3 py-2
          text-white
          placeholder-neutral-500
          focus:outline-none
          focus:border-neutral-400
          transition
        "
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
          w-full
          bg-transparent
          border border-neutral-700
          rounded-lg
          px-3 py-2
          text-white
          placeholder-neutral-500
          focus:outline-none
          focus:border-neutral-400
          transition
        "
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
          w-full
          bg-transparent
          border border-neutral-700
          rounded-lg
          px-3 py-2
          text-white
          placeholder-neutral-500
          focus:outline-none
          focus:border-neutral-400
          transition
        "
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          bg-white
          text-black
          font-medium
          py-2.5
          rounded-lg
          hover:bg-neutral-200
          transition
          disabled:opacity-60
        "
        >
          {loading ? "Loading..." : "Create Account"}
        </button>

        <p className="text-sm text-center text-neutral-400">
          Have an account?{" "}
          <Link to="/login" className="text-white hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
