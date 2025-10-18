import logo_footer from "../assets/footer/logo_footer.svg";
import mail from "../assets/footer/mail.svg";
import phone from "../assets/footer/phone.svg";
import location from "../assets/footer/location.svg";
import fb from "../assets/footer/fb.svg";
import ig from "../assets/footer/ig.svg";
import yt from "../assets/footer/yt.svg";
import twitter from "../assets/footer/twitter.svg";

export default function Footer() {
  return (
    <>
      <div className="grid grid-cols-5 px-20 py-5 gap-5 bg-black mt-10">
        <div className="pl-10">
          <img src={logo_footer} alt="logo footer" />
        </div>

        <div className="flex flex-col gap-3 pl-10">
          <h1 className="!text-white">Contact Us</h1>
          <div className="flex gap-2">
            <img src={mail} alt="mail" />
            <p className="!text-white">siomaiyan@gmail.com</p>
          </div>
          <div className="flex gap-2">
            <img src={phone} alt="phone" />
            <p className="!text-white">0956 980 00002</p>
          </div>
          <div className="flex gap-2">
            <img src={location} alt="location" />
            <p className="!text-white">Villa Antonina, Bacoor City, Cavite</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pl-10">
          <h1 className="!text-white">Socials</h1>
          <div className="flex gap-2">
            <img src={fb} alt="facebook" />
            <p className="!text-white">Siomai ‘Yan</p>
          </div>
          <div className="flex gap-2">
            <img src={ig} alt="instagram" />
            <p className="!text-white">siomaiyan__</p>
          </div>
          <div className="flex gap-2">
            <img src={yt} alt="youtube" />
            <p className="!text-white">Siomai Yan</p>
          </div>
          <div className="flex gap-2">
            <img src={twitter} alt="twitter" />
            <p className="!text-white">@siomaiyaaan</p>
          </div>
        </div>


        <div className="flex flex-col gap-3 pl-10">
            <h1 className="!text-white">Links</h1>
            <p className="!text-white">Home</p>
            <p className="!text-white">Products</p>
            <p className="!text-white">About</p>
            <p className="!text-white">Cart</p>
        </div>


        <div className="flex flex-col gap-3 pt-10">
            <p className="!text-white">Privacy Policy</p>
            <p className="!text-white">Cookie Preferences</p>
            <p className="!text-white">Terms of Service</p>
        </div>
      </div>
    </>
  );
}
