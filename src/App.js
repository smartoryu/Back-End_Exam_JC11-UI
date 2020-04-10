import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { KeepLoginThunk, GetCategories } from "./redux/actions";

import Header from "./components/Header";
import ModalAuth from "./components/ModalAuth";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Categories from "./pages/Categories";

function App() {
  const dispatch = useDispatch();

  toast.configure();

  useEffect(() => {
    dispatch(KeepLoginThunk(localStorage.getItem("userID")));
    dispatch(GetCategories());
  }, [dispatch]);

  return (
    <Fragment>
      <ModalAuth />
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/categories" component={Categories} />
      </Switch>
    </Fragment>
  );
}

export default App;
