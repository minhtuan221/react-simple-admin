import React from 'react';
import Template from "./layout";
import { request } from "../modules/backend";
import history from "../modules/history";
import { Table, Card, CardImg, CardText, CardBody, CardTitle, Badge, Button } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CardGroup, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Roles extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        roles: []
      }
    }
    render() {
        return (
            <Badge color="primary" style={{marginRight: 5}}>{role.name}</Badge>
        )
    }
}
