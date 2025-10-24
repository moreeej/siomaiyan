import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../Constants";
import Cookies from "js-cookie";
import Button from "../components/Button";
import MessageModal from "../components/MessageModal";


export default function ViewCart() {
  const [cartItems, setCartItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false)

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
        data: { product_ids: checkedItems },
      });

      console.log("Checkout success:", data);

      setCartItems((prev) =>
        prev.filter((item) => !checkedItems.includes(item._id))
      );
      setCheckedItems([]);

      setShowSuccess(true)
    } catch (err) {
      console.error("Error during checkout:", err);
      alert("Error during checkout. Please try again.");
    }
  }

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

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
    <>
      <div className="w-full p-4 pb-20">
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
                <span className="text-3xl">{item.product_name}</span>
                <span className="text-3xl">{item.quantity}</span>
                <span className="text-2xl">
                  ₱{item.total_price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 p-2 text-right font-bold text-lg w-full flex justify-end">
        <div className="fixed bottom-0 left-0 w-full flex items-center justify-end gap-10 bg-white border-t border-black py-4 px-10 z-50">
          Total:{" "}
          <span className="text-2xl font-semibold">
            ₱{Number(totalCheckedPrice || 0).toLocaleString()}
          </span>
          {/* <button className="btn btn-primary" onClick={handlesCheckout}>
            Checkout
          </button> */}
          <Button 
            text={"Checkout"}
            onClick={handlesCheckout}
            bgColor={"#80ef80"}
            textColor={"#000000"}
            width={"w-40"}
            height={"h-15"}
          />
        </div>
      </div>

      {showSuccess && 
        <div className="w-screen h-screen bg-transparent fixed">
          <div className="">
            <MessageModal noClose={true} message={"Checkout Successful"} />
          </div>
        </div>
      }
    </>
  );
}
