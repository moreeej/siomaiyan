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
      <div className="grid grid-cols-5 px-20 py-5 gap-5">
        <div className="pl-10">
          <img src={logo_footer} alt="logo footer" />
        </div>

        <div className="flex flex-col gap-3 pl-10">
          <h1>Contact Us</h1>
          <div className="flex gap-2">
            <img src={mail} alt="mail" />
            <p>siomaiyan@gmail.com</p>
          </div>
          <div className="flex gap-2">
            <img src={phone} alt="phone" />
            <p>0956 980 00002</p>
          </div>
          <div className="flex gap-2">
            <img src={location} alt="location" />
            <p>Villa Antonina, Bacoor City, Cavite</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pl-10">
          <h1>Socials</h1>
          <div className="flex gap-2">
            <img src={fb} alt="facebook" />
            <p>Siomai ‘Yan</p>
          </div>
          <div className="flex gap-2">
            <img src={ig} alt="instagram" />
            <p>siomaiyan__</p>
          </div>
          <div className="flex gap-2">
            <img src={yt} alt="youtube" />
            <p>Siomai Yan</p>
          </div>
          <div className="flex gap-2">
            <img src={twitter} alt="twitter" />
            <p>@siomaiyaaan</p>
          </div>
        </div>


        <div className="flex flex-col gap-3 pl-10">
            <h1>Links</h1>
            <p>Home</p>
            <p>Products</p>
            <p>About</p>
            <p>Cart</p>
        </div>


        <div className="flex flex-col gap-3 pt-10">
            <p>Privacy Policy</p>
            <p>Cookie Preferences</p>
            <p>Terms of Service</p>
        </div>
      </div>
    </>
  );
}
