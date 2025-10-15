import axios from "axios"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { API_URL } from "../../Constants"



export default function Products(){

    const [products, getProducts] = useState([])

    async function fetchProducts(){
        try{
            const {data} = await axios.get(`${API_URL}/getProducts`)
            getProducts(data)
            console.log("products are:", data);
            
        }
        catch(err){
            console.error("Error fetching users:", err);
            
        }
    }


    useEffect(() => {
        fetchProducts()
    }, [])
    return(
        <>

            <div className="flex flex-col items-center">
                <h1 className="text-white text-2xl font-semibold">Products</h1>
                <span className="block border-b-2 border-red-500 w-80 mt-2"></span>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-5 py-10 mt-5">
                {products.map((product, index) => (
                    <div key={index} className="bg-white overflow-hidden rounded-2xl flex flex-col p-2">
                        <img src={product.image} alt={product.product_name} className="w-80" />
                        <h1 className="!text-black !text-3xl font-bold">{product.product_name}</h1>
                        <p className="text-red-500">{product.category}</p>
                        <div className="flex justify-between">
                            <p className="text-black">{product.quantity} pcs.</p>
                            <p className="text-black text-2xl font-bold">₱{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    )
}