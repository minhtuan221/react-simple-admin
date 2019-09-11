import React, { Component } from "react";
import { MyNavbar } from "./navbar";
import { drawerWidth } from "../styles";
import Grid from '@material-ui/core/Grid';
import { Container, Row, Col } from 'reactstrap';

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
        return (
            <div>
                <MyNavbar handleDrawerOpen={this.handleDrawerOpen} drawerOpen={this.state.drawerOpen} />
                <main
                    style={{ marginLeft: this.state.drawerOpen ? drawerWidth : 0, paddingTop: 100 }}
                >
                    <Container fluid >
                        <Row>
                            {this.props.children}
                        </Row>
                    </Container>
                </main>
            </div>
        );
    }
}
