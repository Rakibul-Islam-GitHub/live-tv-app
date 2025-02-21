import PropTypes from "prop-types"; // Import PropTypes
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link for navigation

const LoginModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static" // Prevent closing when clicking outside
      keyboard={false} // Disable keyboard interaction (ESC)
      centered
    >
      <Modal.Header>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You have been watching for 2 minutes. Please log in or register to
          continue watching.
        </p>
        <p>
          It is required because of stop spamming. If you face any issues,
          please
          <Link
            className="fw-bold contact-btn fst-italic"
            target="_blank"
            to={`https://wa.me/${import.meta.env.VITE_CONTACT_NUMBER}`}
          >
            {" "}
            contact me
            <img
              className="ms-1"
              src="whatsapp.png"
              width={15}
              height={15}
              alt=""
            />
          </Link>
        </p>

        <p>
          <strong>
            <Link className="login-reg-btn" to={"/login"}>
              Login
            </Link>
          </strong>{" "}
          or{" "}
          <strong>
            <Link className="login-reg-btn" to="/register">
              Register
            </Link>
          </strong>{" "}
          to continue.
        </p>

        <div>
          {/* <Button variant="primary" as={Link} to="/login" onClick={onHide}>
            Login
          </Button>
          <Button variant="secondary" as={Link} to="/register" onClick={onHide}>
            Register
          </Button> */}
        </div>
      </Modal.Body>
    </Modal>
  );
};

// PropTypes validation
LoginModal.propTypes = {
  show: PropTypes.bool.isRequired, // 'show' is a boolean and is required
  onHide: PropTypes.func.isRequired, // 'onHide' is a function and is required
};

export default LoginModal;
