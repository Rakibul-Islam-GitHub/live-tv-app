import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import { Nav, Navbar } from "react-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleLogout = () => {
    // Remove token from localStorage and dispatch logout action
    localStorage.removeItem("token");
    dispatch(logoutUser());
    window.location.reload();
  };

  return (
    <div className="">
      <Navbar bg="dark" variant="dark" expand="lg">
        <div className="container">
          <Navbar.Brand href="/">Live TV App</Navbar.Brand>
          <div className="ml-auto"></div>

          <Nav className="ml-auto ">
            {isAuthenticated ? (
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </div>
      </Navbar>
    </div>
  );
};
export default Header;
