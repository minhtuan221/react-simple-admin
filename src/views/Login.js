import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import history from "../modules/history";
import axios from 'axios';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { fakeAuth } from "./auth";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToReferrer: false
    };
  }
  componentWillMount() {
    if (!fakeAuth.isAuthenticated) {
      let { from } = this.props.location.state || { from: { pathname: "/" } };
      fakeAuth.checkAuthenticated(from);
    }
  }
  login = () => {
    // console.log(this.state)
    const email = this.state.email;
    let url = "http://0.0.0.0:5000";
    axios({
      method: 'post',
      url: url + '/login',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(resquest => {
      let res = resquest.data;
      console.log(res);
      if (res.data == null) {
        throw res.error;
      }
      else {
        fakeAuth.token = res.data.token;
        fakeAuth.email = email;
        // console.log(fakeAuth)
      }
    }).then(() => fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true }, () => history.push('/'));
    }))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        }
        else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
  changeEmail = (event) => this.setState({ email: event.target.value });
  changePassword = (event) => this.setState({ password: event.target.value });
  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;
    if (redirectToReferrer)
      return <Redirect to={from} />;
    return (<div className="app flex-row align-items-center" style={{ paddingTop: 50 }}>
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
                        <Button color="primary" className="px-4" onClick={this.login}>Login</Button>
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
    </div>);
  }
}
