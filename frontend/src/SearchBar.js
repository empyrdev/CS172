import React, { useState } from "react";
import {
  Container, Form, Input,
  InputGroup, InputGroupAddon,
  Button
} from "reactstrap";
import SearchDropdown from "./SearchDropdown";

function SearchBar(props) {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("itemName");

  function handleQueryChange(e) {
    setSearchType(e.target.value);
  }

  function submitQuery(e) {
    e.preventDefault();
    let queryString = "/search?";
    if (searchType === "itemName") {
      queryString += `itemName=${query}`;
    } else {
      queryString += `categoryName=${query}`;
    }
    if (query.length) {

      if (props.location.pathname === "/search") {
        window.location.replace(queryString);
      } else {
        props.history.push(queryString);
      }
    }
  }

  return (
    <Container style={{ padding: "20px" }}>
      <Form onSubmit={submitQuery}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <SearchDropdown onChange={handleQueryChange} />
          </InputGroupAddon>
          <Input
            style={{ height: 36 }}
            type="input"
            className="form-control"
            placeholder="Search here..."
            onKeyPress={(e) => {
              if (e.key === 13)
                submitQuery();
            }}
            onChange={(e) => {
              setQuery(e.target.value);
            }} />
          <InputGroupAddon addonType="append">
            <Button onClick={submitQuery}>Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    </Container>
  );

}

export default SearchBar;
