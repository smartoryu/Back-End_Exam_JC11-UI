import React from "react";
import { useSelector } from "react-redux";

import logo from "../logo.svg";

function Home() {
  const Login = useSelector(state => state.auth.login);

  return (
    <div className="App">
      <section className="App-header">
        {Login ? (
          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Welcome to <code>Back-end Exam</code> UI.
            </p>
          </div>
        ) : (
          <h1>Login first</h1>
        )}

        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React?
        </a>
      </section>
    </div>
  );
}

export default Home;
