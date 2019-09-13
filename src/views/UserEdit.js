import React from 'react';
import Template from "./layout";
import { request } from "../modules/backend";
import history from "../modules/history";
import { Table, Card, CardImg, CardText, CardBody, CardTitle, Badge, Button } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup } from 'reactstrap';
import { CardGroup, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { AddOptionModal } from './AddOptionModal';

class BadgeRole extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log(this.props)
        return (
            <Badge color="primary" style={{ marginRight: 5 }} ><a href="#" style={{color:"white"}} onClick={()=>history.push("/roles/"+this.props.role.id)} >{this.props.role.name}</a>{" "}<i className="fas fa-window-close" style={{ cursor: "pointer" }} onClick={() => this.props.removeRole(this.props.user_id, this.props.role.id)}></i></Badge>
        )
    }
}

export class UserEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                "id": 0,
                "email": "",
                "is_confirmed": false,
                "roles": [],
                "created_at": 0,
                "updated_at": 0,
            },
            roles: [],
            dropdownOpen: false
        }
    }
    viewRole = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        }, () => {
            this.getRole()
        });
    }

    getUserData() {
        const { params } = this.props.match;
        return request({
            method: 'get',
            url: `/admin/users/${params.id}/profile`,
        }).then((res) => {
            let data = res.data.data
            console.log(data)
            this.setState({ user: data })
        })
    }

    getRole = () => {
        return request({
            method: 'get',
            url: `/admin/roles`,
        }).then((res) => {
            let data = res.data.data
            console.log(data)
            this.setState({ roles: data })
        })
    }

    componentDidMount() {
        this.getUserData()
    }

    requestChangeConfirmUser = (id, is_confirmed) => {
        return request({
            method: 'put',
            url: `/admin/users/${id}/confirm`,
            data: {
                is_confirmed: is_confirmed
            }
        }).then((res) => {
            let data = res.data.data
            console.log(data)
        })
    }

    changeConfirmedUser = (e) => {
        let confirm = this.state.user.is_confirmed
        let u = this.state.user
        u.is_confirmed = !confirm
        console.log(u)
        this.requestChangeConfirmUser(u.id, u.is_confirmed)
        this.setState({ user: u })
    }

    appendRole = (user_id, role_id) => {
        const { params } = this.props.match;
        request({
            method: 'post',
            url: `/admin/users/roles`,
            data: {
                role_id: role_id,
                user_id: user_id
            }
        }).then((res) => {
            let data = res.data.data
            console.log(data)
            this.getUserData()
        })
    }
    removeRole = (user_id, role_id) => {
        const { params } = this.props.match;
        request({
            method: 'put',
            url: `/admin/users/roles`,
            data: {
                role_id: role_id,
                user_id: user_id
            }
        }).then((res) => {
            let data = res.data.data
            console.log(data)
            this.getUserData()
        })
    }

    render() {
        const { params } = this.props.match;
        console.log(this.state.user.roles)
        return <Template match={this.props.match}>
            <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem tag="a" href="#" onClick={() => history.push('/users')} >User</BreadcrumbItem>
                <BreadcrumbItem active tag="span">Edit</BreadcrumbItem>
            </Breadcrumb>
            <div>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td scope="row">{this.state.user.id}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td scope="row">{this.state.user.email}</td>
                        </tr>
                        <tr>
                            <td>Is Confirmed</td>
                            <td scope="row">{this.state.user.is_confirmed ? "yes" : "no"} <Button className="float-right" color="success" onClick={this.changeConfirmedUser} ><i className="fas fa-sync-alt"></i></Button></td>
                        </tr>
                        <tr>
                            <td ><a href="#" onClick={() => history.push("/roles")} >Roles</a> </td>
                            <td scope="row">
                                <h4>{this.state.user.roles.map((role) => <BadgeRole user_id={this.state.user.id} role={role} removeRole={this.removeRole} />)}
                                    <AddOptionModal refresh={this.getRole} append={this.appendRole} title={"Select Role"} parent={this.state.user} items={this.state.roles} > <i className="fas fa-plus"></i> Role</AddOptionModal>
                                    
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>Created at</td>
                            <td scope="row">{new Date(this.state.user.created_at * 1000).toUTCString()}</td>
                        </tr>
                        <tr>
                            <td>Updated at</td>
                            <td scope="row">{new Date(this.state.user.updated_at * 1000).toUTCString()}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Template>
    }
}
