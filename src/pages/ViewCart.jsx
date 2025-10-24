import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../../Constants";
import Cookies from "js-cookie";
import { userContext } from "../context/UserContext";
import { data } from "react-router-dom";


export default function ViewCart() {
  const [cartItems, setCartItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const { userId } = useContext(userContext)
  

  async function fetchCartItems() {
    try {
      const userId = Cookies.get("userId");
      if (!userId) return;

      const { data } = await axios.get(`${API_URL}/fetchUserCart`, {
        params: { user_id: userId },
      });
      setCartItems(data);
      console.log("Items are:", data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  }

  async function handlesCheckout() {
  try {
    if (checkedItems.length === 0) {
      alert("Please select at least one item to checkout.");
      return;
    }

   const { data } = await axios.delete(`${API_URL}/checkoutItems`, {
      data: { product_ids: checkedItems }
    });


    console.log("Checkout success:", data);


    setCartItems((prev) =>
      prev.filter((item) => !checkedItems.includes(item._id))
    );
    setCheckedItems([]);

    alert("Checkout successful!");
  } catch (err) {
    console.error("Error during checkout:", err)
    alert("Error during checkout. Please try again.");
  }
}


  useEffect(() => {
    fetchCartItems();
  }, []);

  function handleCheckboxChange(itemId) {
    setCheckedItems((prevChecked) => {
      if (prevChecked.includes(itemId)) {
        return prevChecked.filter((id) => id !== itemId);
      } else {
        return [...prevChecked, itemId];
      }
    });
  }

  
  const totalCheckedPrice = cartItems
    .filter((item) => checkedItems.includes(item._id))
    .reduce((sum, item) => sum + item.total_price, 0);

  return (
    <div className="w-full p-4">
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_4fr_4fr_1fr_1fr] items-center bg-gray-100 p-2 py-2 rounded-xl border-2 border-black"
            >
              <div className="w-full h-full flex items-center justify-center">
                <input
                type="checkbox"
                checked={checkedItems.includes(item._id)}
                onChange={() => handleCheckboxChange(item._id)}
                className="w-7 h-7"
              />
              </div>
              <div className="w-full h-full flex items-center justify-center">
                  <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="w-50"
                />
              </div>
              <span>
                {item.product_name}
              </span>
              <span>{item.quantity}</span>
              <span>₱{item.total_price.toLocaleString()}</span>
            </div>
          ))}

          <div className="mt-4 p-2 text-right font-bold text-lg border-t w-full flex justify-end">
            <div className="flex gap-10 items-center justify-center">
                Total: ₱{totalCheckedPrice.toLocaleString()}
                <button 
                  className="!btn !btn-primary"
                  onClick={handlesCheckout}
                >
                  Checkout
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
