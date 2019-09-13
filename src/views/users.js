import React from 'react'
import Container from '@material-ui/core/Container';
import Template from "./layout";
import history from "../modules/history";
import { request } from "../modules/backend";
import { Table, Card, CardImg, CardText, CardBody, CardTitle, Badge, Button } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CardGroup, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { PaginationFooter } from './PaginationFooter';

export class UserModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      email: '',
      password: '',
    };
  }
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  addUser = (e) => {
    console.log(e)
    request({
      method: 'post',
      url: '/admin/users',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    }).then((res)=>{
      console.log(res)
      this.toggle()
      // history.push('/users')
    })
  }
  changeEmail = (event) => this.setState({ email: event.target.value });
  changePassword = (event) => this.setState({ password: event.target.value });

  render() {
    return (<div>
      <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addUser}>Submit</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>)
  }
}
class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      page:1
    }
  }

  getUsers = (page) => {
    return request({
      method: 'get',
      url: '/admin/users',
      params:{
        page:page
      }
    }).then((res) => {
      let data = res.data.data
      console.log(data)
      this.setState({ users: data })
    })
  }

  componentDidMount() {
    this.getUsers(1)
  }

  changePage = (p, v) => {
    let pg = p+v
    this.setState({page: pg}, ()=> this.getUsers(pg))
  }

  setPage = (p) => {
    this.setState({page:p}, ()=> this.getUsers(p))
  }

  render() {
    return (
      <Template match={this.props.match}>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag="a" href="#" onClick={() => history.push('/users')} >User</BreadcrumbItem>
          <BreadcrumbItem active tag="span">View</BreadcrumbItem>
        </Breadcrumb>
        <Form onSubmit={e => {e.preventDefault();}}>
          <FormGroup className="float-left" >
            <UserModal title="Add New User" buttonLabel={"New User"} />
          </FormGroup>
          <PaginationFooter currentPage={this.state.page} changePage={this.changePage} setPage={this.setPage} />
        </Form>
        <Table hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              {/* <th>Roles</th> */}
              <th>Active</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, index) =>
              // Only do this if items have no stable IDs
              <tr key={index}>
                <td scope="row">{user.id}</td>
                <td>{user.email}</td>
                {/* <th>{user.roles.map((role) => <Badge color="primary">{role.name}</Badge>)}</th> */}
                <td>{user.is_confirmed ? "yes" : "no"}</td>
                <td>{new Date(user.created_at * 1000).toDateString()}</td>
                <td>{new Date(user.updated_at * 1000).toDateString()}</td>
                <td>
                  <Button color="danger" onClick={()=> {history.push("/users/"+user.id)}}>
                    <i className="fas fa-pen fa-x2"></i>
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        
      </Template>
    )
  }
}
export default Users