import logo from "../assets/logo.svg"
import cart from "../assets/cart.png"
import search from "../assets/search.png"
import user from "../assets/user.png"
import { Link } from "react-router-dom"

export default function Header() {
  const paths = [
    { id: "home", text: "Home", path: "/" },
    { id: "product", text: "Products", path: "/products" },
    { id: "about", text: "About", path: "/about" },
    { id: "contact", text: "Contact Us", path: "/contact" },
    { id: "promotion", text: "Promotions", path: "/promotion" },
  ]

  return (
    <div className="w-full h-30 border-b-5 border-[#FF2B2B]">
      <div className="grid grid-cols-[1.5fr_4fr_3fr_1fr] gap-4 h-full w-full">
        
       
        <div className="w-full h-full flex justify-center items-center">
          <img src={logo} className="logo" />
        </div>

        
        <div className="w-full flex justify-evenly items-center">
          {paths.map((path) => (
            <Link key={path.id} to={path.path}>
              <button>{path.text}</button>
            </Link>
          ))}
        </div>

        
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-10/12 h-[40px] bg-white rounded-lg shadow flex items-center px-3">
            <img src={search} className="w-5 h-5 mr-2" alt="search icon" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 outline-none bg-transparent text-sm text-black"
            />
          </div>
        </div>

        
        <div className="flex w-full h-full justify-evenly items-center">
          <img src={user} alt="user" className="icons" />
          <img src={cart} alt="cart" className="icons" />
        </div>
      </div>
    </div>
  )
}
