import axios from "axios";
import { useEffect, useState } from "react";
import home_image from "../assets/home/home_image.png";
import location1 from "../assets/home/location1.svg";
import location2 from "../assets/home/location2.svg";
import message_image from "../assets/home/messages_image.svg";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { API_URL } from "../../Constants";



export default function Home() {
  // const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  // async function fetchUsers() {
  //   try {
  //     const { data } = await axios.get(`${API_URL}/getUsers`);
  //     setUsers(data);

  //     console.log("the data", data);
  //   } catch (err) {
  //     console.error("Error fetching users:", err);
  //   }
  // }

  async function fetchProducts() {
    try {
      const { data } = await axios.get(`${API_URL}/getProductWithLimit`);
      setProducts(data);

      console.log("the products", data);
    } catch (err) {
      console.error("Error fetching products with limit:", err);
    }
  }

  useEffect(() => {
    // fetchUsers();
    fetchProducts();
  }, []);

  const inputs = [
    {
      name: "Full Name",
      type: "text",
    },
    {
      name: "Email Address",
      type: "email",
    },
    {
      name: "Subject",
      type: "text",
    },
    {
      name: "Message",
      type: "text",
    },
  ];

  return (
    <>
      <div className="w-full">
        <div className="w-full px-20 mt-5">
          <img src={home_image} alt="siomaiyan" className="w-full h-[90vh]" />
        </div>

        <div className="w-full px-20 mt-3">
          <div className="w-full bg-[#352e32] flex flex-col justify-center items-center py-5 rounded-2xl">
            <div className="flex flex-col items-center">
              <h1 className="text-white text-2xl font-semibold">Products</h1>
              <span className="block border-b-2 border-red-500 w-80 mt-2"></span>
            </div>

            <div className="w-full flex justify-evenly my-5">
              {products.map((products, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden"
                >
                  <img
                    src={products.image}
                    alt={products.name}
                    className="w-70"
                  />
                </div>
              ))}
            </div>
            
            <Button 
              width={"w-40"}
              height={"h-15"}
              color={"#000000"}
              text={"See All"}
            />
          </div>
        </div>

        <div className="w-full px-20 mt-5">
          <div className="w-full h-full rounded-xl">
            <div className="flex justify-center items-center flex-col w-full bg-[#352e32] rounded-2xl py-5">
              <div className="flex flex-col items-center">
                <h1 className="text-white text-2xl font-semibold">Locations</h1>
                <span className="block border-b-2 border-red-500 w-80 mt-2"></span>
              </div>

              <div className="w-full flex justify-evenly mt-5">
                <div className="flex flex-col justify-center items-center">
                  <img src={location1} alt="location 1" className="w-150" />
                  <p className="text-2xl font-bold mt-5">
                    Villa Antonina / Holy Trinity Parish
                  </p>
                  <p>San Nicolas 2, Bacoor City, Cavite</p>
                  <p className="font-bold text-2xl mt-8">Sundays</p>
                  <p>9:00am - 9:00pm</p>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <img src={location2} alt="location 2" className="w-150" />
                  <p className="text-2xl font-bold mt-5">Cuneta</p>
                  <p>San Nicolas 1, Bacoor City, Cavite</p>
                  <p className="font-bold text-2xl mt-8">
                    Thursdays, Saturdays, and Sundays
                  </p>
                  <p>2:00pm - 9:00pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-5 px-20">
          <div className="w-full bg-[#352e32] flex flex-col rounded-2xl py-5 h-auto">
            <div className="flex flex-col items-center">
              <h1 className="text-white text-2xl font-semibold">Message Us</h1>
              <span className="block border-b-2 border-red-500 w-80 mt-2"></span>
            </div>

            <div className="w-full mt-10 flex justify-evenly px-10 items-center">
              <div className="w-1/2 h-full flex justify-center items-center">
                <img
                  src={message_image}
                  alt="message us"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-[1fr_3fr] gap-4 w-1/2 h-full pl-5">
                {inputs.map((input) => (
                  <>
                    <h1 className="!text-2xl text-white">{input.name}</h1>

                    {input.name === "Message" ? (
                      <textarea
                        className="bg-white border border-black w-full h-70 rounded-md text-black p-3 resize-none"
                        placeholder="Enter your message..."
                      ></textarea>
                    ) : (
                      <input
                        type={input.type}
                        className="bg-white border border-black w-full h-18 rounded-md text-black px-3"
                        placeholder={`Enter your ${input.name.toLowerCase()}`}
                      />
                    )}
                  </>
                ))}
                <div></div>
                <div className="flex justify-end">
                  <Button
                    width={"w-40"}
                    height={"h-15"}
                    text={"Submit"}
                    color={"#FF2B2B"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
