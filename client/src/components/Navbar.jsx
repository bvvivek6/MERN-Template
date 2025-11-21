import { Link } from "react-router-dom";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-neutral-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold dm-sans">
          MERN Template
        </div>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="flex items-center space-x-2 bg-transparent border border-neutral-700 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition"
          >
            <FiLogIn />
            <span>Login</span>
          </Link>
          <Link
            to="/signup"
            className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-neutral-200 transition"
          >
            <FiUserPlus />
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
