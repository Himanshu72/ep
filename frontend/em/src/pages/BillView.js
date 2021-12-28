import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Transaction from "../globalcomponent/Transaction";
import { isUserLogin } from "../store/store";
import { getExp } from "../utility/api";

export default function BillView() {
  const [searchParams] = useSearchParams();
  let { id } = useParams();
  const split = searchParams.get("split");
  const splitnum = split ? parseInt(split) : 1;
  const [obj, setObj] = useState(null);

  useEffect(async () => {
    let data = await getExp(id);
    setObj(data[0]);
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLogin().status == false) navigate("/login");
  }, []);

  return (
    <Container style={{ margin: "2%" }}>
      <Transaction
        title="Bill"
        name={obj ? obj.name : ""}
        amount={obj ? parseInt(obj.amount) / splitnum : ""}
        type={obj ? obj.type : ""}
        category={obj ? obj.category : ""}
        date={obj ? obj.createdAt : ""}
      />
    </Container>
  );
}
