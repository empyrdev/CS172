import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Item from "./Item";
import CartModal from "./CartModal";
import { getCategory } from "./APIFunctions";
import SearchBar from "./SearchBar";

function ItemByCategory(props) {
  const [currentItem, setCurrentItem] = useState();
  const [modalOpen, setModalOpen] = useState();
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);

  function showCartModal(item) {
    setCurrentItem(item);
    setModalOpen(true);
  }

  function toggle() {
    setModalOpen(!modalOpen);
  }

  async function getItems() {
    setItems(await getCategory(id));
    console.log(items)
  }

  return (
    <div style={{ textAlign: "left" }} className="Employees">
      <SearchBar {...props} />
      {modalOpen ? <CartModal
        item={currentItem}
        modalOpen={modalOpen}
        toggle={toggle} /> : <React.Fragment />}
      {items.length && items.map((item, index) => {
        return (
          <Item key={index} handleAddToCart={showCartModal} item={item} />
        );
      })}
    </div>
  );
}

export default ItemByCategory;
