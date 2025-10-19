import { useContext, useState } from "react";
import { productContext } from "../context/ProductContext";
import add from "../assets/products/addsu.svg";
import minus from "../assets/products/minusu.svg";

export default function AddToCartModal() {
  const { addToCart, showAddModal, setShowAddModal } = useContext(productContext);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(addToCart.price);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[10000] flex justify-center items-center">
        <div className="bg-white w-1/3 rounded-xl shadow-lg flex flex-col items-center px-5 py-10">
          <div className="w-full flex justify-end">
            <button className="" 
                onClick={() => {
                    setShowAddModal(!showAddModal)
                    setQuantity(0)
                    setTotalPrice(null)
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
              <button className="!btn !btn-success mt-5">
                Checkout
              </button>
          </div>
        </div>
      </div>
    </>
  );
}
