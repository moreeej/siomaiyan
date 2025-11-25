import axios from "axios";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../../Constants";
import Spinner from "../components/Spinner";
import add_to_cart from "../assets/products/add_cartsu.svg";
import AddToCartModal from "../components/AddToCartModal";
import { productContext } from "../context/ProductContext";
import { userContext } from "../context/UserContext";
import MessageModal from "../components/MessageModal";


export default function Products() {
  const [products, getProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const { setAddToCart, showAddModal, setShowAddModal } = useContext(productContext);
  const { userId, showMessageModal, setShowMessageModal } = useContext(userContext);
  useEffect(() => {
    if (showMessageModal) {
      const timer = setTimeout(() => {
        setShowMessageModal(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showMessageModal]);


  async function fetchProducts() {
    setLoadingProducts(true);
    try {
      const { data } = await axios.get(`${API_URL}/getProducts`);
      getProducts(data);
      console.log("products are:", data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoadingProducts(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-white text-2xl font-semibold">Products</h1>
        <span className="block border-b-2 border-red-500 w-80 mt-2"></span>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-5 py-10 mt-5">
        {loadingProducts ? (
          <Spinner />
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden rounded-2xl flex flex-col p-4 border-2 border-black"
            >
              <img
                src={product.image}
                alt={product.product_name}
                className="w-80"
              />
              <h1 className="!text-black !text-3xl font-bold">
                {product.product_name}
              </h1>
              <p className="text-red-500">{product.category}</p>
              <div className="flex justify-between">
                <p className="text-black">{product.quantity} pcs.</p>
                <p className="text-black text-2xl font-bold">
                  ₱{product.price}
                </p>
              </div>

              <div className="w-full h-20 flex justify-end">
                <img
                  src={add_to_cart}
                  alt="add"
                  className="w-10 cursor-pointer"
                  onClick={() => {
                    if (userId) {
                      setShowAddModal(!showAddModal);
                      setAddToCart({
                        product_id: product._id,
                        name: product.product_name,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                        quantity: product.quantity,
                      });
                    } else {
                      setShowMessageModal(!showMessageModal);
                    }
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />

      {showAddModal && <AddToCartModal />}
      {showMessageModal && <MessageModal message={"Please Log in First"} noClose={true} />}
    </>
  );
}
