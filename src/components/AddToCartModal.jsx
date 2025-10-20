import { useContext, useEffect, useState } from "react";
import { productContext } from "../context/ProductContext";
import add from "../assets/products/addsu.svg";
import minus from "../assets/products/minusu.svg";
import axios from "axios";
import { API_URL } from "../../Constants";
import { userContext } from "../context/UserContext";
import MessageModal from "./MessageModal";

export default function AddToCartModal() {
  const { addToCart, showAddModal, setShowAddModal } =
    useContext(productContext);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(addToCart.price);
  const { userId, currUsername } = useContext(userContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  async function handleAddToCart() {
    const to_add = {
      user_id: userId,
      username: currUsername,
      product_id: addToCart.product_id,
      product_name: addToCart.name,
      product_image: addToCart.image,
      quantity: quantity,
      total_price: totalPrice,
    };

    const data = axios.post(`${API_URL}/addToCart`, to_add);
    console.log("To add are:", data);
  }

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        setShowAddModal(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[10000] flex justify-center items-center">
        {!showSuccessModal && (
          <div className="bg-white w-1/3 rounded-xl shadow-lg flex flex-col items-center px-5 py-10">
            <div className="w-full flex justify-end">
              <button
                className=""
                onClick={() => {
                  setShowAddModal(!showAddModal);
                  setQuantity(0);
                  setTotalPrice(null);
                }}
              >
                X
              </button>
            </div>
            <img src={addToCart.image} alt={addToCart.name} className="w-100" />
            <h1>{addToCart.name}</h1>
            <div className="w-full flex justify-between px-5">
              <p>Stock: {addToCart.quantity}</p>
              <p>Total: ₱{totalPrice}</p>
            </div>
            <div className="w-full flex gap-8 justify-end mt-3 items-center">
              <button
                onClick={() => {
                  if (quantity > 0) {
                    const newQty = quantity - 1;
                    setQuantity(newQty);
                    setTotalPrice(addToCart.price * newQty);
                  }
                }}
                disabled={quantity === 1}
                className={`${
                  quantity === 1 ? "!bg-gray-300" : "!bg-transparent"
                } !border-none !p-0 !m-0 !outline-none cursor-pointer !rounded-full`}
              >
                <img src={minus} alt="minus" className="w-10" />
              </button>
              <p className="text-4xl">{quantity}</p>
              <button
                onClick={() => {
                  const newQty = quantity + 1;
                  setQuantity(newQty);
                  setTotalPrice(addToCart.price * newQty);
                }}
                className="!bg-transparent !border-none !p-0 !m-0 !outline-none cursor-pointer"
              >
                <img src={add} alt="add" className="w-10" />
              </button>
            </div>

            <div className="w-full flex justify-end">
              <button
                className="!btn !btn-success mt-5"
                onClick={async () => {
                  await handleAddToCart();

                  setShowSuccessModal(true);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        )}

        {showSuccessModal && (
          <div className="w-screen h-screen bg-transparent fixed">
            <div className="">
              <MessageModal noClose={true} message={"Added Successfully"} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
