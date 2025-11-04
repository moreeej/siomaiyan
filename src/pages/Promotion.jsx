import { useEffect, useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { API_URL } from "../../Constants";
import Footer from "../components/Footer";




export default function Promotion() {

    const [loading, setIsloading] = useState(false)
    const [products, setProducts] = useState([])

      async function fetchProducts() {
        setIsloading(true);
        try {
        const { data } = await axios.get(`${API_URL}/getProductWithLimit`);
        setProducts(data);
        console.log("the products", data);
        } catch (err) {
        console.error("Error fetching products with limit:", err);
        } finally {
        setIsloading(false);
        }
        }

        useEffect(() => {
            fetchProducts()
        }, [])
  return (
    <>
      <div className="w-full px-20 py-10">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold">Promotion</h1>
          <span className="block border-b-2 border-red-500 w-80 mt-2"></span>
        </div>

        <div className="w-full bg-[#1e1e1e] mt-10 p-10 rounded-2xl">
            <div className="w-full h-auto flex justify-between items-center">
                <h1 className="!text-white">Business Bundle Promo</h1>
                <Button 
                    width={"w-40"}
                    height={"h-15"}
                    bgColor={"#f94449"}
                    textColor={"#000000"}
                    text={"Inquire"}
                />
            </div>
            <div className="ml-5">
                <p className="!text-white">Buy this starter bundle for only ₱999 and get drink powder (Chocolate or Gulaman) save 200 pesos off!</p>
            </div>

            <div className="w-full flex justify-evenly items-center mt-10">
                {products.map((prod) => (
                    <div className="!bg-white rounded-xl overflow-hidden">
                        <img src={prod.image} alt="prod" className="w-80" />
                    </div>
                ))}
            </div>
        </div>





        <div className="w-full bg-[#1e1e1e] mt-10 p-10 rounded-2xl">
            <div className="w-full h-auto flex justify-between items-center">
                <h1 className="!text-white">Starter Package Promo</h1>
                <Button 
                    width={"w-40"}
                    height={"h-15"}
                    bgColor={"#f94449"}
                    textColor={"#000000"}
                    text={"Inquire"}
                />
            </div>
            <div className="ml-5">
                <p className="!text-white">First-time buyers get FREE 1 Pack (50 pcs) with every purchase of 10 packs!”</p>
            </div>

            <div className="w-full flex justify-evenly items-center mt-10">
                <div className="w-full h-80">

                </div>
            </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
