import React from "react";
import {ButtonGroup, Button } from "reactstrap";

function QuantityButtons(props) {
  const quantityButtons = [
    { name: "-", callback: props.handleRemove },
    { name: "+", callback: props.handleAdd }
  ];

  return (
    <ButtonGroup>
      {quantityButtons.map((x, index) => {
        return (
          <Button key={index}
            onClick={() => { x.callback(props.item); }}>
            {x.name}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}

export default QuantityButtons;

