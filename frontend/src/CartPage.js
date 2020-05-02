import React from "react";
import {
  getCartItems, getCartItemsByID,
  removeFromCart, addToCart
} from "./APIFunctions";
import { Button } from "reactstrap";
import QuantityButtons from "./QuantityButtons";
import Item from "./Item";
import { Cookies } from "react-cookie";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      total: 0,
      cookies: new Cookies()
    };
  }

  componentDidMount() {
    this.renderCartItems();
  }

  renderCartItems = async () => {
    let items = await getCartItems(this.state.cookies.get("accountID"));
    let databaseResponse = await getCartItemsByID(items);
    this.setState({
      cartItems: databaseResponse,
    });
    this.getTotal(databaseResponse);
  }

  getTotal = (items) => {
    let cartTotal = 0;
    items.forEach(function (item) {
      cartTotal += item.quantity * item.price;
    });
    this.setState({
      total: cartTotal.toFixed(2)
    });
  }

  handleAdd = async (item) => {
    await addToCart(this.state.cookies.get("accountID"), item.itemID, 1);
    let tempItems = this.state.cartItems;
    tempItems.find((x) => x.itemID === item.itemID).quantity += 1;
    this.setState({
      cartItems: tempItems,
      total: parseFloat(parseFloat(this.state.total) + item.price)
        .toFixed(2)
    });
  }

  handleRemove = async (item) => {
    await removeFromCart(this.state.cookies.get("accountID"), item.itemID, 1);
    let tempItems = this.state.cartItems;
    if (item.quantity === 1) {
      tempItems = tempItems.filter((x) => x.itemID !== item.itemID);
    } else {
      tempItems.find((x) => {
        if (x.itemID === item.itemID)
          x.quantity -= 1;
        return true;
      });
    }
    this.setState({
      cartItems: tempItems,
      total: parseFloat(parseFloat(this.state.total) - item.price)
        .toFixed(2)
    });
  }

  renderButtonOrMessage = () => {
    if (this.state.cartItems.length) {
      return (
        <Button onClick={this.submitCart} size="lg">
          Submit
        </Button>
      );
    } else {
      return (
        <h4>
          Your cart is empty.
        </h4>
      );
    }
  }

  submitCart = () => {
    this.props.history.push("/payment");
  }

  render() {
    return (
      <div>
        <h1>{this.state.cartItems.length ?
          `Total: $${this.state.total}` : ""}</h1>
        {this.state.cartItems && this.state.cartItems.map((item, index) => {
          return (
            <Item key={index} item={item}
              children={
                <QuantityButtons
                  item={item}
                  handleAdd={async (item) => await this.handleAdd(item)}
                  handleRemove={async (item) => await this.handleRemove(item)}
                />
              }
              cartPage={true} />
          );
        })}
        {this.renderButtonOrMessage()}
      </div>
    );
  }
}

export default CartPage;