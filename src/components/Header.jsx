import logo from "../assets/header/siomaiyan_logo.png";
import cart from "../assets/header/cartsu.svg";
import search from "../assets/header/searchsu.svg";
import user from "../assets/header/usersu.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../context/UserContext";
import Button from "./Button";




export default function Header() {
  const paths = [
    { id: "home", text: "Home", path: "/" },
    { id: "product", text: "Products", path: "/products" },
    { id: "about", text: "About", path: "/about" },
    { id: "contact", text: "Contact Us", path: "/contact" },
    { id: "promotion", text: "Promotions", path: "/promotion" },
  ];

  const { username, userId } = useContext(userContext)
  const navigate = useNavigate()

  return (
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
                    <img src={search} alt="search" className="w-8" />
                    <img src={user} alt="user" className="w-8" />
                    <img src={cart} alt="cart" className="w-8" />
                  </>
                :
                  <Button 
                    width={"w-40"}
                    height={"h-20"}
                    text={"Login"}
                    color={"#000000"}
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
              <button>{path.text}</button>
            </Link>
          ))}
        </div>
      </div>



    </div>
  );
}
