import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const [isCollapse, setIsCollapse] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCollapse = () => setIsCollapse(!isCollapse);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">BackEnd Exam</NavbarBrand>
        <NavbarToggler onClick={handleCollapse} />
        <Collapse isOpen={isCollapse} navbar>
          <Nav className="mr-auto" navbar>
            <Dropdown
              isOpen={isMenuOpen}
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
              // nav
              inNavbar>
              <DropdownToggle nav caret>
                Select menu
              </DropdownToggle>
              <DropdownMenu right={false}>
                <DropdownItem>Manage Movies</DropdownItem>
                <DropdownItem>Manage Categories</DropdownItem>
                <DropdownItem divider />
                <DropdownItem disabled>Connection List</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink onClick={() => dispatch({ type: "MODAL_AUTH", payload: true })}>
                Account <FaRegUser />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
