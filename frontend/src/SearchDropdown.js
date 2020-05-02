import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class SearchDropdown extends Component {
  state = {
    dropdownOpen: false,
    queryType: "Item Name",
    options: [
      { name: "Item Name", value: "itemName" },
      { name: "Category Name", value: "categoryName" }
    ]
  };


  onChange = ((e) => {
    this.setState({
      queryType: e.target.name
    });
    this.props.onChange(e);
  });

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    return (
      <div>
        <ButtonDropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          className="querySelect"
          key="querySelect"
        >
          <DropdownToggle caret>{this.state.queryType}</DropdownToggle>
          <DropdownMenu>
            {this.state.options.map((option) => {
              return (<DropdownItem
                onClick={this.onChange}
                key={option.value}
                value={option.value}
                name={option.name}
              >
                {option.name}
              </DropdownItem>);
            })}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

export default SearchDropdown;
