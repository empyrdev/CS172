import React, { useState, useEffect } from "react";
import Item from "./Item";
import { Container, Spinner } from "reactstrap";
import CartModal from "./CartModal";
import { searchByCategoryName, searchByItemName } from "./APIFunctions";
import SearchBar from "./SearchBar";
import queryString from "query-string";

export default function SearchResultPage(props) {
  const [currentItem, setCurrentItem] = useState();
  const [modalOpen, setModalOpen] = useState();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userQuery, setUserQuery] = useState();

  useEffect(() => {
    searchForItems();
    // eslint-disable-next-line
  }, []);

  function showCartModal(item) {
    setCurrentItem(item);
    setModalOpen(true);
  }

  function toggle() {
    setModalOpen(!modalOpen);
  }

  async function searchForItems() {
    const query = queryString.parse(props.location.search);
    const { itemName, categoryName } = query;
    let queryResult = [];
    if (itemName) {
      setUserQuery("Item Name: " + itemName);
      queryResult = await searchByItemName(itemName);
    } else if (categoryName) {
      setUserQuery("Category Name: " + categoryName);
      queryResult = await searchByCategoryName(categoryName);
    }
    setItems(queryResult);
    setLoading(false);
  }

  return (
    <Container>
      <SearchBar {...props} />
      {
        userQuery ? 
          <h3>Search result for {userQuery}</h3>
          :
          <h3>Search for items and categories above!</h3>
      }
      {modalOpen ? <CartModal
        item={currentItem}
        modalOpen={modalOpen}
        toggle={toggle} /> : <React.Fragment />}
      {loading ? <Spinner animation="border" role="status" /> :
        items.map((item, index) => {
          return (
            <Item key={index} handleAddToCart={showCartModal} item={item} />
          );
        })}
      {!items.length && !loading && userQuery ?
        <h4>Nothing was found from your query.</h4> : <React.Fragment />}
    </Container>
  );
}
