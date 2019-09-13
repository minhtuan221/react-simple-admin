import React, { Component } from 'react'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import { PrivateRoute, AuthButton } from "./auth";
import { Login } from "./Login";
import history from "../modules/history";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';
import { NavbarProfile } from './NavbarProfile';


export class MyNavbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        };
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        // console.log(this.props)
        return (
            <div className="flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
                <Navbar color="light" light expand="md">
                    <NavbarBrand onClick={() => history.push('/')} >Admin</NavbarBrand>
                    {/* <AuthButton ></AuthButton> */}
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem active={this.props.path == "/"}  >
                                <NavLink href="#" onClick={() => history.push('/')}>Home</NavLink>
                            </NavItem>
                            <NavItem active={this.props.path == "/users"} >
                                <NavLink href="#" onClick={() => history.push('/users')} >Users</NavLink>
                            </NavItem>
                            <NavItem active={this.props.path == "/roles"} >
                                <NavLink href="#" onClick={() => history.push('/roles')} >Roles</NavLink>
                            </NavItem>
                            <NavbarProfile />
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}


