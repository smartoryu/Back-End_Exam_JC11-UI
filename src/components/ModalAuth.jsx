/* eslint-disable no-unused-vars */
// /* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";
import { FaAt, FaEye, FaEyeSlash, FaRegEnvelope, FaTimes, FaKey, FaUserAlt } from "react-icons/fa";
import { CheckUsernameThunk, LoginActionThunk, RegisterActionThunk } from "../redux/actions";

function ModalAuth() {
  // =================================================== REDUCER ON REDUX ==
  const GoodUser = useSelector(state => state.auth.goodUser);

  const ErrorUserLog = useSelector(state => state.auth.errorUserLog);
  const ErrorPassLog = useSelector(state => state.auth.errorPassLog);
  const TextUserLog = useSelector(state => state.auth.textUserLog);
  const TextPassLog = useSelector(state => state.auth.textPassLog);

  const ErrorSecret = useSelector(state => state.auth.errorSecret);
  const ErrorName = useSelector(state => state.auth.errorName);
  const ErrorUser = useSelector(state => state.auth.errorUser);
  const ErrorPass = useSelector(state => state.auth.errorPass);
  const ErrorEmail = useSelector(state => state.auth.errorEmail);

  const TextSecret = useSelector(state => state.auth.textSecret);
  const TextUser = useSelector(state => state.auth.textUser);
  const TextPass = useSelector(state => state.auth.textPass);
  const dispatch = useDispatch();

  // ================================================== STATE VALUES LOGIN ==
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const handleLoginValues = e => {
    let { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginKeyPress = e => {
    if (e.key === "Enter") {
      dispatch(LoginActionThunk(login.username, login.password));
    }
  };

  // ============================================== STATE VALUES REGISTER ==
  const [register, setRegister] = useState({
    secret: "",
    name: "",
    username: "",
    email: "",
    password: "",
    password2: ""
  });
  const handleRegisterValues = event => {
    let { name, value } = event.target;
    setRegister({ ...register, [name]: value });
  };
  const registerKeyPress = e => {
    if (e.key === "Enter") {
      dispatch(
        RegisterActionThunk(
          register.secret,
          register.name,
          register.username,
          register.email,
          register.password,
          register.password2
        )
      );
    }
  };

  // ================================================== SHOW/HIDE PASSWORD ==
  const [typePass, setTypePass] = useState("password");
  const [showPass, setShowPass] = useState(false);
  const togglePass = type => {
    setTypePass(type);
    setShowPass(!showPass);
  };
  const [typePass2, setTypePass2] = useState("password");
  const [showPass2, setShowPass2] = useState(false);
  const togglePass2 = type => {
    setTypePass2(type);
    setShowPass2(!showPass2);
  };

  // ======================================================= CONTROL MODAL ==
  const ModalAuth = useSelector(state => state.auth.modalAuth);
  const closeLogin = () => dispatch({ type: "MODAL_AUTH", payload: false });

  // =============================================== CONTROL STATE OF TABS ==
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = tab => (activeTab !== tab ? setActiveTab(tab) : null);

  return (
    <Modal
      autoFocus={false}
      fade={false}
      style={{ backgroundColor: "transparent", width: "300px" }}
      centered
      // isOpen
      isOpen={ModalAuth}
      toggle={closeLogin}>
      <ModalHeader className="ml-auto border-0" toggle={closeLogin} />
      <Card className="w-100 mx-auto">
        <CardHeader className="text-center">
          <Nav tabs className="card-header-tabs" style={{ cursor: "pointer" }}>
            <NavItem className="w-50">
              <NavLink className={classnames({ active: activeTab === "1" })} onClick={() => toggleTab("1")}>
                Login
              </NavLink>
            </NavItem>
            <NavItem className="w-50">
              <NavLink className={classnames({ active: activeTab === "2" })} onClick={() => toggleTab("2")}>
                Register
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody>
          <TabContent activeTab={activeTab}>
            {/* ========== TAB LOGIN ========== */}
            <TabPane tabId="1">
              <div className="login">
                <Form>
                  <FormGroup id="form-username">
                    <InputGroup className="d-flex">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FaAt color="#bababa" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoFocus={true}
                        style={{ zIndex: "10" }}
                        invalid={ErrorUserLog}
                        onChange={handleLoginValues}
                        onKeyPress={loginKeyPress}
                        type="text"
                        name="username"
                        placeholder="Username"
                      />
                      {ErrorUserLog ? <FormFeedback className="ml-5 float-left">{TextUserLog}</FormFeedback> : null}
                    </InputGroup>
                  </FormGroup>

                  <FormGroup id="form-password">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FaKey color="#bababa" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        style={{ zIndex: "10" }}
                        invalid={ErrorPassLog}
                        onChange={handleLoginValues}
                        onKeyPress={loginKeyPress}
                        type={typePass}
                        name="password"
                        placeholder="Password"
                      />
                      <InputGroupAddon className="border-0" addonType="append">
                        {showPass ? (
                          <Button tabIndex="-1" onClick={() => togglePass("password")} color="light">
                            <FaEye color="#8a8a8a" />
                          </Button>
                        ) : (
                          <Button tabIndex="-1" onClick={() => togglePass("text")} color="light">
                            <FaEyeSlash color="#bababa" />
                          </Button>
                        )}
                      </InputGroupAddon>
                      {ErrorPassLog ? <FormFeedback className="ml-5 float-left">{TextPassLog}</FormFeedback> : null}
                    </InputGroup>
                  </FormGroup>

                  <FormGroup check className="mb-3" style={{ fontSize: "0.75rem" }}>
                    <Label check>
                      <Input type="checkbox" /> Remember me
                    </Label>
                  </FormGroup>

                  <FormGroup id="form-button">
                    <Button
                      onClick={() => dispatch(LoginActionThunk(login.username, login.password))}
                      color="secondary"
                      size="md"
                      block>
                      Login
                      {/* <Spinner color="light" size="sm" /> */}
                    </Button>
                    <div className="d-flex">
                      <NavLink href="#" className="ml-auto mt-1 p-0" style={{ fontSize: "0.75rem" }}>
                        Forgot your password?
                      </NavLink>
                    </div>
                  </FormGroup>
                </Form>
              </div>
            </TabPane>

            <TabPane tabId="2">
              <div className="register">
                <Form>
                  <FormGroup id="form-secret">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FaUserAlt color="#bababa" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        style={{ zIndex: "10" }}
                        invalid={ErrorSecret}
                        onChange={handleRegisterValues}
                        type="text"
                        name="secret"
                        id="register-secret"
                        placeholder="Secret code"
                      />
                      {ErrorSecret ? <FormFeedback className="form-error-message">{TextSecret}</FormFeedback> : null}
                    </InputGroup>
                  </FormGroup>

                  <FormGroup id="form-name">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FaUserAlt color="#bababa" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        style={{ zIndex: "10" }}
                        valid={ErrorName}
                        onChange={handleRegisterValues}
                        type="text"
                        name="name"
                        id="register-name"
                        placeholder="Name"
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup id="form-username">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FaAt color="#bababa" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        style={{ zIndex: "10" }}
                        valid={GoodUser}
                        invalid={ErrorUser}
                        onChange={handleRegisterValues}
                        type="text"
                        name="username"
                        id="register-username"
                        placeholder="Username"
                      />
                      {ErrorUser ? <FormFeedback className="form-error-message">{TextUser}</FormFeedback> : null}
                    </InputGroup>
                  </FormGroup>

                  <FormGroup id="form-email">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FaRegEnvelope color="#bababa" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        style={{ zIndex: "10" }}
                        valid={ErrorEmail}
                        // invalid={}
                        onChange={handleRegisterValues}
                        type="email"
                        name="email"
                        id="register-email"
                        placeholder="Email"
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup id="form-password1">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FaKey color="#bababa" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        style={{ zIndex: "10" }}
                        invalid={ErrorPass}
                        onChange={handleRegisterValues}
                        type={typePass}
                        name="password"
                        id="register-password1"
                        placeholder="Password"
                      />
                      <InputGroupAddon addonType="append">
                        {showPass ? (
                          <Button tabIndex="-1" onClick={() => togglePass("password")} color="light">
                            <FaEye color="#8a8a8a" />
                          </Button>
                        ) : (
                          <Button tabIndex="-1" onClick={() => togglePass("text")} color="light">
                            <FaEyeSlash color="#bababa" />
                          </Button>
                        )}
                      </InputGroupAddon>
                      {/* {ErrorPass ? <FormFeedback className="form-error-message">{TextPass}</FormFeedback> : null} */}
                    </InputGroup>
                  </FormGroup>

                  <FormGroup id="form-password2">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FaKey color="#bababa" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        style={{ zIndex: "10" }}
                        invalid={ErrorPass}
                        onChange={handleRegisterValues}
                        type={typePass2}
                        name="password2"
                        id="register-password2"
                        placeholder="Re-enter Password"
                      />
                      <InputGroupAddon addonType="append">
                        {showPass2 ? (
                          <Button tabIndex="-1" onClick={() => togglePass2("password")} color="light">
                            <FaEye color="#8a8a8a" />
                          </Button>
                        ) : (
                          <Button tabIndex="-1" onClick={() => togglePass2("text")} color="light">
                            <FaEyeSlash color="#bababa" />
                          </Button>
                        )}
                      </InputGroupAddon>
                      {ErrorPass ? <FormFeedback className="form-error-message">{TextPass}</FormFeedback> : null}
                    </InputGroup>
                  </FormGroup>

                  {register.name && register.username && register.email && register.password && register.password2 ? (
                    <Fragment>
                      <FormGroup check className="mb-3" style={{ fontSize: "0.75rem" }}>
                        <Label check>
                          <Input type="checkbox" /> By clicking Submit, you agree to our <br />
                          <a tabIndex="-1" href="#">
                            Terms & Conditions
                          </a>
                          , Visitor Agreement <br />
                          and Privacy Policy.
                        </Label>
                      </FormGroup>

                      <FormGroup id="form-button">
                        <Button
                          onClick={() =>
                            dispatch(
                              RegisterActionThunk(
                                register.secret,
                                register.name,
                                register.username,
                                register.email,
                                register.password,
                                register.password2
                              )
                            )
                          }
                          color="secondary"
                          size="md"
                          block>
                          Submit
                        </Button>
                      </FormGroup>
                    </Fragment>
                  ) : register.username ? (
                    <FormGroup id="form-button">
                      <Button
                        onClick={() => dispatch(CheckUsernameThunk(register.username))}
                        color="secondary"
                        size="md"
                        block>
                        Check Username
                      </Button>
                    </FormGroup>
                  ) : (
                    <FormGroup id="form-button">
                      <Button disabled color="secondary" size="md" block style={{ cursor: "not-allowed" }}>
                        Input Username first
                      </Button>
                    </FormGroup>
                  )}
                </Form>
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </Modal>
  );
}

export default ModalAuth;
