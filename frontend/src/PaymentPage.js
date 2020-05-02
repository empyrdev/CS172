import React, { useState, useEffect } from "react"; // eslint-disable-next-line
import { getCards, getCartItems, addOrders,getCartItemsByID, getUser, 
  addCard, deleteCard } from "./APIFunctions";
import { useCookies } from "react-cookie";

import "./PaymentPage.css";

function PaymentPage(props) {
  const [cardID, setCardID] = useState(null);
  const [cardIndex, setCardIndex] = useState(null);
  const [disabled, setDisable] = useState(false);
  const [checked, setChecked] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cardState, setCardState] = useState("");
  const [zip, setZip] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [formErrors, setFormErrors] = useState({
    fullname: "",
    email: "",
    address: "",
    city: "",
    cardState: "",
    zip: "",
    cardHolderName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: ""
  });

  const [cookie] = useCookies(["name"]);
  const [cardList, setCardList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState("None");

  useEffect(() => {
    retrieveCardInfo();
    renderCartItems();
    getUserInfo();
    // eslint-disable-next-line
  }, []);

 
  async function getUserInfo() {
    let tempUserInfo = await getUser({ accountID: cookie.accountID });
    tempUserInfo = tempUserInfo[0];
    let addressList = tempUserInfo.address.split(",");
    
    setFullname(tempUserInfo.name.toUpperCase());
    setEmail(tempUserInfo.email.toUpperCase());
    setAddress(addressList[0].toUpperCase());
    setCity(addressList[1].toUpperCase());
    setCardState(addressList[2].split(" ")[1].toUpperCase());
    setZip(addressList[2].split(" ")[2]);
  }

  async function retrieveCardInfo() {
    let tempList = await getCards({ accountID: cookie.accountID });
    tempList = tempList.data;
    setCardList(tempList);
  }

  async function renderCartItems() {
    // put user ID here
    let items = await getCartItems(cookie.accountID);
    //console.log(items);
    setCartItems(await getCartItemsByID(items));
  }

  function getTotal() {
    let total = 0;
    cartItems.forEach(function (item) {
      total += item.quantity * item.price;
    });
    return total;
  }

  function getItemsQuantity() {
    let totalQuantity = 0;
    cartItems.forEach(function (item) {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  }


  const emailRegex =
    RegExp(/^[a-zA-Z0-9.!’*+/=?^_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  const zipRegex = RegExp(/^[0-9]{5}$/);
  const cardNumberRegex = RegExp(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/);
  const expMonthRegex = RegExp(/^(1[0-2]|[1-9]|0[1-9])$/);
  const expYearRegex = RegExp(/^[2-5][0-9]$/);
  const cvvRegex = RegExp(/^[0-9]{3}$/);


  const formValid = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => {
      val.length > 0 && (valid = false);
    });

    Object.values(errors).forEach(val => {
      val === null && (valid = false);
    });

    return valid;
  };


  const handleSubmit = async e => {
    // prevent the form from submit before validate
    e.preventDefault();

    if (formValid(formErrors)&& cardHolderName !== "" && cardNumber !== "" && 
      expMonth !== "" && expYear !== "" && cvv !== "") {

      // if the data is not empty or from the system and the save button is 
      // selected, add a new credit card method
      if(checked && !disabled && cardHolderName !== "" && cardNumber !== "" && 
        expMonth !== "" && expYear !== "" && cvv !== "") {
          
        let data = {accountID: cookie.accountID, cardHolder: cardHolderName,
          CVV: cvv, Zip: zip, cardNumber: cardNumber,
          ExpMonth: expMonth, ExpYear: expYear};
          
        addCard(data);
        alert("New card method is added");
      }
    

      // Add new order
      let orderData = []; // [[itemID, quality], [itemID, quality], ...]

      cartItems.forEach(function (item) {
        orderData.push([item.itemID, item.quantity]);
      });

      addOrders(orderData, cookie.accountID);

      alert("Thank you for shopping with us!!");
      props.history.push("/history");
    }
    else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      alert("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };



  const handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormErrors(formErrors);

    switch (name) {
    case "fullname":
      formErrors.fullname =
        value.length < 3 ? "minimum 3 characaters required" : "";
      setFullname(value);
      break;
    case "email":
      formErrors.email =
        emailRegex.test(value) ? "" : "invalid email address";
      setEmail(value);
      break;
    case "address":
      formErrors.address =
        value.length < 5 ? "minimum 5 characaters required" : "";
      setAddress(value);
      break;
    case "city":
      formErrors.city =
        value.length < 2 ? "minimum 2 characaters required" : "";
      setCity(value);
      break;
    case "cardState":
      formErrors.cardState =
        value.length !== 2 ? "exactly 2 characters required" : "";
      setCardState(value);
      break;
    case "zip":
      formErrors.zip =
        zipRegex.test(value) ? "" : "exactly 5 digits required";
      setZip(value);
      break;
    case "cardHolderName":
      formErrors.cardHolderName =
        value.length < 3 ? "minimum 3 characaters required" : "";
      setCardHolderName(value);
      break;
    case "cardNumber":
      formErrors.cardNumber =
        cardNumberRegex.test(value) ? "" : "invalid card number format";
      setCardNumber(value);
      break;
    case "expMonth":
      formErrors.expMonth =
        expMonthRegex.test(value) ? "" : "A digit(s) between 1-12 required";
      setExpMonth(value);
      break;
    case "expYear":
      formErrors.expYear =
        expYearRegex.test(value) ? "" : "exactly 2 digits required";
      setExpYear(value);
      break;
    case "cvv":
      formErrors.cvv =
        cvvRegex.test(value) ? "" : "exactly 3 digits required";
      setCvv(value);
      break;
    default:
      break;
    }

    setFormErrors(formErrors);
  };



  const handleSelect = e => {
    // console.log(e.target.value);
    // console.log(cardList);
    setSelectedCard(e.target.value);
    if (e.target.value === "None") {
      setCardHolderName("");
      setCardNumber("");
      setExpMonth("");
      setExpYear("");
      setCvv("");
      setDisable(false);
      setChecked(false);
    }
    else {
      for (let index in cardList) {
        if (cardList[index].CardNumber === e.target.value) {
          setCardHolderName(cardList[index].CardHolder.toUpperCase());
          setCardNumber("****-****-****-" + 
                        cardList[index].CardNumber.split("-")[3]);
          setExpMonth(cardList[index].ExpMonth);
          setExpYear(cardList[index].ExpYear);
          setCvv(cardList[index].CVV);

          formErrors.cardHolderName="";
          formErrors.cardNumber="";
          formErrors.expMonth="";
          formErrors.expYear="";
          formErrors.cvv="";
          setFormErrors(formErrors);
          
          setCardIndex(index);
          setCardID(cardList[index].cardID);
          setDisable(true);
          setChecked(true);
        }
      }
    }

  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  // function inside of component
  function handleClickItem(itemID) {
    props.history.push(`/item/${itemID}`);
  }

  function handleClickCart() {
    props.history.push("/cart");
  }

  function handleRemoveCard(){
    setSelectedCard("None");
    let data = {
      accountID: cookie.accountID,
      cardID: cardID
    };
    setCardHolderName("");
    setCardNumber("");
    setExpMonth("");
    setExpYear("");
    setCvv("");
    setDisable(false);
    setChecked(false);
    cardList.splice(cardIndex, 1);
    deleteCard(data);
  }

  return (
    <div className="form-wrapper-payment">
      <div className="row">
        <div className="col-75">
          <div className="mycontainer">
            <form onSubmit={handleSubmit} noValidate>

              <div className="row">
                <div className="col-50">
                  <h3>Billing Address</h3>
                  <div align="center">
                    <label htmlFor="fullname"> Full Name</label>
                    <input
                      className={formErrors.fullname.length > 0
                        ? "error"
                        : "payment-input"}
                      id="payment-input"
                      type="text"
                      value={fullname}
                      name="fullname"
                      noValidate
                      onChange={handleChange}
                    />
                    {formErrors.fullname.length > 0 &&
                      (<span className="errorMessage">
                        {formErrors.fullname}
                      </span>)}
                  </div>
                  <div align="center">
                    <label htmlFor="email">Email</label>
                    <input
                      className={formErrors.email.length > 0
                        ? "error"
                        : "payment-input"}
                      id="payment-input"
                      type="text"
                      name="email"
                      value={email}
                      noValidate
                      onChange={handleChange}
                    />
                    {formErrors.email.length > 0 &&
                      (<span className="errorMessage">
                        {formErrors.email}
                      </span>)}
                  </div>
                  <div align="center">
                    <label htmlFor="adr">Address</label>
                    <input
                      className={formErrors.address.length > 0
                        ? "error"
                        : "payment-input"}
                      id="payment-input"
                      type="text"
                      name="address"
                      value={address}
                      noValidate
                      onChange={handleChange} />
                    {formErrors.address.length > 0 &&
                      (<span className="errorMessage">
                        {formErrors.address}
                      </span>)}
                  </div>
                  <div align="center">
                    <label htmlFor="city">City</label>
                    <input
                      className={formErrors.city.length > 0
                        ? "error"
                        : "payment-input"}
                      id="payment-input"
                      type="text"
                      name="city"
                      value={city}
                      noValidate
                      onChange={handleChange} />
                    {formErrors.city.length > 0 &&
                      (<span className="errorMessage">
                        {formErrors.city}</span>)}
                  </div>

                  <div className="row">
                    <div className="col-50">
                      <div align="center">
                        <label htmlFor="state">State</label>
                        <input
                          className={formErrors.cardState.length > 0
                            ? "error"
                            : "payment-input"}
                          id="payment-input"
                          type="text"
                          name="cardState"
                          value={cardState}
                          noValidate
                          onChange={handleChange} />
                        {formErrors.cardState.length > 0 &&
                          (<span className="errorMessage">
                            {formErrors.cardState}
                          </span>)}
                      </div>
                    </div>
                    <div className="col-50">
                      <div align="center">
                        <label htmlFor="zip">Zip</label>
                        <input
                          className={formErrors.zip.length > 0
                            ? "error"
                            : "payment-input"}
                          id="payment-input"
                          type="number"
                          name="zip"
                          value={zip}
                          noValidate
                          onChange={handleChange} />
                        {formErrors.zip.length > 0 &&
                          (<span className="errorMessage">
                            {formErrors.zip}
                          </span>)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-50" align="center">
                  <h3>Payment</h3>
                  <label htmlFor="fname">Accepted Cards</label>
                  <div className="icon-container">
                    <i style={{ color: "green" }}>visa</i>
                    <i style={{ color: "blue" }}>mastercard</i>
                    <i style={{ color: "red" }}>discover</i>
                  </div>
                  <div align="center">
                    <label htmlFor="cname">Card Holder Name</label>
                    <input
                      className={formErrors.cardHolderName.length > 0
                        ? "error"
                        : "payment-input"}
                      id="payment-input"
                      type="text"
                      name="cardHolderName"
                      placeholder="John More Doe"
                      value={cardHolderName}
                      disabled={disabled}
                      noValidate
                      onChange={handleChange} />
                    {formErrors.cardHolderName.length > 0 &&
                      (<span className="errorMessage">
                        {formErrors.cardHolderName}
                      </span>)}
                  </div>
                  <div align="center">
                    <label htmlFor="ccnum">Credit card number</label>
                    <input
                      className={formErrors.cardNumber.length > 0
                        ? "error"
                        : "payment-input"}
                      id="payment-input"
                      type="text"
                      name="cardNumber"
                      placeholder="1111-2222-3333-4444"
                      value={cardNumber}
                      disabled={disabled}
                      noValidate onChange={handleChange} />
                    {formErrors.cardNumber.length > 0 &&
                      (<span className="errorMessage">
                        {formErrors.cardNumber}</span>)}
                  </div>
                  <select
                    value={selectedCard}
                    className={disabled ? "select-input" : "payment-input"} 
                    onChange={handleSelect}>
                    <option value="None">
                      Select saved options (if exist)
                    </option>
                    {cardList && cardList.map((item, index) => {
                      return (
                        <option key={index} value={item.CardNumber}>
                          {"****-****-****-" + item.CardNumber.split("-")[3]}
                        </option>
                      );
                    })}
                  </select>
                  {disabled ? 
                    <button onClick={handleRemoveCard}>Delete</button> : ""}

                  <div align="center">
                    <label htmlFor="expmonth">Exp Month</label>
                    <input
                      className={formErrors.expMonth.length > 0
                        ? "error"
                        : "payment-input"}
                      id="payment-input"
                      type="text"
                      name="expMonth"
                      placeholder="01"
                      value={expMonth+""}
                      disabled={disabled}
                      noValidate
                      onChange={handleChange} />
                    {formErrors.expMonth.length > 0 &&
                      (<span className="errorMessage">
                        {formErrors.expMonth}
                      </span>)}
                  </div>

                  <div className="row">
                    <div className="col-50">
                      <div align="center">
                        <label htmlFor="expYear">Exp Year</label>
                        <input
                          className={formErrors.expYear.length > 0
                            ? "error"
                            : "payment-input"}
                          id="payment-input"
                          type="text"
                          name="expYear"
                          placeholder="20"
                          value={expYear+""}
                          disabled={disabled}
                          noValidate
                          onChange={handleChange} />
                        {formErrors.expYear.length > 0 &&
                          (<span className="errorMessage">
                            {formErrors.expYear}
                          </span>)}
                      </div>
                    </div>
                    <div className="col-50">
                      <div align="center">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          className={formErrors.cvv.length > 0
                            ? "error"
                            : "payment-input"}
                          id="payment-input"
                          type="text"
                          name="cvv"
                          placeholder="352"
                          disabled={disabled}
                          value={cvv+""}
                          noValidate
                          onChange={handleChange} />
                        {formErrors.cvv.length > 0 &&
                          (<span className="errorMessage">
                            {formErrors.cvv}
                          </span>)}
                      </div>
                    </div>
                  </div>
                  {disabled ? "" :
                    <label >
                      <input type="checkbox" 
                        name="sameadr" 
                        onChange={handleCheck}/>
                      Save Payment Method
                    </label>
                  }
                </div>

              </div>
              <button type="submit" className="paymentbtn" >
                Submit Order
              </button>
            </form>
          </div>
        </div>

        <div className="col-25" align="left">
          <div className="mycontainer">
            <h4>
              <button 
                className="button-style" 
                onClick={() => handleClickCart()}>Cart</button>
              <span className="price" style={{ color: "black" }}>
                <i className="fa fa-shopping-cart"></i>
                <b>{getItemsQuantity()}</b>
              </span>
            </h4>
            {cartItems && cartItems.map((item, index) => {
              return (
                <p key={index}>
                  <button 
                    className="button-style" 
                    onClick={() => handleClickItem(item.itemID)}>
                    {item.itemName}
                  </button>
                  <span className="price">
                    {item.quantity} X ${item.price.toFixed(2)}
                  </span>
                </p>
              );
            })}
            <hr />
            <p>Total
              <span className="price" style={{ color: "black" }}>
                <b>${getTotal().toFixed(2)}</b>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

}


export default PaymentPage;