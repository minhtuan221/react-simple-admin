import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import history from "../modules/history";
import axios from 'axios';
import { URL } from "../config";


////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('auth_token');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log('No cookies for you!!', error);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('auth_token', serializedState);
  } catch (error) {
    console.log("We couldn't save your cookies", error);
  }
};


export const fakeAuth = {
  isAuthenticated: false,
  token: '',
  email: '',
  authenticate(cb) {
    this.isAuthenticated = true;
    saveState(this.token)
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    this.token = '';
    this.email = '';
    saveState(this.token)
    setTimeout(cb, 100);
  },
  getToken(){
    this.token = loadState()
    return this.token
  },
  checkAuthenticated(redirectTo){
    let token = this.getToken()
    if (token==null) {
      this.isAuthenticated = false
      return
    }
    axios({
      method: 'get',
      url: URL + '/users/profile',
      headers: {'Authorization': "Bearer " + token}
    }).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    }).then((res)=>{
      let data = res.data.data
      console.log(data)
      this.email = data.user.email
      if (data!=null) {
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
      }
      console.log(this)
    }).then(() => {
      // console.log(history.location.pathname)
      history.push(redirectTo)
      // history.goBack()
    });
  }
};

export const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <div>
        Welcome! {fakeAuth.email} {" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </div>
    ) : (
        "You are not logged in"
      )
);

export function PrivateRoute({ component: Component, ...rest }) {
  console.log(fakeAuth)
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

const style_margin = {
  margin: 50,
};


