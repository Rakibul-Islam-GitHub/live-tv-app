import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation for email and password
    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    try {
      // Send login request to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      // Save the JWT token to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.removeItem("watchedForTwoMinutes");
      // Dispatch login action to Redux store
      dispatch(
        login({
          email: response.data.email,
          token: response.data.token, // You can store user data here as needed
        })
      );
      // Redirect to homepage
      navigate("/");
    } catch (error) {
      // Handle errors (invalid credentials, server error, etc.)
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="text-center">Login</h2>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3 w-100">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/register">Register here</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
