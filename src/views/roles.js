import React from 'react'
import Template from "./layout";
import history from "../modules/history";
import { request } from "../modules/backend";
import { Table, Card, CardImg, CardText, CardBody, CardTitle, Badge, Button } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CardGroup, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { PaginationFooter } from './PaginationFooter';

export class RoleModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      name: '',
      description: '',
    };
  }
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  addRole = (e) => {
    console.log(e)
    request({
      method: 'post',
      url: '/admin/roles',
      data: {
        name: this.state.name,
        description: this.state.description
      }
    }).then((res) => {
      console.log(res)
      this.toggle()
      this.props.refresh()
    })
  }
  changeName = (event) => this.setState({ name: event.target.value });
  changeDescription = (event) => this.setState({ description: event.target.value });

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
            <Input type="text" placeholder="Name" autoComplete="name" onChange={this.changeName} />
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-lock"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" placeholder="Description" autoComplete="current-description" onChange={this.changeDescription} />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addRole}>Submit</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>)
  }
}


class Roles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      page:1
    }
  }

  getRole = (page) => {
    return request({
      method: 'get',
      url: `/admin/roles`,
      params:{
        page:page
      }
    }).then((res) => {
      let data = res.data.data
      console.log(data)
      this.setState({ roles: data })
    })
  }

  componentDidMount() {
    this.getRole(1)
  }
  changePage = (p, v) => {
    let pg = p+v
    this.setState({page: pg}, ()=> this.getRole(pg))
  }

  setPage = (p) => {
    this.setState({page:p}, ()=> this.getRole(p))
  }

  render() {
    return (
      <Template match={this.props.match} >
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag="a" href="#" onClick={() => history.push('/roles')} >Roles</BreadcrumbItem>
          <BreadcrumbItem active tag="span">View</BreadcrumbItem>
        </Breadcrumb>
        <Form onSubmit={e => {e.preventDefault();}} >
          <FormGroup className="float-left" >
            <RoleModal title="Add New Role" buttonLabel={"New Role"} refresh={this.getRole} />
          </FormGroup>
          <PaginationFooter currentPage={this.state.page} changePage={this.changePage} setPage={this.setPage} />
        </Form>
        <Table hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.roles.map((role, index) =>
              // Only do this if items have no stable IDs
              <tr key={index}>
                <td scope="row">{role.id}</td>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>{new Date(role.created_at * 1000).toDateString()}</td>
                <td>{new Date(role.updated_at * 1000).toDateString()}</td>
                <td>
                <Button color="danger" onClick={() => { history.push("/roles/" + role.id) }}>
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
export default Roles