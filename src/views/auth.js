import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import history from "../modules/history";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Route path="/public" component={Public} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    </Router>
  );
}

export const fakeAuth = {
  isAuthenticated: false,
  token: '',
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
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

function Public() {
  return <h3>Public</h3>;
}

function Protected() {
  return <h3>Protected</h3>;
}

const style_margin = {
  margin: 50,
};

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      redirectToReferrer: false
    }
  }

  login = () => {
    console.log(this.state)
    fakeAuth.email = this.state.email
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true }, () => history.push('/'));
    });
  };

  changeEmail = (event, newValue) => this.setState({ email: event.target.value })
  changePassword = (event, newValue) => this.setState({ password: newValue })

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email" autoComplete="email" onChange={this.changeEmail} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" onChange={this.changePassword} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.login} >Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
        {/* <MuiThemeProvider style={{ marginLeft: "40%" }}>
          <div>
            <AppBar
              title="Login"
            />
            <TextField
              hintText="Enter your email"
              floatingLabelText="email"
              onChange={this.changeEmail}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={this.changePassword}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style_margin} onClick={this.login} />
          </div>
        </MuiThemeProvider> */}
      </div>
    );
  }
}

export default AuthExample;
