import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { getUser } from "./APIFunctions";
import { useCookies } from "react-cookie";
import MdCart from "react-ionicons/lib/MdCart";

function Navigation(props) {
  const [isOpen, toggleOpen] = useState(false);
  const [dropdownOpen, toggleDropdownOpen] = useState(false);
  const [email, setEmail] = useState();
  const [cookies] = useCookies(["name"]);
  const { accountID } = cookies;

  useEffect(() => {
    getUserInfo();
  });

  async function getUserInfo() {
    if (props.authed) {
      let response = await getUser({ accountID: accountID });
      if (response.errno !== 1054) {
        setEmail(response[0].email);
      }
    }
  }

  const navLinks = [
    { name: "Categories", link: "/categories" },
    { name: "Search", link: "/search" }
  ];
  const accountLinks = [
    { name: "Profile", link: "/profile-view", callback: () => { } },
    { name: "Order History", link: "/history", callback: () => { } },
    { name: "Log out", link: "/login", callback: props.handleLogout }
  ];

  function getDropDown() {
    if (props.authed) {
      return (
        <React.Fragment>
          <NavLink href="/cart"><MdCart color="white" /></NavLink>
          <Dropdown
            navbar="true"
            isOpen={dropdownOpen}
            toggle={() => toggleDropdownOpen(!dropdownOpen)}
          >
            <DropdownToggle style={{ backgroundColor: "#3d1a1a" }}
              navbar="true">
              My Account
            </DropdownToggle>
            <DropdownMenu dark="true" right>
              {
                email ?
                  <DropdownItem header>Signed in as: {email}</DropdownItem>
                  : <React.Fragment />
              }
              {accountLinks.map((link, index) => {
                return (
                  <DropdownItem key={index}>
                    <NavLink
                      onClick={link.callback}
                      href={link.link}>
                      {link.name}
                    </NavLink>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </React.Fragment>
      );
    } else {
      return <p />;
    }
  }

  return (
    <Navbar style={{ backgroundColor: "#3d1a1a" }} dark={true} expand="sm">
      <Container>
        <NavbarBrand href="/">
          StoreFront
        </NavbarBrand>
        <Collapse isOpen={isOpen} navbar={true}>
          <Nav className="mr-auto" navbar>
            {props.authed && navLinks.map((option, index) => {
              return (
                <NavItem key={index}>
                  <NavLink href={option.link}>{option.name}</NavLink>
                </NavItem>
              );
            })}
          </Nav>

          <Nav className="ml-auto" nav="true">
            {getDropDown()}
          </Nav>
        </Collapse>
        <NavbarToggler onClick={() => toggleOpen(!isOpen)} />
      </Container>
    </Navbar>
  );
}

export default Navigation;
