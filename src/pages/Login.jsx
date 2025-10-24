import { useContext, useState } from "react";
import { API_URL } from "../../Constants";
import Button from "../components/Button";
import axios from "axios";
import { userContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { setCurrUsername, setUserId } = useContext(userContext);
  const navigate = useNavigate();

  async function handleLogin() {
    if (!username || !password) {
      setMessage("Please fill in both fields.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/checkCreds`, {
        username,
        password,
      });

      if (res.data.success) {
        setCurrUsername(res.data.username);
        setUserId(res.data.userId);

        Cookies.set("userId", res.data.userId, { expires: 7 });
        Cookies.set("username", res.data.username, { expires: 7 });

        setMessage(`Welcome, ${res.data.username}!`);
        navigate("/");
      } else {
        setMessage(res.data.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Login failed. Please try again.");
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-black via-[#1a0000] to-red-900">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center border border-black">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-red-600 mb-6 uppercase tracking-wide">
          Login
        </h1>

        {/* Username Field */}
        <div className="w-full mb-5">
          <label className="block text-sm font-semibold text-black mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-11 px-4 border-2 border-black rounded-md outline-none focus:border-red-600 transition"
            placeholder="Enter username"
          />
        </div>

        {/* Password Field */}
        <div className="w-full mb-5">
          <label className="block text-sm font-semibold text-black mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 px-4 border-2 border-black rounded-md outline-none focus:border-red-600 transition"
            placeholder="Enter password"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full h-11 mt-2 !bg-red-600 text-white font-semibold rounded-md hover:bg-black transition-all duration-300 shadow-md"
        >
          Login
        </button>


        {/* Message */}
        {message && (
          <div
            className={`mt-4 text-center font-medium ${
              message.includes("Welcome")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
