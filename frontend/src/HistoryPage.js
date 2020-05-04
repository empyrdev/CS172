import React, { useState, useEffect } from "react";
import { getOrders } from "./APIFunctions";
import { useCookies } from "react-cookie";
import "./HistoryPage.css";


function HistoryPage(props) {
  const [hashMap, setHashMap] = useState(Object);
  const [keysList, setKeysList] = useState([]);
  const [cookie] = useCookies(["name"]);


  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    getUserOrderHistory();
    // eslint-disable-next-line
  }, []);

  async function getUserOrderHistory() {
    let tempOrderList = await getOrders(cookie.accountID, "");
    setOrderList(tempOrderList);

    console.log(tempOrderList);
    // eslint-disable-next-line
    tempOrderList.map((entry) => {
      const { orderID, itemPrice, itemId, quantity, price } = entry;
      if (!hashMap[orderID])
        hashMap[orderID] = { items: [], total: 0 };
      hashMap[orderID].items.push({ itemId, quantity, itemPrice });
      hashMap[orderID].total = price;
    });

    let keys = [];
    for (let key in hashMap) {
      keys.push(key);
    }
    setKeysList(keys);
    setHashMap(hashMap);
  }

  // function inside of component
  function handleClick(itemId) {
    props.history.push(`/item/${itemId}`);
  }

  return (
    <div>
      {keysList && keysList.map((item, index) => {
        return (
          <div key={index} className="orderBorder" align="left">
            <h3>Order Number ------{item}</h3>
            <span className="price">
              <h5>
                <i>Total: ${hashMap[item].total.toFixed(2)}</i>
              </h5>
            </span>
            {orderList && orderList.map((myItem, myIndex) => {
              return (
                parseInt(myItem.orderID, 10) !== parseInt(item, 10)
                  ? ""
                  :
                  <div key={myIndex} className="orderWrapper">
                    <div className="orderColumn">
                      <img
                        src={require(`./Images/${myItem.image}`)}
                        alt={`${myItem.itemName}`}
                        style={{ width: "10rem" }} />
                    </div>
                    <div className="corderColumn" align="left">
                      <h5>
                        <button onClick={() => handleClick(myItem.itemId)}>
                          {myItem.itemName}
                        </button>
                      </h5>
                      <p> description: {myItem.description}</p>
                      <p>Number of Items: {myItem.quantity}
                        <br />
                        <span> Price per Item: $ {myItem.itemPrice.toFixed(2)}
                        </span>
                      </p>
                    </div>

                  </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
export default HistoryPage;
