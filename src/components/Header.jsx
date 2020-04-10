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
  DropdownItem,
} from "reactstrap";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const Name = useSelector((state) => state.auth.name);
  const Login = useSelector((state) => state.auth.login);

  const [isCollapse, setIsCollapse] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  console.log(location.pathname);
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
      },
    });
  };

  function handleTitle() {
    switch (location.pathname) {
      case "/":
        return "Backend Exam";
      case "/movies":
        return "Manage Movies";
      case "/categories":
        return "Manage Categories";
      default:
        break;
    }
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">{handleTitle()}</NavbarBrand>
        <NavbarToggler onClick={handleCollapse} />
        <Collapse isOpen={isCollapse} navbar>
          <Nav className="mr-auto" navbar>
            {Login ? (
              <Dropdown
                isOpen={isMenuOpen}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
                toggle={() => setIsMenuOpen((prevState) => !prevState)}
                nav
                inNavbar>
                <DropdownToggle nav caret>
                  Select menu
                </DropdownToggle>
                <DropdownMenu className="m-0" right={false}>
                  <DropdownItem>
                    <NavItem>
                      <Link to="/movies" className="text-dark text-decoration-none">
                        Manage Movies
                      </Link>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <Link to="/categories" className="text-dark text-decoration-none">
                        Manage Categories
                      </Link>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem disabled>
                    <NavLink className="text-black-50">Connection List</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Dropdown
                isOpen={isMenuOpen}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
                toggle={() => setIsMenuOpen((prevState) => !prevState)}
                nav
                inNavbar>
                <DropdownToggle nav caret>
                  Select menu
                </DropdownToggle>
                <DropdownMenu className="m-0" onMouseEnter={() => setIsMenuOpen(false)} right={false}>
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
                toggle={() => setIsAccountOpen((prevState) => !prevState)}
                nav
                inNavbar>
                <DropdownToggle nav>
                  Hi, {Name}! <FaRegUser />
                </DropdownToggle>
                <DropdownMenu className="m-0" right>
                  <DropdownItem>
                    <NavLink style={{ color: "inherit" }} onClick={handleLogout}>
                      Logout
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Dropdown
                isOpen={isAccountOpen}
                onMouseEnter={() => setIsAccountOpen(true)}
                onMouseLeave={() => setIsAccountOpen(false)}
                toggle={() => setIsAccountOpen((prevState) => !prevState)}
                nav
                inNavbar>
                <DropdownToggle onClick={() => dispatch({ type: "MODAL_AUTH", payload: true })} nav>
                  Hi, {Name}! <FaRegUser />
                </DropdownToggle>
                <DropdownMenu className="m-0" onMouseEnter={() => setIsAccountOpen(false)} right>
                  <DropdownItem disabled>click to Login/Register!</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
