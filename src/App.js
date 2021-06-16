import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import base64 from 'base-64';
import urlencode from 'urlencode';
import UIDGenerator from 'uid-generator';
import paymentwall from 'paymentwall';

function getPayment(uuid) {
  const uidgen = new UIDGenerator();
  // var a = await uidgen.generate();
  // console.log(a);
  return (<Button variant="primary" 
    title={uuid} onClick={() => alert("aaaaa")} 
  >{uuid}</Button>)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {getPayment(12)}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
