import { useContext, useEffect, useState } from "react";
import { productContext } from "../context/ProductContext";
import add from "../assets/products/addsu.svg";
import minus from "../assets/products/minusu.svg";
import axios from "axios";
import { API_URL } from "../../Constants";
import { userContext } from "../context/UserContext";
import MessageModal from "./MessageModal";
import Button from "./Button";


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
            <div className="w-full flex justify-end !bg-transparent">
              <button
                className="!bg-black !text-white p-5"
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
            <h1 className="mt-5">{addToCart.name}</h1>
            <div className="w-full flex justify-between px-5 mt-5">
              <p className="text-2xl">Stock: <span className="font-bold">{addToCart.quantity}</span></p>
              <p className="text-2xl">Total: <span className="font-bold">₱{totalPrice}</span></p>
            </div>
            <div className="w-full flex gap-8 justify-end items-center mt-5">
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

            <div className="w-full flex justify-end mt-5">

              <Button 
                text={"Add to cart"}
                bgColor={"#80EF80"}
                textColor={"#000000"}
                onClick={async () => {
                  await handleAddToCart();
                  setShowSuccessModal(true);
                }}
              />
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
