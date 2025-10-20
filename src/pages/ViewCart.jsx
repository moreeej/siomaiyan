import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../Constants";
import Cookies from "js-cookie";

export default function ViewCart() {
  const [cartItems, setCartItems] = useState([]);

  async function fetchCartItems() {
    try {
      const userId = Cookies.get("userId");
      if (!userId) return;

      const { data } = await axios.get(`${API_URL}/fetchUserCart`, {
        params: { user_id: userId } 
      });

      setCartItems(data);
      console.log("Items are:", data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="w-full h-50 bg-green-400">
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id}>
            {item.product_name} x {item.quantity} - ₱{item.total_price}
          </div>
        ))
      )}
    </div>
  );
}
