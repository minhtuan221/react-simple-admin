import React, { Component } from 'react';
import { fakeAuth } from "./auth";
import history from "../modules/history";
import { NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
export class NavbarProfile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // console.log(this.props)
        return (!fakeAuth.isAuthenticated ?
            <NavItem>
                <NavLink href="#" onClick={() => history.push('/login')}>Login</NavLink>
            </NavItem> :
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    {fakeAuth.email}
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        Option 1
                    </DropdownItem>
                    <DropdownItem>
                        Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => { fakeAuth.signout(() => history.push("/")); }}>
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>);
    }
}
