import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const Header = () => {
  const Name = useSelector(state => state.auth.name);
  const Login = useSelector(state => state.auth.login);
  const Logout = useSelector(state => state.auth.logout);
  const dispatch = useDispatch();

  const [isCollapse, setIsCollapse] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const handleCollapse = () => setIsCollapse(!isCollapse);

  const handleLogout = () => {
    toast.info("Log out!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      onClose: () => {
        localStorage.removeItem("userID");
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
      }
    });
  };

  if (Logout) {
    dispatch({ type: "RESET" });
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">BackEnd Exam</NavbarBrand>
          <NavbarToggler onClick={handleCollapse} />
          <Collapse isOpen={isCollapse} navbar>
            <Nav className="mr-auto" navbar>
              {Login ? (
                <Dropdown
                  isOpen={isMenuOpen}
                  onMouseEnter={() => setIsMenuOpen(true)}
                  onMouseLeave={() => setIsMenuOpen(false)}
                  nav
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
              ) : (
                <Dropdown
                  isOpen={isMenuOpen}
                  onMouseEnter={() => setIsMenuOpen(true)}
                  onMouseLeave={() => setIsMenuOpen(false)}
                  nav
                  inNavbar>
                  <DropdownToggle nav caret>
                    Select menu
                  </DropdownToggle>
                  <DropdownMenu right={false}>
                    <DropdownItem disabled>Login first!</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </Nav>
            <Nav className="ml-auto" navbar>
              {Login ? (
                <Dropdown
                  isOpen={isAccountOpen}
                  onMouseEnter={() => setIsAccountOpen(true)}
                  onMouseLeave={() => setIsAccountOpen(false)}
                  nav
                  inNavbar>
                  <DropdownToggle nav>
                    Hi, {Name}! <FaRegUser />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <NavLink style={{ color: "inherit" }} onClick={handleLogout}>
                        Logout
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <NavItem style={{ cursor: "pointer" }}>
                  <NavLink onClick={() => dispatch({ type: "MODAL_AUTH", payload: true })}>
                    Account <FaRegUser />
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
};

export default Header;
