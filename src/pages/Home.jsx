import React from "react";
import logo from "../logo.svg";

function Home() {
  return (
    <div className="App">
      <section className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to <code>Back-end Exam</code> UI.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </section>
    </div>
  );
}

export default Home;
