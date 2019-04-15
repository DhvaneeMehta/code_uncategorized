import React, { Component } from 'react';
import firebase from "firebase";
import {Redirect} from "react-router-dom";

var mail;
var x;
var k;
var add;

class Check extends Component {

    constructor(props) {
      super(props);

      this.state =  {
        redirect: false,
        userEmail: ' ',
        userName: ' ',
        isModerator: false,
        cf_handle: ' ',
        hasHandle: false,
        isSignedIn: true,
      };
      k = "00"
      //this.userentry = firebase.database().ref().child('users');
    }

    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({isSignedIn:!!user})
        //console.log("user",user);
        if(this.state.isSignedIn) this.getData();
      })
    }

    handleonClick =()=> {
      firebase.auth().signOut();      
      this.setState({redirect:true})
    }

    handleChange(event) {
      this.setState({cf_handle: event.target.value});
      add = event.target.value;
    }

    handleKeyPress(event) {
      if(event.key!=='Enter') return;
      this.handlePush();
    }

    handlePush(event) {
      console.log("cf ka handle",String(add));
      var curr_key;
      var query;
      console.log("Here");
      query = firebase.database().ref("users").orderByKey();
      //firebase.database().ref().child("users").child("-LcKU1g53dZMunK_aXpM").update({cf_handle : this.state.cf_handle});
      query.once("value").then(function(snapshot) {
        snapshot.forEach(function(child) 
        {
          var temp = child.val();
          console.log(temp.userEmail, firebase.auth().currentUser.email);
          if(temp.userEmail == firebase.auth().currentUser.email) 
          {
            curr_key=child.key;
            firebase.database().ref().child("users").child(curr_key).update({cf_handle : "Hey, Here!"});
            this.setState({hasHandle: true});
          }
       }
       )
      });
    }
    getData = () => {
      mail =  firebase.auth().currentUser.email;
      console.log(mail);
      
      var y = 1;
      var data_list = [];
      var z = 1;

      firebase.database().ref().child("users").once("value").then((snapshot) => {
        snapshot.forEach(function(child)
        {
          var temp = child.val().userEmail;
          data_list.push(temp);
          if(temp == (String(mail))) {
            //y = 2;
            x = child.val().userName;
            k = child.val().cf_handle;
          }
        })
        this.setState({userName: x})
        if(k==undefined || k==null || k=="00") {
          this.setState({hasHandle: false});
          this.setState({cf_handle: x})
        }
        else {
          this.setState({hasHandle: true});
          this.setState({cf_handle: k});
        }
        // if(y == 1 && z == 2) {
        //   // nahi mila
        //   this.setState({nowChange: true});
          
        // }
        // if(y == 2) {
        //   alert("Username already taken...!!");
        //   console.log("found",String(y));
        //   document.getElementById('textbox').value = "";
        // }
      })
    }
    render() {

      if(this.state.redirect){
        return(<Redirect to="./"/>)
      }

      return (
        <div className="head">
          <h1>This is just check!! </h1>
          {firebase.auth().currentUser && <label> Name: {firebase.auth().currentUser.displayName} </label>}
          <br />
          <label> Username: {this.state.userName} </label>
          <br />
          <form>
            <label>
              Your codeforces handle:
              <input type = "text"
                placeholder = {this.state.cf_handle}
                onChange = {this.handleChange.bind(this)}
                onKeyPress = {this.handleKeyPress.bind(this)}
                ></input>
            </label>
          </form>
          <button onClick = {this.handleonClick}>Log out...!! </button>
        </div>
      );
    }
  }

  export default Check