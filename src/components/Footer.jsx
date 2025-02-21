import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer bg-dark d-flex flex-column py-2">
      <p className="text-center text-white m-0 p-0">
        Made with &#10084; by <strong>Rana</strong>
      </p>

      <p className="text-white m-0 p-0">
        <Link
          className="contact-btn"
          to={`https://wa.me/${import.meta.env.VITE_CONTACT_NUMBER}`}
        >
          <img src="/whatsapp.png" width={20} height={20} alt="" />
          <span className="ms-1 fst-italic">Contact me for any query</span>
        </Link>
      </p>
    </div>
  );
};

export default Footer;
