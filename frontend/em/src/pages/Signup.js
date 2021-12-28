import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import signupsvg from "../resources/signup.svg";
import { getUser, isUserLogin, useUser } from "../store/store";
import { createUser } from "../utility/api";
export default function Signup() {
  const [username, setUsername] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [lang, setLang] = useState("hin");
  const [searchParams] = useSearchParams();
  const referralBy = searchParams.get("referralBy");
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLogin().status == true) navigate("/");
  }, []);

  const reset = () => {
    setUsername("");
    setLang("hin");
    setName("");
    setPassword("");
  };

  const Submit = async () => {
    let obj = {
      username: username,
      name: name,
      language: lang,
      password: password,
    };
    if (referralBy) obj.referralBy = referralBy;

    const response = await createUser(obj);
    reset();
    navigate("/login");
  };

  return (
    <div>
      <Container className="md-5" style={{ padding: "2%" }}>
        <h2>Signup</h2>
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Username"
                  type="text"
                  minLength={4}
                  onChange={(e) => setUsername(e.target.value)}
                  required="true"
                />
                <br />
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Name"
                  type="text"
                  minLength={4}
                  onChange={(e) => setName(e.target.value)}
                  required="true"
                />
                <br />
                <Form.Label>Select Language</Form.Label>
                <Form.Select
                  required="true"
                  onChange={(e) => setLang(e.target.value)}
                >
                  <option value={"hin"} selected>
                    Hindi
                  </option>
                  <option value={"guj"}>Gujrati</option>
                  <option value={"mar"}>Marathi</option>
                </Form.Select>

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
                  <Button onClick={Submit} variant="dark">
                    Submit
                  </Button>
                </div>
              </Form.Group>
            </Form>
            <Link to="/login">Already have account ?</Link>
          </Col>
          <Col md={6}>
            <img src={signupsvg} alt="login image" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
