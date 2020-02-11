import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Header from "./components/Header";
import ModalAuth from "./components/ModalAuth";

function App() {
  return (
    <Fragment>
      <Header />
      <ModalAuth />
      <Switch>
        <Route path="/" component={Home} />
        {/* <Route path="/login" component={ModalAuth} /> */}
      </Switch>
    </Fragment>
  );
}

export default App;
