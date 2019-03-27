import React, { Component } from 'react';
import './handler.css'
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

function go() {
  var userId = prompt('Username?', 'Guest');
  checkIfUserExists(userId);
}

var USERS_LOCATION = 'https://sample-68a20.firebaseio.com/';

function userExistsCallback(userId, exists) {
  if (exists) {
    alert('user ' + userId + ' exists!');
  } else {
    alert('user ' + userId + ' does not exist!');
  }
}

// Tests to see if /users/<userId> has any data. 
function checkIfUserExists(userId) {
  var usersRef = new Firebase(USERS_LOCATION);
  usersRef.child(userId).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    userExistsCallback(userId, exists);
  });
}

class handler extends Component {
  render() {
    return (
      <div className="handler">
        <form onSubmit = {} className="white"></form>
        <h5 className = "black-text text-darken-3"> Sign In...!!</h5>
        <div className = "handle-input">
        </div>
      </div>
    );
  }
}

export default handler;