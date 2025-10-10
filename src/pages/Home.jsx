import axios from "axios"
import { useEffect, useState } from "react"
import home_image from "../assets/home/home_image.svg"
import { supabase } from "../supabase"




export default function Home(){

    const [users, setUsers] = useState([])

    async function fetchUsers() {
        try {
            const { data } = await axios.get("http://localhost:8080/api/getUsers");
            setUsers(data)
            
            console.log("the data",data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    }

    const [images, setImage]= useState([])

    async function getImage() {
        const { data, error } = await supabase.from("images").select();

        if (error) {
            console.error("Error fetching images:", error.message);
            return;
        }

        console.log("Fetched images:", data);
        setImage(data);
    }


    useEffect(() => {
        fetchUsers();
        getImage()
    }, []); 

    return(
        <>
            <div className="w-full h-[calc(100svh-120px)] overflow-y-auto px-10 pt-5">
                <img src={home_image} alt="siomaiyan" className="w-full" />
            </div>

            <div>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image.image} />
                    </div>
                ))}
            </div>

        </>
    )
}