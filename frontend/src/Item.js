import React from "react";
import { ListGroupItem, Row, Col, Button } from "reactstrap";
import { roundToTwo } from "./APIFunctions";

function Item(props) {
  const { itemName, price,
    description, itemID, image } = props.item;
  let renderedImage = "https://upload.wikimedia.org/" +
    "wikipedia/commons/a/ac/No_image_available.svg";
  try {
    renderedImage = require(`./Images/${image}`);
  } catch (error) { }

  return (
    <ListGroupItem key={itemID}>
      <div style={{ display: "inline-block", width: "90%" }}>
        <div style={{ float: "left" }}>
          <Row>
            <h3>{itemName}</h3>
          </Row>
          <Row>
            <Col>
              <img
                src={renderedImage}
                alt={`${itemName}`}
                style={{ width: "30rem" }} />
            </Col>
            <Col>
              <p>Price: ${roundToTwo(price)}</p>
              {props.children}
            </Col>
            <Col>
              <p style={{ fontStyle: "italic" }}> Description: {description}</p>
              {!props.cartPage ?
                <Button onClick={() => props.handleAddToCart(props.item)}>
                  Add to cart
                </Button> :
                <p>Quantity: {props.item.quantity}</p>}
            </Col>
          </Row>
        </div>
      </div>
    </ListGroupItem>
  );
}

export default Item;
