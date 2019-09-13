import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from 'react'
import { Route, Link, NavLink, Router, Switch, Redirect } from 'react-router-dom'
import Users from './views/users'
import {UserEdit} from "./views/UserEdit";
import { RoleEdit } from "./views/RoleEdit";
import Roles from './views/roles'
import Home from "./views/home";
import { Notfound } from "./views/not_found";
import { PrivateRoute, AuthButton } from "./views/auth";
import { Login } from "./views/Login";
import { hot } from 'react-hot-loader/root';
import { Navbar } from "./views/navbar";
import history from "./modules/history";
import { drawerWidth } from "./styles";


import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const transition_close = {
  transition: "margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,width 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
}

const transition_open = {
  transition: "margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,width 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: drawerWidth
}

const drawerStyle = {
  width: drawerWidth,
  flexShrink: 0
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpen: false
    }
  }

  handleDrawerOpen = () => {
    console.log(this.state)
    let c = this.state.drawerOpen
    this.setState({ drawerOpen: !c })
  }

  render() {
    return (
      <Router history={history} >
        <Switch>
          <Route exact path="/" component={Home} />
          {/* must define childrent route before root route */}
          <PrivateRoute path="/users/:id" component={UserEdit} /> 
          <PrivateRoute path="/users" component={Users} />
          <PrivateRoute path="/roles/:id" component={RoleEdit} />
          <PrivateRoute path="/roles" component={Roles} />
          <Route path="/login" component={Login} />
          <Route component={Notfound} />
        </Switch>
      </Router>
    )
  }
}

export default hot(App)
