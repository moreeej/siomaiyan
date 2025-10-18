import "./App.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Promotion from "./pages/Promotion";
import Login from "./pages/Login";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";
import { userContext } from "./context/UserContext";

function App() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  return (
    <>
      <userContext.Provider
        value={{
          username,
          setUsername,
          userId,
          setUserId,
        }}
      >
        <BrowserRouter>
          <div className="main-container">
            <Header />
            <div className="content-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/promotion" element={<Promotion />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
