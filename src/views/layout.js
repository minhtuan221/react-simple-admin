import React, { Component } from "react";
import { MyNavbar } from "./navbar";
import { drawerWidth } from "../styles";
import Grid from '@material-ui/core/Grid';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Template extends React.Component {
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
        // console.log(this.props)
        return (
            <div>

                <MyNavbar handleDrawerOpen={this.handleDrawerOpen} drawerOpen={this.state.drawerOpen} path={this.props.match.path} />
                <Container >
                    <Row>
                        <Col >
                            <Card>
                                <CardBody>
                                    {this.props.children}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
