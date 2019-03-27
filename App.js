import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase"
import Page from './components/Page'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Page />
      </div>
    );
  }
}

export default App
