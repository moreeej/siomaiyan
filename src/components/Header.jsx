import logo from "../assets/header/siomaiyan_logo.png";
import cart from "../assets/header/cartsu.svg";
import search from "../assets/header/searchsu.svg";
import user from "../assets/header/usersu.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../context/UserContext";
import Button from "./Button";
import Cookies from "js-cookie";



export default function Header() {
  const paths = [
    { id: "home", text: "Home", path: "/" },
    { id: "product", text: "Products", path: "/products" },
    { id: "about", text: "About", path: "/about" },
    // { id: "contact", text: "Contact Us", path: "/contact" },
    { id: "promotion", text: "Promotions", path: "/promotion" },
  ];


  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const { userId, setUserId, setCurrUsername} = useContext(userContext)
  const navigate = useNavigate()



  async function handlesLogout() {
    Cookies.remove("userId");
    Cookies.remove("username");
    
    setUserId("")
    setCurrUsername("")

    setShowLogoutModal(false)
    navigate("/");
  }

  return (
    <>
      <div className="w-full h-auto flex flex-col justify-center items-center top-0 sticky z-40 border-b-5 border-[#FF2B2B] bg-black">
      <div className="w-full h-30 bg-white">
          <div className="grid grid-cols-3 h-full">
            <div></div>
            <div className="flex justify-center items-center">
              <img src={logo} alt="siomaiyan logo" className="w-60" />
            </div>
            <div className="w-full h-full flex justify-end">
              <div className="w-auto h-full flex justify-evenly items-center gap-15 px-10">
                {userId ? 
                  <>
                    <img src={search} alt="search" className="w-8 cursor-pointer" />
                    <img src={user} alt="user" className="w-8 cursor-pointer" onClick={() => setShowLogoutModal(true)}/>
                    <img
                      src={cart}
                      alt="cart"
                      className="w-8 cursor-pointer"
                      onClick={() => navigate("/cart")}
                    />
                  </>
                :
                  <Button 
                    width={"w-40"}
                    height={"h-20"}
                    text={"Login"}
                    bgColor={"#000000"}
                    textColor={"#ffffff"}
                    onClick={() => navigate("/login")}
                  />
                }
                
              </div>
            </div>
        </div>
      </div>


      <div className="w-3/4 h-20 flex justify-center items-center">
        <div className="w-full flex justify-evenly items-center">
          {paths.map((path) => (
            <Link key={path.id} to={path.path}>
              <Button
                text={path.text}
                width={"w-40"}
                height={"h-15"}
                bgColor={"#ffffff"}
                textColor={"#000000"}
              />
            </Link>
          ))}
        </div>
      </div>



    </div>

{showLogoutModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-sm border-2 border-black">
      <h2 className="text-xl font-bold text-black text-center mb-6">
        Are you sure you want to logout?
      </h2>

      <div className="flex justify-center gap-6">
        <Button 
          text={"Yes"}
          bgColor={"#80ef80"}
          textColor={"#000000"}
          onClick={handlesLogout}
          width={"w-40"}
          height={"h-15"}
        />



        <Button 
          text={"No"}
          bgColor={"#f94449"}
          textColor={"#000000"}
          onClick={() => setShowLogoutModal(false)}
          width={"w-40"}
          height={"h-15"}
        />
      </div>
    </div>
  </div>
)}
    
    </>
  );
}
