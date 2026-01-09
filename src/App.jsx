import "./App.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Promotion from "./pages/Promotion";
import Login from "./pages/Login";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { userContext } from "./context/UserContext";
import { productContext } from "./context/ProductContext";
import Cookies from "js-cookie";
import ViewCart from "./pages/ViewCart";



function App() {
  const [currUsername, setCurrUsername] = useState("");
  const [userId, setUserId] = useState("");

  const [addToCart, setAddToCart] = useState({
    name: "",
    price: 0,
    image: "",
    category: "",
    quantity: 0,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    const savedUserId = Cookies.get("userId");
    const savedUsername = Cookies.get("username");

    if (savedUserId && savedUsername) {
      setUserId(savedUserId);
      setCurrUsername(savedUsername);
    }
  }, []);
  return (
    <>
      <userContext.Provider
        value={{
          currUsername,
          setCurrUsername,
          userId,
          setUserId,
          showMessageModal,
          setShowMessageModal,
        }}
      >
        <productContext.Provider
          value={{
            addToCart,
            setAddToCart,
            showAddModal,
            setShowAddModal,
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
                  <Route path="/cart" element={<ViewCart />} />
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
