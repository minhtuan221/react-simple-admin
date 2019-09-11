import React, { Component } from 'react'
import { Route, Link, NavLink, Switch, Redirect } from 'react-router-dom'
import { PrivateRoute, AuthButton, Login } from "./auth";
import history from "../modules/history";


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
import { drawerWidth } from "../styles";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    // NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

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



export class MyNavbar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <AppBar
                    position="fixed"
                    style={this.props.drawerOpen ? transition_open : transition_close}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerOpen}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            <AuthButton />
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={this.props.drawerOpen}
                    style={drawerStyle}
                >
                    <div style={drawerStyle}>
                        <div>
                            <IconButton
                                onClick={this.props.handleDrawerOpen}
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <ListItem button key={"home"}>
                                <ListItemText onClick={() => history.push('/')} >
                                    Home
                                </ListItemText>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem button key={"users"}>
                                <ListItemText onClick={() => history.push('/users')} >
                                    Users
                                </ListItemText>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem button key={"roles"}>
                                <ListItemText onClick={() => history.push('/roles')} >
                                    Roles
                                </ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </div>
        )
    }
}


