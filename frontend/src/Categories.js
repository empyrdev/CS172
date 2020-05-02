import React, { useState, useEffect } from "react";
import { Button, ListGroupItem } from "reactstrap";
import { getCategory } from "./APIFunctions";
import SearchBar from "./SearchBar";

function Categories(props) {
  const [categories, setCategories] = useState();

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    setCategories(await getCategory());
  }

  function handleClick(id) {
    props.history.push(`/category/${id}`);
  }

  return (
    <div style={{ textAlign: "center" }} className="Employees">
      <SearchBar {...props} />
      {categories && categories.map((item, index) => {
        return (
          <ListGroupItem key={index}>
            <div style={{ display: "inline-block", width: "90%" }}>
              <div style={{ float: "center" }}>
                <img src={require("./Images/categories/" +
                  item.categoryName.toLowerCase() + ".png")}
                alt={item.categoryName}
                height="200"
                width="200"
                />
              </div>
              <Button onClick={() => handleClick(index + 1)}
                style={{
                  marginTop: "5px",
                  fontSize: "20px",
                  width: "200px"
                }}>
                {item.categoryName}
              </Button>
            </div>
          </ListGroupItem>
        );
      })}
    </div>
  );
}

export default Categories;
