import { useContext, useState } from "react";
import { API_URL } from "../../Constants";
import Button from "../components/Button";
import axios from "axios";
import { userContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { currUsername, setCurrUsername, userId, setUserId } = useContext(userContext)

  const navigate = useNavigate()


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
        setCurrUsername(res.data.username)
        setUserId(res.data.userId)
        setMessage(`Welcome, ${res.data.username}!`);
        navigate("/")
      } else {
        setMessage(res.data.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Login failed. Please try again.");
    }
  }

  return (
    <div className="w-full flex-1 bg-green-400 flex justify-center items-center py-12">
      <div className="w-full flex justify-center items-center">
        <div className="w-1/2 bg-red-400 grid grid-cols-[1fr_3fr] gap-4 p-6 rounded-2xl shadow-lg">
          {/* Username */}
          <h1 className="text-white font-semibold self-center">Username</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-80 h-10 bg-white rounded px-3 outline-none"
            placeholder="Enter username"
          />

          {/* Password */}
          <h1 className="text-white font-semibold self-center">Password</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-80 h-10 bg-white rounded px-3 outline-none"
            placeholder="Enter password"
          />

          {/* Button (aligned under inputs) */}
          <div></div>
          <Button
            width="w-80"
            height="h-12"
            color="#000000"
            text="Login"
            onClick={handleLogin}
          />

          {/* Message display */}
          {message && (
            <div className="col-span-2 mt-4 text-center text-white font-medium">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
