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
import { productContext } from "./context/ProductContext";

function App() {
  const [currUsername, setCurrUsername] = useState("");
  const [userId, setUserId] = useState("");

  const [addToCart, setAddToCart] = useState({
    name: "",
    price: 0,
    image: "",
    category: "",
    quantity: 0
  })
  const [showAddModal, setShowAddModal] = useState(false)
  return (
    <>
      <userContext.Provider
        value={{
          currUsername,
          setCurrUsername,
          userId,
          setUserId,
        }}
      >
        <productContext.Provider
          value={{
            addToCart,
            setAddToCart,
            showAddModal,
            setShowAddModal
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
        </productContext.Provider>
      </userContext.Provider>
    </>
  );
}

export default App;
