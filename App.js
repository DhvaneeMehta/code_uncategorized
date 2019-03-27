import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"


firebase.initializeApp({
  apiKey:"AIzaSyCxMHPkLW_PxgPO4w8njwLvA3Yib0NaY6c",
  authDomain:"login-a48a4.firebaseapp.com"
})


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Sebastian',
      message: '',
      list: [],
    };

  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      //firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = ()=>{
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn:!!user})
      //console.log("user",user)
    })
  }

  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        isModerator: this.state.isModerator,
        emailID: this.state.emailID,
      }
      this.messageRef.push(newItem);
      this.setState({ message: '' });
    }
  };

  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }


  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed in...!! </div>
            <h1> Welcome {firebase.auth().currentUser.email}  </h1> 
            <input
            className="username"
            type="text"
            placeholder="Type a unique username"
            value={this.state.username}
            //onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}/> 
          <input type = "text" className = "username"></input>
            <img alt="Your profile picture" src={firebase.auth().currentUser.photoURL}/>
            <button onClick = {() => firebase.auth().signOut()}>Sign out...!! </button>
          </span>
        ) : (
          <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth = {firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default App;