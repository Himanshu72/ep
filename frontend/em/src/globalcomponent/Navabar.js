import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faUser,
  faPlus,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";
import { isUserLogin, getUser, getAccounts } from "../store/store";
import { observer } from "mobx-react-lite";
import CreateAccountModel from "./CreateAccountModel";
import { createAccount } from "../utility/api";
function Navabar() {
  const [showCreate, setShowCreate] = useState(false);
  const [account, setAccount] = useState("");
  const setDefault = () => {
    setAccount("");
    setShowCreate(false);
  };

  const createAcc = () => {
    createAccount({
      account: account,
    });
    setDefault();
  };

  const activeAccount = (e) => {
    getAccounts().setActive(e.target.value);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand>ExpenseManager </Navbar.Brand>
        </Link>
        {isUserLogin().status && (
          <Nav>
            <Navbar.Collapse className="justify-content-end">
              <FontAwesomeIcon icon={faUser} color="white" />
              <NavDropdown title="Accounts" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setShowCreate(true)}>
                  Create Account
                  <FontAwesomeIcon icon={faPlus} color="green" />
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <Form.Select
                  onChange={(e) => activeAccount(e)}
                  aria-label="Default select example"
                >
                  {getAccounts().setActive(getAccounts().accounts[0]._id)}
                  {getAccounts().accounts.map((ele) => (
                    <option key={ele._id} value={ele._id}>
                      {ele.account}
                    </option>
                  ))}
                </Form.Select>
                <NavDropdown.Divider />
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={getUser().getLang()}
                />
              </NavDropdown>
            </Navbar.Collapse>
            <Nav.Link>
              <Link
                style={{ color: "#8aa", textDecoration: "none" }}
                to="/referral"
              >
                {" "}
                <FontAwesomeIcon
                  icon={faNetworkWired}
                  color="white"
                /> Referral{" "}
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Button variant="danger" size="sm">
                Logout
              </Button>
            </Nav.Link>
          </Nav>
        )}
        <Modal show={showCreate}>
          <Modal.Header closeButton>
            <Modal.Title>New Account</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Account Name"
                  minLength={3}
                  required="true"
                  onChange={(e) => setAccount(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreate(false)}>
              Close
            </Button>
            <Button variant="dark" onClick={() => createAcc()}>
              Insert
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Navbar>
  );
}
export default observer(Navabar);
