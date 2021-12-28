import React from "react";
import { ListGroup } from "react-bootstrap";

export default function Transaction(props) {
  return (
    <ListGroup as="ul">
      <ListGroup.Item as="li" active>
        {props.title}
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <i>Name :</i>
        <b>{props.name}</b>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <i>Amount : </i>
        <b>Rs {props.amount}</b>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <i>Type : </i>
        <b>{props.type}</b>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <i>Catagaroy : </i>
        <b>{props.category}</b>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <i>CreatedAt :</i>
        <b>1{props.date}</b>{" "}
      </ListGroup.Item>
    </ListGroup>
  );
}
