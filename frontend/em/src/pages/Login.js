import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import loginsvg from "../resources/login.svg";
import { loadAccount, login } from "../utility/api";
import { isUserLogin, getUser, getAccounts } from "../store/store";
export default function Login() {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLogin().status == true) navigate("/");
  }, []);

  const Submit = async () => {
    let res = await login(username, password);
    let user = res.user;
    user.token = res.token;
    user.username = user._id;
    let data = getUser(user);
    await loadAccount(data.accounts);
    console.log("l=>", getAccounts().accounts);
    isUserLogin().setStatus(true);
    navigate("/");
  };

  return (
    <div>
      <Container className="md-5" style={{ padding: "2%" }}>
        <h2>Login</h2>
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="username"
                  minLength={4}
                  required="true"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  minLength={4}
                  type="password"
                  placeholder="password"
                  required="true"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <div className="text-center">
                  <Button variant="dark" onClick={Submit}>
                    Submit
                  </Button>
                </div>
              </Form.Group>
            </Form>
            <Link to="/signup">not have account?</Link>
          </Col>
          <Col md={6}>
            <img src={loginsvg} alt="login image" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
