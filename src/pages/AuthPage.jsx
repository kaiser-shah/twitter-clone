import { Button, Col, Image, Row, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const loginImage = "https://sig1.co/img-twitter-1";
  const url =
    "https://418e4152-6e7f-49f7-ad91-5ebf853feb81-00-3ghtwiy6ig8a8.pike.replit.dev";
  const [modalShow, setModalShow] = useState(null);
  const handleShowSignUp = () => setModalShow("signUp");
  const handleShowLogin = () => setModalShow("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");

  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate("/profile");
    }
  }, [authToken, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/signup`, { username, password });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/login`, { username, password });
      if (res.data && res.data.auth === true && res.data.token) {
        setAuthToken(res.data.token); // save token to localStorage
        console.log("Login was successful, token saved");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => setModalShow(null);

  return (
    <Row>
      <Col sm={6}>
        <Image src={loginImage} fluid />
      </Col>
      <Col sm={6}>
        <i
          className="bi bi-twitter"
          style={{ fontSize: 50, color: "dodgerblue" }}
        />
        <p className="mt-5" style={{ fontSize: 64 }}>
          Happening Now
        </p>
        <p className="my-5" style={{ fontSize: 32 }}>
          Join Twitter Today.
        </p>
        <Col sm={5} className="d-grid gap-2">
          <Button className="rounded-pill" variant="outline-dark">
            <i className="bi bi-google"></i> Sign up with Google
          </Button>
          <Button className="rounded-pill" variant="outline-dark">
            <i className="bi bi-apple"></i> Sign up with Apple
          </Button>
          <p style={{ textAlign: "center" }}>or</p>
          <Button className="rounded-pill" onClick={handleShowSignUp}>
            Create Account
          </Button>
          <p className={{ fontSize: 12 }}>
            By signing up, vou agree to the Terms of Service and Privacy Policy
            including Cookie Use
          </p>

          <p className="mt-5" style={{ fontWeight: "bold" }}>
            {" "}
            Already have an account?
          </p>
          <Button
            className="rounded-pill"
            variant="outline-primary"
            onClick={handleShowLogin}
          >
            Sign In
          </Button>
        </Col>
        <Modal
          show={modalShow !== null}
          onHide={handleClose}
          animation={false}
          centered
        >
          <Modal.Body>
            <h2 className="mb-4" style={{ fontWeight: "bold" }}>
              {modalShow === "signUp"
                ? "Create your account"
                : "Log in you your account"}
            </h2>
            <Form
              className="d-grid gap-2 px-5"
              onSubmit={modalShow === "signUp" ? handleSignUp : handleLogin}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                />
              </Form.Group>

              <p style={{ fontSize: "12px" }}>
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use. SigmaTweets may use your contact
                information, including your email address and phone number for
                purposes outlined in our Privacy Policy, like keeping your
                account seceure and personalising our services, including ads.
                Learn more. Others will be able to find you by email or phone
                number, when provided, unless you choose otherwise here.
              </p>
              <Button className="rounded-pill" type="submit">
                {modalShow === "signUp" ? "Sign Up" : "Log in"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Col>
    </Row>
  );
}
