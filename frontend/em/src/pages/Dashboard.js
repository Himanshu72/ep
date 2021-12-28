import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { getAccounts, isUserLogin } from "../store/store";
import { observer } from "mobx-react-lite";
import { get } from "mobx";
import api, { createExpenses, deleteExp } from "../utility/api";

function Dashboard() {
  const [showAddExp, setShowAddExp] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(Date.now());
  const [type, setType] = useState("CREDIT");
  const [cato, setCato] = useState(getAccounts().getAccount().category[0]);
  const navigate = useNavigate();
  const setDefault = () => {
    setName("");
    setAmount(0);
    setDate(Date.now());
    setType("CREDIT");
    setCato(getAccounts().getAccount().category[0]);
  };

  useEffect(() => {
    if (isUserLogin().status == false) navigate("/login");
  }, []);

  const createExp = async () => {
    console.log(name, amount, date, type, cato);
    let obj = {
      amount: amount,
      type: type,
      createAt: date,
      category: cato,
      name: name,
    };
    await createExpenses(obj);
    console.log(getAccounts().getAccount());
    setDefault();
    setShowAddExp(false);
  };

  const delExp = (e) => {
    deleteExp(e.target.value);
  };
  const view = (e) => {
    navigate(`/expense/${e.target.value}`);
  };

  return (
    <div>
      <Container style={{ padding: "2%" }}>
        <h2>Dashboard:{getAccounts().getAccount().account} </h2>
        <br />
        <h4>
          <Button variant="success" onClick={() => setShowAddExp(true)}>
            Add Expenses <FontAwesomeIcon icon={faPlus} />
          </Button>
        </h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Rs</th>
              <th>Category</th>
              <th>CreatedAt</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getAccounts()
              .getAccount()
              .expenese.map((ele, ind) => (
                <tr>
                  <td>{ind + 1}</td>
                  <td>{ele.name}</td>
                  <td>
                    Rs<span>{ele.amount}</span>
                  </td>
                  <td>{ele.category}</td>
                  <td>{ele.createAt}</td>
                  <td>{ele.type}</td>
                  <td>
                    <Button variant="warning" value={ele._id}>
                      Edit
                    </Button>{" "}
                    &nbsp;
                    <Button
                      variant="danger"
                      onClick={(e) => delExp(e)}
                      value={ele._id}
                    >
                      Delete
                    </Button>
                    &nbsp;
                    <Button
                      variant="primary"
                      onClick={(e) => view(e)}
                      value={ele._id}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Modal show={showAddExp}>
          <Modal.Header closeButton>
            <Modal.Title>Expenses</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  minLength={2}
                  required="true"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Amount"
                  min={0}
                  required="true"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Date"
                  required="true"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Select Type</Form.Label>
                <Form.Select onChange={(e) => setType(e.target.value)}>
                  <option value="CREDIT" className="text-success">
                    CREDIT
                  </option>
                  <option value="DEBIT" className="text-danger">
                    EXPENSE
                  </option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Select Category</Form.Label>
                <Row>
                  <Col xs={9}>
                    <Form.Select onChange={(e) => setCato(e.target.value)}>
                      {getAccounts()
                        .getAccount()
                        .category.map((ele) => (
                          <option value={ele}>{ele}</option>
                        ))}
                    </Form.Select>
                  </Col>
                  <Col xs={3}>
                    <Link to="category">
                      <Button variant="primary" size="sm">
                        Manage Category
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddExp(false)}>
              Close
            </Button>
            <Button variant="dark" onClick={() => createExp()}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
export default observer(Dashboard);
