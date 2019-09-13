import React from 'react';
import Template from "./layout";
import { request } from "../modules/backend";
import history from "../modules/history";
import { Table, Card, CardImg, CardText, CardBody, CardTitle, Badge, Button } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CardGroup, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { AddOptionModal } from './AddOptionModal';


class BadgePermission extends React.Component {
    constructor(props) {
      super(props);
    }
  
  
    render() {
      console.log(this.props)
      return (
        <Badge color="primary" style={{ marginRight: 5 }} >{this.props.children}{" "}<i className="fas fa-window-close" style={{ cursor: "pointer" }} onClick={() => this.props.remove(this.props.parent, this.props.child)}></i></Badge>
      )
    }
  }



export class RoleEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: {
                "id": 0,
                "name": "",
                "description": "",
                "permissions": [],
                "created_at": 0,
                "updated_at": 0,
            },
            dropdownOpen: false,
            permissions:[]
        }
    }
    viewRole = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        },()=>{
            this.getPermission()
        });
    }

    getPermission = () => {
        return request({
            method: 'get',
            url: `/admin/permissions`,
        }).then((res) => {
            let data = res.data.data
            console.log(data)
            this.setState({ permissions: data.permission })
        })
    }

    getRoleData() {
        const { params } = this.props.match;
        return request({
            method: 'get',
            url: `/admin/roles/${params.id}`,
        }).then((res) => {
            let data = res.data.data
            console.log(data)
            this.setState({ role: data })
        })
    }


    componentDidMount() {
        this.getRoleData()
    }

    appendPermission = (role_id, permission) => {
        const { params } = this.props.match;
        request({
            method: 'post',
            url: `/admin/roles/permissions`,
            data: {
                role_id: role_id,
                permission: permission
            }
        }).then((res) => {
            let data = res.data.data
            console.log(data)
            this.getRoleData()
        })
    }
    removePermission = (role_id, permission) => {
        const { params } = this.props.match;
        request({
            method: 'put',
            url: `/admin/roles/permissions`,
            data: {
                role_id: role_id,
                permission: permission
            }
        }).then((res) => {
            let data = res.data.data
            console.log(data)
            this.getRoleData()
        })
    }

    render() {
        const { params } = this.props.match;
        console.log(this.state.role.roles)
        return <Template match={this.props.match}>
            <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem tag="a" href="#" onClick={() => history.push('/roles')} >Role</BreadcrumbItem>
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
                            <td scope="row">{this.state.role.id}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td scope="row">{this.state.role.name}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td scope="row">{this.state.role.description}</td>
                        </tr>
                        <tr>
                            <td ><a href="#" onClick={() => history.push("/roles")} >Permission</a> </td>
                            <td scope="row">
                                <h4>{this.state.role.permissions.map((permission) => <BadgePermission parent={this.state.role.id} child={permission.permission} remove={this.removePermission}>{permission.permission}</BadgePermission>)}
                                <AddOptionModal refresh={this.getPermission} append={this.appendPermission} title={"Select Permission"} parent={this.state.role} items={this.state.permissions} > <i className="fas fa-plus"></i> Permission</AddOptionModal>
                                    
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>Created at</td>
                            <td scope="row">{new Date(this.state.role.created_at * 1000).toUTCString()}</td>
                        </tr>
                        <tr>
                            <td>Updated at</td>
                            <td scope="row">{new Date(this.state.role.updated_at * 1000).toUTCString()}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Template>
    }
}
