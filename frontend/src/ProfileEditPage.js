import React, { useState, useEffect } from "react";
import { getUser, getNumberOfOrders, getUserByEmail,
  updateUser } from "./APIFunctions";
import { useCookies } from "react-cookie";
import "./ProfilePage.css";
import "./PaymentPage.css";

function ProfileEditPage(props) {
  const [cookie] = useCookies(["name"]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [numOfOrders, setNumOfOrders] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [databasePassword, setDatabasePassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    newPassword: "",
    inputPassword: ""
  });

  const [fullNameTemp, setFullNameTemp] = useState("");
  const [emailTemp, setEmailTemp] = useState("");

  useEffect(() => {
    getUserInfo();
    getUserOrderHistory();
    // eslint-disable-next-line
  }, []);
     
  async function getUserInfo() {
    let tempUserInfo = await getUser({ accountID: cookie.accountID });
    setFullName(tempUserInfo.name);
    setEmail(tempUserInfo.email);
    setPhone(tempUserInfo.cell);
    setAddress(tempUserInfo.address);
    setDatabasePassword(tempUserInfo.password);

    setFullNameTemp(tempUserInfo.name);
    setEmailTemp(tempUserInfo.email);
        
  }

  async function getUserOrderHistory() {
    let numberOfOrders = await getNumberOfOrders(cookie.accountID);
    setNumOfOrders(numberOfOrders.count);
  }

  function handleEdit() {
    props.history.push("profile-view");
  }

  const emailRegex =
    RegExp(/^[a-zA-Z0-9.!’*+/=?^_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  // must >= 8 characters, at least one number, capital letter, and lowercase
  const passwordRegex = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
  // format: ###-###-####
  const phoneNumberRegex = RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
  // format: street, city, state zipcode
  const addressRegex = RegExp(/^.*,.*,.*[0-9]+$/);

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

  async function userEmailCheck(email) {
    let userEmailInfo = getUserByEmail(email);

    return userEmailInfo;
  }
  
  const handleSubmit = async e => {
    // prevent the form from submit before validate
    e.preventDefault();

    let userByEmailList = [];

    // check if there are any conflict in the database based on email
    if (emailTemp !== email) {
      userByEmailList = await userEmailCheck(email);
      console.log(userByEmailList);
    }

    if (formValid(formErrors) && fullName !== "" && phone !== "" && 
      address !== "" && email !== "" && userByEmailList.email !== "User already exists") {
      // if in this block, it is sure that the email either is the same 
      // or the change does not cause any conflicts

      // check if confirm password is the same with current password
      if (inputPassword === databasePassword) {

        // check if user want to change their password
        if (newPassword !== "") {
          let userData = { accountID: cookie.accountID, email: email, 
            cell: phone, address: address, name: fullName,
            password: (newPassword) };
            
          updateUser(userData);
        }
        else { // if user don't want to change their 
          let userData = { accountID: cookie.accountID, email: email, 
            cell: phone, address: address, name: fullName,
            password: databasePassword };
          
          updateUser(userData);
        }
       
        alert("UPDATE SUCCESSFULLY");
        props.history.push("/profile-view");

      }
      else {
        console.error("ENTER CURRENT PASSWORD CORRECTLY TO PROCEED!");
        alert("ENTER CURRENT PASSWORD CORRECTLY TO PROCEED!");
      }

    }
    else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      alert("FORM INVALID OR INVALID INPUT");
    }
  };

  
  const handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormErrors(formErrors);

    switch (name) {
    case "fullName":
      formErrors.fullName =
        value.length < 3 ? "minimum 3 characaters required" : "";
      setFullName(value);
      break;
    case "email":
      formErrors.email =
        emailRegex.test(value) ? "" : "invalid email address";
      setEmail(value);
      break;
    case "address":
      formErrors.address =
        addressRegex.test(value) ? "" : "invalid address format";
      setAddress(value);
      break;
    case "phone":
      formErrors.phone =
        phoneNumberRegex.test(value) ? "" : "invalid phone number format";
      setPhone(value);
      break;
    case "newPassword":
      formErrors.newPassword =
        passwordRegex.test(value) || value === "" ? "" : "minimum 8 characaters"
          + " required and it must contain an uppercase letter and a number";
      setNewPassword(value);
      break;
    case "inputPassword":
      formErrors.inputPassword =
        passwordRegex.test(value) || value === "" ? "" : "minimum 8 characaters"
        + " required and it must contain an uppercase letter and a number";
      setInputPassword(value);
      break;

    default:
      break;
    }

    setFormErrors(formErrors);
  };


  return (
    <div className="emp-profile">
      <form onSubmit={handleSubmit} noValidate>
        <div className="row" align="center">
          <div className="col-md-6">
            <div className="profile-img">
              <img 
                src={require("./Images/Network-Profile.png")} 
                alt={"profile"} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>{fullNameTemp}</h5>
              <h6>{emailTemp}</h6>
              <p className="profile-rating">Number of orders made: 
                <span> {numOfOrders}</span>
              </p>
              <button 
                type="submit" 
                className="profile-edit-btn" >
                  Update
              </button>
              <button 
                type="submit" 
                className="profile-edit-btn" 
                onClick={handleEdit} >Cancel</button>
            </div>
          </div>
        </div>
        <div className="row" align="center">
          <div className="col-md-12">
            <div className="profile-head">
              <ul className="nav nav-tabs" id="myTab" >
                <li>
                  <span className="nav-link active">Edit</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-12">
            <div className="tab-content profile-tab">
              <div className="tab-pane fade show active">
                <div className="row">
                  <div className="col-md-4" align="left">
                    <label>Name</label>
                  </div>
                  <div className="col-md-8" align="left">
                    <input
                      className={formErrors.fullName.length > 0
                        ? "error"
                        : "payment-input"}
                      id="payment-input"
                      type="text"
                      name="fullName"
                      value={fullName}
                      noValidate
                      onChange={handleChange} />
                    {formErrors.fullName.length > 0 &&
                      (<span className="errorMessage">
                        {formErrors.fullName}
                      </span>)}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4" align="left">
                    <label>Email</label>
                  </div>
                  <div className="col-md-8" align="left">
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
                </div>
                <div className="row">
                  <div className="col-md-4" align="left">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-8" align="left">
                    <input
                      className={formErrors.phone.length > 0
                        ? "error"
                        : "payment-input"}
                      id="payment-input"
                      type="text"
                      name="phone"
                      value={phone}
                      noValidate
                      onChange={handleChange} />
                    {formErrors.phone.length > 0 &&
                      (<span className="errorMessage">
                        {formErrors.phone}
                      </span>)}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4" align="left">
                    <label>Address</label>
                  </div>
                  <div className="col-md-8" align="left">
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
                </div>
                <div className="row">
                  <div className="col-md-4" align="left">
                    <label>New Password</label>
                  </div>
                  <div className="col-md-8" align="left">
                    <input
                      className={formErrors.newPassword.length > 0
                        ? "error"
                        : "payment-input"}
                      id="payment-input"
                      type="password"
                      name="newPassword"
                      placeholder="Optional"
                      noValidate
                      onChange={handleChange} />
                    {formErrors.newPassword.length > 0 &&
                      (<span className="errorMessage">
                        {formErrors.newPassword}
                      </span>)}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4" align="left">
                    <label>Confirm changes (current password)</label>
                  </div>
                  <div className="col-md-8" align="left">
                    <input
                      className={formErrors.inputPassword.length > 0
                        ? "error"
                        : "payment-input"}
                      id="payment-input"
                      type="password"
                      name="inputPassword"
                      placeholder="Current password"
                      noValidate
                      onChange={handleChange} />
                    {formErrors.inputPassword.length > 0 &&
                      (<span className="errorMessage">
                        {formErrors.inputPassword}
                      </span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileEditPage;
