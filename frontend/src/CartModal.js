import React, { useState } from "react";
import {
  Button, Modal, ModalHeader,
  ModalBody, ModalFooter, Input
} from "reactstrap";
import QuantityButtons from "./QuantityButtons";
import { addToCart } from "./APIFunctions";
import { useCookies } from "react-cookie";

function CartModal(props) {
  const [count, setCount] = useState(1);
  const [cookies] = useCookies(["name"]);
  const { accountID } = cookies;

  const { price, itemName, quantity, itemID } = props.item;

  function addItemToCart() {
    if(quantity !== 0) {
      addToCart(accountID, itemID, count);
    }
    props.toggle();
  }

  function handleAdd() {
    if (count < quantity)
      setCount(count + 1);
  }

  function handleRemove() {
    if (count > 0)
      setCount(count - 1);
  }

  function handleChange(e) {
    let value = e.target.value;
    if (value > quantity) {
      setCount(quantity);
    } else if (value < 0) {
      setCount(0);
    } else {
      setCount(value);
    }
  }

  return (
    <Modal isOpen={true} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Add to Cart: {itemName}</ModalHeader>
      <ModalBody>
        <h3>Price: ${(count * price).toFixed(2)}</h3>
        <QuantityButtons handleAdd={handleAdd} handleRemove={handleRemove} />
        <Input type="number"
          min={0}
          max={quantity}
          value={count}
          onChange={handleChange} />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={addItemToCart}>
          Add To Cart
        </Button>{" "}
        <Button color="secondary" onClick={props.toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default CartModal;
