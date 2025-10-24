import about_image from "../assets/about/about_image.png"
import Footer from "../components/Footer"

export default function About(){


    const about_data = [
        {
            title: "Our Mission",
            content: "“At Siomai ‘Yan, our mission is to empower food entrepreneurs and resellers by providing consistent, delicious, and affordable siomai varieties—pork, chicken, beef, and more—along with reliable delivery and service. We are committed to supporting small businesses, ensuring customer satisfaction, and sustaining growth in the thriving Filipino food industry while upholding the spirit of ‘Ang Siomai ng Bayan.”"
        },
        {
            title: "Our Vision",
            content: "“To be the leading wholesale siomai distributor in the Philippines, trusted by entrepreneurs and food businesses nationwide for delivering affordable, high-quality, and flavorful siomai that brings people together and creates profitable opportunities for every Filipino.”"
        },
        {
            title: "Company Background – Siomai ‘Yan!",
            content: "Founded in 2020, Siomai ‘Yan! began as a humble street food venture offering Filipino favorites such as fishball, kikiam, fries, and refreshing drinks, with siomai as its star product. Despite challenges during the pandemic, the business found new success after relocating to Cavite, attracting more customers and expanding operations. Driven by innovation, Siomai ‘Yan! has since embraced technology—introducing an inventory system in 2022, a financial tracker in 2023, and now a website for convenient online ordering. Today, Siomai ‘Yan! continues its mission to deliver affordable, high-quality siomai and street food to more Filipinos, staying true to its tagline: “Ang Siomai ng Bayan.”"
        }
    ]

    return(
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="w-full px-20 mt-5">
                    <img src={about_image} alt="siomaiyan" className="w-full h-[90vh]" />
                </div>
                

                {about_data.map((data) => (
                    <div className="w-full flex flex-col mt-10 mb-20 px-10 justify-center items-center">
                        <h1 className="!text-[#F70909] !text-[100px]">{data.title}</h1>
                        <p className="!text-2xl mt-5">{data.content}</p>
                    </div>
                ))}
            </div>

            <Footer />
        </>
    )
}