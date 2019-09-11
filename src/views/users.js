import React from 'react'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import Template from "./layout";

class User extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { params } = this.props.match
    return <p>{params.id}</p>
  }
}

class Users extends React.Component {
  render() {
    return (
      <Template>
        <h1>Users</h1>
        <strong>select a user</strong>
        <ul>
          <li>
            <Link to="/users/1">User 1 </Link>
          </li>
          <li>
            <Link to="/users/2">User 2 </Link>
          </li>
          <li>
            <Link to="/users/3">User 3 </Link>
          </li>
        </ul>
        <Route path="/users/:id" component={User} />
      </Template>
    )
  }
}
export default Users