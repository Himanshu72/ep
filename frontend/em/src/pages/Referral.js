import React, { useEffect } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { getUser, isUserLogin } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function Referral() {
  const copy = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/signup?referralBy=${getUser().username}`
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLogin().status == false) navigate("/login");
  }, []);

  return (
    <div>
      <Container style={{ margin: "2%" }}>
        <h3>Referral</h3>
        <Row>
          <Col md={6}>
            <ListGroup as="ul">
              <ListGroup.Item as="li" active>
                You Invited By : {getUser().referralBy}
              </ListGroup.Item>
            </ListGroup>
            <br />
            <ListGroup as="ul">
              <ListGroup.Item as="li" active>
                You Invited
              </ListGroup.Item>
              <ListGroup.Item as="li">Username</ListGroup.Item>
            </ListGroup>
            <br />
            <Button variant="dark" onClick={() => copy()}>
              <FontAwesomeIcon icon={faCopy} color="white" />
              &nbsp;Copy Referral Link
            </Button>
          </Col>
          <Col md={6}></Col>
        </Row>
      </Container>
    </div>
  );
}
