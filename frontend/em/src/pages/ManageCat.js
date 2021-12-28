import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import listsvg from "../resources/list.svg";
import { getAccounts, isUserLogin } from "../store/store";
import { addCatagory, deleteCat } from "../utility/api";
function ManageCat() {
  const [cat, setCat] = useState(undefined);
  const addCat = () => {
    addCatagory(cat);
    setCat("");
  };

  const delCat = (e) => {
    deleteCat(e.target.value);
  };

  const editCat = (e) => {};

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLogin().status == false) navigate("/login");
  }, []);

  return (
    <Container style={{ margin: "2%" }}>
      <Row>
        <Col md={6}>
          <Form>
            <Row style={{ textAlign: "left" }}>
              <Col xs={8}>
                <Form.Control
                  minLength={3}
                  type="text"
                  placeholder="Insert Category"
                  required="true"
                  onChange={(e) => setCat(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Button variant="success" onClick={() => addCat()}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getAccounts()
                .getAccount()
                .category.map((ele, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{ele}</td>
                    <td>
                      <Button
                        variant="warning"
                        value={ele}
                        onClick={(e) => editCat(e)}
                      >
                        Edit
                      </Button>{" "}
                      &nbsp;
                      <Button
                        variant="danger"
                        value={ele}
                        onClick={(e) => delCat(e)}
                      >
                        Delete
                      </Button>
                      &nbsp;
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <img src={listsvg} alt="Display Image" />
        </Col>
      </Row>
    </Container>
  );
}
export default observer(ManageCat);
