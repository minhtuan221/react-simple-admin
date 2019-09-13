import React from 'react';
import { Badge, Button } from 'reactstrap';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
export class AddOptionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };
    }
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }), () => this.props.refresh());
    };
    render() {
        return (<div>
            <Button className="float-right" color="success" onClick={this.toggle}>{this.props.children}</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
                <ModalBody>
                    <h4>
                        {this.props.items.map((role, index) => <Badge key={index} onClick={() => {
                            this.props.append(this.props.parent.id, role.id);
                            this.toggle();
                        }} style={{ margin: 5, cursor: "pointer" }} color="success">{role.name} <i className="fas fa-plus"></i></Badge>)}</h4>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>);
    }
}
