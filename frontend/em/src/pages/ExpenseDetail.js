import React, { useEffect, useState } from "react";
import {
  Container,
  ListGroup,
  Row,
  Col,
  ButtonGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faPrint } from "@fortawesome/free-solid-svg-icons";
import transactionsvg from "../resources/transaction.svg";
import Transaction from "../globalcomponent/Transaction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getExp } from "../utility/api";
import { isUserLogin } from "../store/store";
export default function ExpenseDetail() {
  let [exp, setExp] = useState(null);
  let [split, setSplit] = useState(1);
  let [showSplit, setShowSplit] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLogin().status == false) navigate("/login");
  }, []);

  useEffect(async () => {
    let data = await getExp(id);
    setExp(data[0]);
  }, []);
  console.log(exp);

  const splitw = () => {
    setShowSplit(true);
  };
  const copy = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/bill/${id}?split=${split}`
    );
  };
  return (
    <Container style={{ margin: "2%" }}>
      <Row>
        <Col md={8}>
          <Transaction
            title="Bill"
            name={exp ? exp.name : ""}
            amount={exp ? parseInt(exp.amount) : ""}
            type={exp ? exp.type : ""}
            category={exp ? exp.category : ""}
            date={exp ? exp.createAt : ""}
          />
          <br />
          <Button variant="dark" onClick={() => splitw()}>
            <FontAwesomeIcon icon={faShare} color="white" /> Share And Split
          </Button>
          &nbsp;
          <Link to={`/bill/${id}`}>
            <Button variant="dark">
              <FontAwesomeIcon icon={faPrint} color="white" /> Print
            </Button>
          </Link>
        </Col>
        <Col md={4}>
          <img src={transactionsvg} alt="display image" />
        </Col>
      </Row>

      <Modal show={showSplit}>
        <Modal.Header closeButton>
          <Modal.Title>Share Bill</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Split Into</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Number Of People"
                defaultValue={1}
                onChange={(e) => setSplit(e.target.value)}
                min={1}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSplit(false)}>
            Close
          </Button>
          <Link to={`/bill/${id}?split=${split}`}>
            <Button variant="dark" onClick={() => copy()}>
              Copy Share Link
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
