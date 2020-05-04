// Remember to change localhost to the EC2 server

const url = "localhost:8080";

export function roundToTwo(num) {
  let result = parseFloat(num);
  return result.toFixed(2);
}

export async function checkSessionID(session) {
  let objects = [];
  await fetch(`http://${url}/users/session?id=${session}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });

  return objects;
}

export async function registerUser(newUser) {
  let objects = [];
  await fetch(`http://${url}/users/add?email=${newUser.email}` +
    `&password=${newUser.password}&name='${newUser.name}'&` +
    `cell=${newUser.cell}&address='${newUser.address}'`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}

export async function getUser(user) {
  let objects = [];
  await fetch(`http://${url}/users?id=${user.accountID}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}

export async function getUserByEmail(email) {
  let objects = [];
  await fetch(`http://${url}/users/emailcheck?email=${email}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}


export async function updateUser(user) {
  fetch(`http://${url}/users/update?email=${user.email}&cell=${user.cell}`+
    `&password=${user.password}&name=${user.name}&address=${user.address}`+
    `&accountID=${user.accountID}`)
    .catch((err) => {
      console.error(err);
    });
}


export async function loginUser(user) {
  let objects = [];
  await fetch(`http://${url}/users/login?email=${user.email}` +
    `&password=${user.password}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}

export async function deleteUser(user) {
  fetch(`http://${url}/users/remove?id=${user.accountID}`)
    .catch((err) => {
      console.error(err);
    });
}

export async function getCards(user) {
  let objects = [];
  await fetch(`http://${url}/cards?id=${user.accountID}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
      // console.log(objects);
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}

export async function addCard(data) {
  fetch(`http://${url}/cards/add?id=${data.accountID}` +
    `&cardHolder=${data.cardHolder}&cvv=${data.CVV}` +
    `&Zip=${data.Zip}&CardNumber=${data.cardNumber}` +
    `&ExpMonth=${data.ExpMonth}&ExpYear=${data.ExpYear}`)
    .catch((err) => {
      console.error(err);
    });
}

export async function deleteCard(data) {
  fetch(`http://${url}/cards/remove?id=${data.accountID}&cardID=${data.cardID}`)
    .catch((err) => {
      console.error(err);
    });
}

export async function getCategory(categoryID) {
  let objects = [];
  const query = !categoryID ? `http://${url}/item/categories` :
    `http://${url}/item?categoryID=${categoryID}`;

  await fetch(`${query}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}

export async function getCategoryById(categoryID){
  let objects = []
  const query = `http://${url}/categories/search?categoryID=${categoryID}`

  await fetch(`${query}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}

export async function getItems(itemID) {
  let objects = [];
  const query = !itemID ? `http://${url}/i` :
    `http://${url}/i?itemID=${itemID}`;
  await fetch(`${query}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}

export async function getItemInCategory(itemID, categoryID) {
  let objects = [];
  await fetch(`http://${url}/item?itemID=${itemID}&categoryID=${categoryID}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}

export async function searchByCategoryName(categoryName) {
  let objects = [];
  let categoryIDs = [];
  await fetch(`http://${url}/category?categoryName=${categoryName}`)
    .then((response) => response.json())
    .then(async (response) => {
      response.map(x => categoryIDs.push(x.categoryId));
      await Promise.all(categoryIDs.map(async (id) => {
        objects = objects.concat(await getCategoryById(id));
      }));
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}

export async function searchByItemName(itemName) {
  let objects = [];
  let itemIDs = [];
  await fetch(`http://${url}/item/search?itemName=${itemName}`)
    .then((response) => response.json())
    .then(async (response) => {
      response.map(x => itemIDs.push(x.itemId));
      await Promise.all(itemIDs.map(async (id) => {
        let currentItem = await getItems(id);
        objects = objects.concat(currentItem);
      }));
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}

export async function addItem(data) {
  fetch(`http://${url}/item/add?name='${data.name}'` +
    `&price='${data.price}'&description='${data.description}'` +
    `&image=${data.image}&categoryID=${data.categoryID}`)
    .catch((err) => {
      console.error(err);
    });
}

export async function removeItem(itemID) {
  fetch(`http://${url}/item/remove?itemID=${itemID}`)
    .catch((err) => {
      console.error(err);
    });
}

export async function getOrders(accountID, orderID) {
  let objects = [];
  const query = !orderID ?
    `http://${url}/orders?id=${accountID}` :
    `http://${url}/orders?id=${accountID}&orderID=${orderID}`;

  await fetch(`${query}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}

// /orders/add?items=1,2&items=3,4
export async function addOrders(data, accountID) {
  let junkItem = "&items=0,0"
  let fetchString = `http://${url}/orders/add?accountID=${accountID}${data}${junkItem}`;

  console.log(fetchString)
  fetch(fetchString)
    .catch((err) => {
      console.error(err);
    });
}

export async function getNumberOfOrders(accountID) {
  let objects = [];
  const query = `http://${url}/orders/amount?accountID=${accountID}`;
  await fetch(`${query}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}


export async function getCartItemsByID(cartItems) {
  let result = [];
  await Promise.all(cartItems.map(async (item) => {
    let currItem = await getItems(item.itemId);
    const { itemId, description, image, itemName, price } = currItem[0];
    result.push({
      itemId, quantity: parseInt(item.quantity),
      description, image, itemName, price
    });
  }));
  return result;
}

export async function getCartItems(accountID) {
  let objects = [];
  await fetch(`http://${url}/cart?accountID=${accountID}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}

export async function addToCart(accountID, itemID, quantity) {
  let objects = [];
  await fetch(`http://${url}/cart/add?accountID=${accountID}` +
    `&itemID=${itemID}&quantity=${quantity}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}

export async function removeFromCart(accountID, itemID, quantity) {
  let objects = [];
  await fetch(`http://${url}/cart/remove?accountID=${accountID}` +
    `&itemID=${itemID}&quantity=${quantity}`)
    .then((response) => response.json())
    .then((response) => {
      objects = response;
    })
    .catch((err) => {
      console.error(err);
    });
  return objects;
}
