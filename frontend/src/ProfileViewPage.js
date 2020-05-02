import React, { useState, useEffect } from "react";
import { getUser, getNumberOfOrders } from "./APIFunctions";
import { useCookies } from "react-cookie";
import "./ProfilePage.css";


function ProfileViewPage(props) {
  const [cookie] = useCookies(["name"]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [numOfOrders, setNumOfOrders] = useState("");

  useEffect(() => {
    getUserInfo();
    getUserOrderHistory();
    // eslint-disable-next-line
  }, []);
    
     
  async function getUserInfo() {
    let tempUserInfo = await getUser({ accountID: cookie.accountID });
    tempUserInfo = tempUserInfo[0];
    setFullName(tempUserInfo.name);
    setEmail(tempUserInfo.email);
    setPhone(tempUserInfo.cell);
    setAddress(tempUserInfo.address);
        
  }

  async function getUserOrderHistory() {
    let numberOfOrders = await getNumberOfOrders(cookie.accountID);
    setNumOfOrders(numberOfOrders[0].counting);
  }

  
  function handleEdit() {
    props.history.push("/profile-edit");
  }

  return (
    <div className="emp-profile">
      <div className="row" align="center">
        <div className="col-md-6">
          <div className="profile-img">
            <img 
              src={require("./storefrontImages/Network-Profile.png")} 
              alt={"profile"} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="profile-head">
            <h5>{fullName}</h5>
            <h6>{email}</h6>
            <p className="profile-rating">Number of orders made: 
              <span> {numOfOrders}</span>
            </p>
            <button 
              type="submit" 
              className="profile-edit-btn" 
              onClick={handleEdit} >Edit Profile</button>
          </div>
        </div>
      </div>
      <div className="row" align="center">
        <div className="col-md-12">
          <div className="profile-head">
            <ul className="nav nav-tabs" id="myTab" >
              <li>
                <span className="nav-link active">About</span>
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
                  <p>{fullName}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4" align="left">
                  <label>Email</label>
                </div>
                <div className="col-md-8" align="left">
                  <p>{email}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4" align="left">
                  <label>Phone</label>
                </div>
                <div className="col-md-8" align="left">
                  <p>{phone}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4" align="left">
                  <label>Address</label>
                </div>
                <div className="col-md-8" align="left">
                  <p>{address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileViewPage;
