import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { KeepLoginThunk } from "./redux/actions";

import Home from "./pages/Home";
import Header from "./components/Header";
import ModalAuth from "./components/ModalAuth";

function App() {
  const dispatch = useDispatch();

  toast.configure();

  useEffect(() => {
    dispatch(KeepLoginThunk(localStorage.getItem("userID")));
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <ModalAuth />

      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/login" component={ModalAuth} /> */}
      </Switch>
    </Fragment>
  );
}

export default App;
