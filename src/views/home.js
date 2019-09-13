import React from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import Template from "./layout";

class Home extends React.Component {
  render() {
    // console.log(this.props)
    return (
      <Template match={this.props.match}>
        <CardTitle><h5><b>Home</b></h5></CardTitle>
        <CardSubtitle>Card subtitle</CardSubtitle>
        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
        <Button>Button</Button>
      </Template>
    )
  }
}
export default Home